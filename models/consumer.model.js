const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  goals: [{ type: String }],
});

const Consumer = mongoose.model('Consumer', consumerSchema);

module.exports = Consumer;
