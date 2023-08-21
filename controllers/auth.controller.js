const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateToken } = require('../middleware/auth'); // Create a separate helper file for token generation.

// Sign-in with Google and JWT
exports.signInWithGoogle = async (req, res) => {
  try {
    // ... (Your existing code)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
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
