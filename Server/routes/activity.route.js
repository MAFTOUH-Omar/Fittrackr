const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const activityController = require('../controllers/activity.controller');

// Middleware for JWT authorization, assuming you have this set up
router.use(authMiddleware);

// Routes for Activity
router.post('/create', activityController.createActivity); // Create a new activity
router.get('/', activityController.getAllActivities); // Get all activities for the authenticated user
router.get('/:id', activityController.getActivityById); // Get an activity by ID
router.put('/:id', activityController.updateActivityById); // Update an activity by ID
router.delete('/:id', activityController.deleteActivityById); // Delete an activity by ID

module.exports = router;
