const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
// Secret key for JWT
const jwtSecret = process.env.TOKEN_KEY;

// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign(
    { user_id: user._id, email: user.email, role: user.role },
    jwtSecret,
    {
      expiresIn: '2h', // Set the expiration time for the token
    }
  );
}

// Sign-in with Google and JWT
exports.signInWithGoogle = async (req, res) => {
  try {
    const { code } = req.body || req.query;

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
    const { email, name, picture, id } = userResponse.data;

    // Check if the user exists in the database based on their Google email
    const userDB = await User.findOne({ email });

    if (userDB) {
      // User already exists, generate a JWT token
      const token = generateToken(userDB);

      return res.status(200).json({
        message: 'Sign-in with Google successful',
        token,
        user: userDB,
      });
    } else {
      // User doesn't exist, create a new user
      const newUser = new User({
        email,
        fullName: name,
        image: picture,
        googleId: id,
      });

      // Save the new user to the database
      await newUser.save();

      // Generate a JWT token for the new user
      const token = generateToken(newUser);

      return res.status(200).json({
        message: 'Sign-up with Google successful',
        token,
        user: newUser,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Sign-up with JWT and bcrypt
// Sign-up with JWT and bcrypt
exports.signUpWithJWT = async (req, res) => {
    try {
      const { fullName, email, password, role } = req.body;
  
      // Check if the required fields are present in the request body
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Check if the user already exists in the database
      const userDB = await User.findOne({ email });
  
      if (userDB) {
        return res.status(409).json({ message: 'User Already Exists. Please Login' });
      }
  
      // Hash the user's password using bcrypt
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with the hashed password
      const newUser = new User({
        fullName,
        email,
        password: encryptedPassword,
        role: role || 'user',// Set the role to 'user' by default
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Generate a JWT token for the new user
      const token = generateToken(newUser);
  
      return res.status(201).json({
        message: 'Sign-up with JWT successful',
        token,
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };  

// Sign-in with JWT and bcrypt
exports.signInWithJWT = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by their email in the database
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      // Now, you can check the user's role
      if (user.role === 'admin') {
        // Handle admin user
        // For example, redirect to the admin dashboard
        return res.status(200).json({
          message: 'Admin sign-in successful',
          token: generateToken(user),
          user,
          redirectTo: '/admin/dashboard', // Customize the admin dashboard route
        });
      } else {
        // Handle regular user
        // For example, redirect to the user dashboard
        return res.status(200).json({
          message: 'User sign-in successful',
          token: generateToken(user),
          user,
          redirectTo: '/user/dashboard', // Customize the user dashboard route
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };