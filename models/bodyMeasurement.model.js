const mongoose = require('mongoose');

const bodyMeasurementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number },
  height: { type: Number },
  waistSize: { type: Number },
  chestSize: { type: Number },
});

const BodyMeasurement = mongoose.model('BodyMeasurement', bodyMeasurementSchema);

module.exports = BodyMeasurement;
