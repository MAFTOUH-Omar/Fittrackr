const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Existing fields
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // New role field to specify user permission level
  role: {
    type: String,
    enum: ['admin', 'user'], // Possible values: 'admin', 'user'
    default: 'user', // Default role is 'user'
  },
  googleId: {
    type: String,
    required: false,
    unique: true
  },
  image: {
    type: String
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
