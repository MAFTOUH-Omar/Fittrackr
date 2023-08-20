const Activity = require('../models/activity.model');

// Create a new activity
exports.createActivity = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { type, duration, distance, caloriesBurned, date } = req.body;

    // Create a new activity document
    const activity = new Activity({
      userId,
      type,
      duration,
      distance,
      caloriesBurned,
      date: date || Date.now(), // Use provided date or current date if not provided
    });

    // Save the activity to the database
    await activity.save();

    res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all activities for a specific user
exports.getAllActivities = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in the request

    // Fetch all activities for the given user
    const activities = await Activity.find({ userId });

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get activity by ID
exports.getActivityById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in the request
    const activityId = req.params.id;

    // Find the activity by ID and ensure it belongs to the user
    const activity = await Activity.findOne({ _id: activityId, userId });

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update activity by ID
exports.updateActivityById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in the request
    const activityId = req.params.id;
    const updates = req.body;

    // Find the activity by ID and ensure it belongs to the user
    const activity = await Activity.findOne({ _id: activityId, userId });

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Update the activity document with the provided data
    Object.assign(activity, updates);

    // Save the updated activity
    await activity.save();

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete activity by ID
exports.deleteActivityById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in the request
    const activityId = req.params.id;

    // Find the activity by ID and ensure it belongs to the user
    const activity = await Activity.findOne({ _id: activityId, userId });

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Remove the activity from the database
    await activity.remove();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
