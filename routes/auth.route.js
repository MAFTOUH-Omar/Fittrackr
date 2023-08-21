const express = require('express');
const router = express.Router();
const {googleAuthMiddleware,redirectToDashboard,} = require('../middleware/auth');
const {signInWithGoogle,signUpWithJWT,signInWithJWT,} = require('../controllers/auth.controller');

// Route for Google OAuth authentication

router.get('/auth/google', googleAuthMiddleware, redirectToDashboard);

// Route for signing in with Google
router.post('/auth/google/signin', signInWithGoogle);

// Route for signing up with JWT and bcrypt
router.post('/signup', signUpWithJWT);

// Route for signing in with JWT and bcrypt
router.post('/signin', signInWithJWT);

// Example protected route that requires JWT authorization
router.get('/protected', (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
});
module.exports = router;
