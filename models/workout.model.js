const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  duration: { type: String, required: true },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
