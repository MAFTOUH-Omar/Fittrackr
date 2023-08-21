const Workout = require('../models/workout.model');

// Create a new workout
exports.createWorkout = async (req, res) => {
  try {
    const userId = req.user.user_id; 
    const { date, activities, duration } = req.body;

    // Create a new workout object
    const newWorkout = new Workout({
      userId,
      date: date || new Date(), // Use the provided date or the current date if not provided
      activities: activities || [], // Use the provided activities or an empty array if not provided
      duration,
    });

    // Save the new workout to the database
    const savedWorkout = await newWorkout.save();

    res.status(201).json({
      message: 'Workout created successfully',
      workout: savedWorkout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getAllWorkouts = async (req, res) => {
    try {
      const workouts = await Workout.find().populate('activities'); // Populate the 'activities' field with their details
  
      res.status(200).json({
        message: 'All workouts retrieved successfully',
        workouts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
// Get a workout by ID
exports.getWorkoutById = async (req, res) => {
    try {
      const workout = await Workout.findById(req.params.id);
      
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
  
      res.status(200).json(workout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Update a workout by ID
  exports.updateWorkoutById = async (req, res) => {
    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(
        req.params.id,
        req.body, // Update with the request body
        { new: true } // Return the updated workout
      );
      
      if (!updatedWorkout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
  
      res.status(200).json(updatedWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete a workout by ID
  exports.deleteWorkoutById = async (req, res) => {
    try {
      const deletedWorkout = await Workout.findByIdAndRemove(req.params.id);
      
      if (!deletedWorkout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
  
      res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };