// Récupérer toutes les commandes (pour l'administrateur)
import Order from "../models/Order.js";
const getOrders = async (req, res) => {
    try {
      const orders = await Order.find(); // Vous pouvez ajouter des filtres si nécessaire
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des commandes.' });
    }
  };
  
  // Mettre à jour le statut d'une commande
  const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Commande non trouvée' });
      }
  
      order.status = status;
      await order.save();
      res.json({ message: 'Statut mis à jour avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du statut' });
    }
  };
  export default {getOrders,updateOrder}