const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth'); // Importez le middleware d'authentification JWT
const fitnessGoalController = require('../controllers/fitnessGoal.controller');

// Middleware d'authentification JWT pour protéger toutes les routes de ce groupe
router.use(authMiddleware);

// Routes CRUD protégées pour le modèle Consumer
router.post('/create', fitnessGoalController.createFitnessGoal);

// Get all fitness goals for a user
router.get('/', fitnessGoalController.getAllFitnessGoals);

// Get a fitness goal by ID
router.get('/:id', fitnessGoalController.getFitnessGoalById);

// Update a fitness goal by ID
router.put('/:id', fitnessGoalController.updateFitnessGoalById);

// Delete a fitness goal by ID
router.delete('/:id', fitnessGoalController.deleteFitnessGoalById);

module.exports = router;
