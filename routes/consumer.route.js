const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth'); // Importez le middleware d'authentification JWT
const consumerController = require('../controllers/consumer.controller');

// Middleware d'authentification JWT pour protéger toutes les routes de ce groupe
router.use(authMiddleware);

// Routes CRUD protégées pour le modèle Consumer
router.post('/create', consumerController.createConsumer);
router.get('/', consumerController.getAllConsumers);
router.get('/:id', consumerController.getConsumerById);
router.put('/:id', consumerController.updateConsumerById);
router.delete('/:id', consumerController.deleteConsumerById);

module.exports = router;
