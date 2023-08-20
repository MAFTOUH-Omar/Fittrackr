const mongoose = require('mongoose');

const fitnessGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal: { type: String, required: true },
  targetWeight: { type: Number },
  deadline: { type: Date },
});

const FitnessGoal = mongoose.model('FitnessGoal', fitnessGoalSchema);

module.exports = FitnessGoal;