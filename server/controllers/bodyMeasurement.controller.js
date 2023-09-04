const BodyMeasurement = require('../models/bodyMeasurement.model');

// Create a new body measurement
exports.createBodyMeasurement = async (req, res) => {
  try {
    const userId = req.user.user_id; 
    const { date, weight, height, waistSize, chestSize } = req.body;
    
    const newBodyMeasurement = new BodyMeasurement({
      userId,
      date,
      weight,
      height,
      waistSize,
      chestSize,
    });
    
    const savedBodyMeasurement = await newBodyMeasurement.save();
    res.status(201).json(savedBodyMeasurement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all body measurements for a user
exports.getBodyMeasurementsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bodyMeasurements = await BodyMeasurement.find({ userId });
    res.status(200).json(bodyMeasurements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a body measurement by ID
exports.updateBodyMeasurementById = async (req, res) => {
  try {
    const updatedBodyMeasurement = await BodyMeasurement.findByIdAndUpdate(
      req.params.id,
      req.body, // Update with the request body
      { new: true } // Return the updated body measurement
    );
    
    if (!updatedBodyMeasurement) {
      return res.status(404).json({ message: 'Body measurement not found' });
    }

    res.status(200).json(updatedBodyMeasurement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a body measurement by ID
exports.deleteBodyMeasurementById = async (req, res) => {
  try {
    const deletedBodyMeasurement = await BodyMeasurement.findByIdAndRemove(req.params.id);
    
    if (!deletedBodyMeasurement) {
      return res.status(404).json({ message: 'Body measurement not found' });
    }

    res.status(200).json({ message: 'Body measurement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
