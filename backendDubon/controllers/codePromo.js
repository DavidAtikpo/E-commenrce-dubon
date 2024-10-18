import User from '../models/userModel.js'; // Modèle utilisateur
import PromoCode from '../models/PromoCode.js';

// Fonction pour générer un code promo aléatoire
const generatePromoCode = () => {
    return 'PROMO2024-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Route pour vérifier et générer un code promo
const codePromo = async (req, res) => {
    const userId = req.body.userId; // ID de l'utilisateur envoyé depuis le frontend
    
    try {
        // Vérifier si l'utilisateur a visité le site pour la première fois
        const user = await User.findById(userId);

        if (!user.firstVisit) {
            // Si c'est la première visite et qu'il reste des codes promo
            const totalPromoCodes = await PromoCode.countDocuments();
            if (totalPromoCodes < 1000) {
                const promoCode = generatePromoCode();
                
                // Enregistrer le code promo dans la base de données
                const newPromo = new PromoCode({
                    userId: userId,
                    code: promoCode,
                    used: false
                });
                await newPromo.save();

                // Marquer l'utilisateur comme ayant visité le site
                user.firstVisit = true;
                await user.save();

                return res.status(200).json({ success: true, code: promoCode });
            } else {
                return res.status(400).json({ success: false, message: "Le nombre maximum de codes promo a été atteint." });
            }
        } else {
            return res.status(400).json({ success: false, message: "L'utilisateur a déjà visité le site." });
        }
    } catch (error) {
        console.error("Erreur lors de la génération du code promo :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};

export default codePromo
