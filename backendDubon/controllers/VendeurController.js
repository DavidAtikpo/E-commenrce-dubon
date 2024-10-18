// backend/routes/user.js
import User from '../models/userModel.js'; // modèle utilisateur
import Order from '../models/Order.js';
import Product from '../models/productModel.js'; // modèle de produit

// Route pour mettre à jour l'utilisateur en tant que vendeur
const updateUserProfil = async (req, res) => {
  const { userId } = req.body; // Id de l'utilisateur (tu peux le récupérer depuis un token ou une session)
  
  try {
    const user = await User.findById(userId);
    if (user) {
      user.role = 'vendeur'; // Mise à jour du rôle de l'utilisateur
      await user.save();
      res.json({ success: true, message: 'Vous êtes maintenant vendeur' });
    } else {
      res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur du serveur' });
  }
};



// Route pour ajouter un nouveau produit
const postProduct = async (req, res) => {
  const { nom, description, prix, quantite, vendeurId } = req.body; // Assure-toi de récupérer le vendeurId

  try {
    const nouveauProduit = new Product({
      nom,
      description,
      prix,
      quantite,
      vendeur: vendeurId, // Associe le produit au vendeur
    });

    await nouveauProduit.save();
    res.json({ success: true, message: 'Produit ajouté avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout du produit' });
  }
};


// Route pour récupérer les produits d'un vendeur
const getProduct = async (req, res) => {
  const { vendeurId } = req.query; // Récupérer l'ID du vendeur
  try {
    const produits = await Product.find({ vendeur: vendeurId });
    res.json({ success: true, produits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des produits' });
  }
};

// backend/routes/vendeur.js


// Route pour récupérer les commandes d'un vendeur
const getCommande = async (req, res) => {
  const { vendeurId } = req.query; // Récupérer l'ID du vendeur
  try {
    const commandes = await Order.find({ 'produit.vendeur': vendeurId }).populate('produit');
    res.json({ success: true, commandes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des commandes' });
  }
};



export default {updateUserProfil,postProduct,getProduct,getCommande}
