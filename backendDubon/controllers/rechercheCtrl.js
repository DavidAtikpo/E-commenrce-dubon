
import Product from './models/Product'; // Modèle de produit

// Endpoint pour les suggestions de recherche
const search = async (req, res) => {
    const { q } = req.query; // Récupérer la chaîne de requête

    try {
        // Rechercher les produits dont le nom contient les lettres tapées
        const products = await Product.find({
            name: { $regex: q, $options: 'i' } // Insensible à la casse
        }).limit(10); // Limiter à 10 résultats

        res.json(products);  // Envoyer les résultats au frontend
    } catch (error) {
        console.error('Erreur lors de la recherche', error);
        res.status(500).json({ message: 'Erreur lors de la recherche' });
    }
};

export default {search}