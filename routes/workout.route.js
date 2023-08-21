const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout.controller');
const { authMiddleware } = require('../middleware/auth'); // Import any necessary middleware

// Route to get all workouts
router.get('/', workoutController.getAllWorkouts);

// Route to create a new workout
router.post('/', authMiddleware, workoutController.createWorkout);

// Route to get a workout by ID
router.get('/:id', workoutController.getWorkoutById);

// Route to update a workout by ID
router.put('/:id', authMiddleware, workoutController.updateWorkoutById);

// Route to delete a workout by ID
router.delete('/:id', authMiddleware, workoutController.deleteWorkoutById);

module.exports = router;
