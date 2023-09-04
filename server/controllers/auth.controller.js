const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateToken } = require('../middleware/auth'); // Create a separate helper file for token generation.
const axios = require('axios')
// Sign-in with Google and JWT
exports.signInWithGoogle = async (req, res) => {
  try {
    const { code } = req.params || req.query;

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
exports.signUpWithJWT = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const userDB = await User.findOne({ email });

    if (userDB) {
      return res.status(409).json({ error: 'User already exists. Please login.' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: encryptedPassword,
      role: role || 'user',
    });

    await newUser.save();

    const token = generateToken(newUser);

    return res.status(201).json({ message: 'Sign-up successful', token, user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Sign-in with JWT and bcrypt
exports.signInWithJWT = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    let redirectTo;
    if (user.role === 'admin') {
      redirectTo = '/admin/dashboard';
    } else {
      redirectTo = '/user/dashboard';
    }

    return res.status(200).json({
      message: 'Sign-in successful',
      token: generateToken(user),
      user,
      redirectTo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
