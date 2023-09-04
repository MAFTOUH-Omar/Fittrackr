const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


// Secret key for JWT
const jwtSecret = process.env.TOKEN_KEY;

// Function to generate a JWT token
exports.generateToken = (user) => {
  return jwt.sign(
    { user_id: user._id, email: user.email, role: user.role },
    jwtSecret,
    {
      expiresIn: '2h', // Set the expiration time for the token
    }
  );
}

// Middleware for Google OAuth authentication and role-based redirection
exports.googleAuthMiddleware = async (req, res, next) => {
  try {
    const code = req.body.code || req.query.code;

    // Exchange Google code for an access token
    const tokenResponse = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }
    );
    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    // Get user data from Google
    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
    );
    const { email } = userResponse.data;

    // Check if the user exists in the database based on their email
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Set the user object in the request for later use
    req.user = userDB;

    // Continue to the next middleware or route
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to check user role and redirect
exports.redirectToDashboard = (req, res) => {
  const user = req.user; // Assuming the user object is set in the request

  if (user && user.role) {
    if (user.role === 'admin') {
      // Redirect admin user to the admin dashboard
      res.redirect('/admin/dashboard'); // Customize the admin dashboard route
    } else {
      // Redirect regular user to the user dashboard
      res.redirect('/user/dashboard'); // Customize the user dashboard route
    }
  } else {
    // Handle cases where user or role information is missing
    res.status(403).json({ message: 'Access denied' });
  }
};
exports.authMiddleware = (req, res, next) => {
    // Récupère le token JWT depuis la demande
    const token = req.header('x-auth-token');
  
    // Vérifie si le token existe
    if (!token) {
      return res.status(401).json({ message: 'Token manquant, accès non autorisé' });
    }
  
    try {
      // Vérifie et décode le token
      const decoded = jwt.verify(token, jwtSecret);
  
      // Ajoute les informations de l'utilisateur à req.user
      req.user = decoded;
  
      // Continue vers la prochaine étape du middleware
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token invalide, accès non autorisé' });
    }
  };