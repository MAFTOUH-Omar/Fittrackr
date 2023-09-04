const express = require('express');
const router = express.Router();
const {
  createBodyMeasurement,
  getBodyMeasurementsByUserId,
  updateBodyMeasurementById,
  deleteBodyMeasurementById,
} = require('../controllers/bodyMeasurement.controller');
const { authMiddleware } = require('../middleware/auth');

// Create a new body measurement
router.post('/', authMiddleware, createBodyMeasurement);

// Get all body measurements for a user by user ID
router.get('/:userId', authMiddleware, getBodyMeasurementsByUserId);

// Update a body measurement by ID
router.put('/:id', authMiddleware, updateBodyMeasurementById);

// Delete a body measurement by ID
router.delete('/:id', authMiddleware, deleteBodyMeasurementById);

module.exports = router;