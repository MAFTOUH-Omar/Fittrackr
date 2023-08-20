const Consumer = require('../models/consumer.model');

// Créer un nouveau consommateur
// Contrôleur pour créer un nouveau consommateur
exports.createConsumer = async (req, res) => {
    try {
      // Extrait le `userId` du token JWT de l'utilisateur connecté
      const userId = req.user.user_id; // Assurez-vous que cela correspond à la structure de votre token
  
      const { age, weight, height, gender, goals } = req.body;
  
      // Créez une nouvelle instance de Consumer en incluant le `userId`
      const newConsumer = new Consumer({
        userId,
        age,
        weight,
        height,
        gender,
        goals,
      });
  
      // Enregistrez le consommateur dans la base de données
      const savedConsumer = await newConsumer.save();
  
      res.status(201).json(savedConsumer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur interne' });
    }
  };

// Récupérer tous les consommateurs
exports.getAllConsumers = async (req, res) => {
  try {
    const consumers = await Consumer.find();

    res.status(200).json(consumers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
};

// Récupérer un consommateur par ID
exports.getConsumerById = async (req, res) => {
  try {
    const consumer = await Consumer.findById(req.params.id);

    if (!consumer) {
      return res.status(404).json({ message: 'Consommateur non trouvé' });
    }

    res.status(200).json(consumer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
};

// Mettre à jour un consommateur par ID
exports.updateConsumerById = async (req, res) => {
  try {
    const { age, weight, height, gender, goals } = req.body;

    const updatedConsumer = await Consumer.findByIdAndUpdate(
      req.params.id,
      {
        age,
        weight,
        height,
        gender,
        goals,
      },
      { new: true }
    );

    if (!updatedConsumer) {
      return res.status(404).json({ message: 'Consommateur non trouvé' });
    }

    res.status(200).json(updatedConsumer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
};

// Supprimer un consommateur par ID
exports.deleteConsumerById = async (req, res) => {
  try {
    const deletedConsumer = await Consumer.findByIdAndRemove(req.params.id);

    if (!deletedConsumer) {
      return res.status(404).json({ message: 'Consommateur non trouvé' });
    }

    res.status(200).json({ message: 'Consommateur supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
};
