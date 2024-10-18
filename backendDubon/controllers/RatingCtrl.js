import Rating from '../models/RatingModel.js';
import Order from'../models/Order.js';

// Fonction pour créer une évaluation
 const createRating = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id
  
    // Vérifier que les données nécessaires sont présentes
    if (!userId) {
      return res.status(400).json({ message: "userId est requis." });
    }
  
    try {
      const newRating = new Rating({
        productId,
        userId, // Assurez-vous d'inclure userId ici
        rating,
        comment,
      });
  
      const savedRating = await newRating.save();
      res.status(201).json(savedRating);
    } catch (error) {
      console.error('Erreur lors de la création de l\'évaluation:', error);
      res.status(500).json({ message: 'Erreur lors de la création de l\'évaluation' });
    }
  };

  const getRating = async (req, res) => {
    try {
      // Récupérer les évaluations du produit et inclure le nom et la photo de profil de l'utilisateur
      const ratings = await Rating.find({ productId: req.params.productId })
        .populate('userId', 'username profilePicture'); // Inclure les champs 'username' et 'profilePicture'
  
      res.json({ ratings });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des évaluations', error: error.message });
    }
  };
  
  

const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json({
      status: order.status,
      isPaid: order.isPaid,
      deliveryStatus: order.deliveryStatus
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du statut de la commande', error });
  }
};


export default {createRating,getRating,getOrderStatus}