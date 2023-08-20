const FitnessGoal = require('../models/fitnessGoal.model');

// Create a new fitness goal
exports.createFitnessGoal = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const {  goal, targetWeight, deadline } = req.body;
    const fitnessGoal = new FitnessGoal({
      userId,
      goal,
      targetWeight,
      deadline,
    });
    const savedGoal = await fitnessGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all fitness goals for a user
exports.getAllFitnessGoals = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in the request
    const goals = await FitnessGoal.find({ userId });
    res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a fitness goal by ID
exports.getFitnessGoalById = async (req, res) => {
  try {
    const goalId = req.params.id;
    const goal = await FitnessGoal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a fitness goal by ID
exports.updateFitnessGoalById = async (req, res) => {
  try {
    const goalId = req.params.id;
    const { goal, targetWeight, deadline } = req.body;
    const updatedGoal = await FitnessGoal.findByIdAndUpdate(
      goalId,
      { goal, targetWeight, deadline },
      { new: true }
    );
    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json(updatedGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a fitness goal by ID
exports.deleteFitnessGoalById = async (req, res) => {
  try {
    const goalId = req.params.id;
    const deletedGoal = await FitnessGoal.findByIdAndDelete(goalId);
    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
