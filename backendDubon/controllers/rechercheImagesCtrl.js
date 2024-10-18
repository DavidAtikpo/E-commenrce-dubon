
import multer from 'multer'
import cv from'opencv4nodejs'; // Librairie de vision par ordinateur


// Configurer Multer pour le téléchargement d'image
const upload = multer({ dest: 'uploads/' });

// Endpoint pour recherche par image
const searchByImg = async (req, res) => {
    try {
        const imagePath = req.file.path;  // Chemin de l'image téléchargée
        const image = cv.imread(imagePath);  // Lire l'image

        // Simuler l'analyse de l'image (ici, vous feriez la vraie comparaison avec vos produits)
        const results = [
            { id: 1, name: 'Produit A', image: '/images/productA.jpg' },
            { id: 2, name: 'Produit B', image: '/images/productB.jpg' }
        ];

        res.json(results);  // Renvoyer les résultats de la recherche
    } catch (error) {
        console.error('Erreur lors de la recherche par image', error);
        res.status(500).json({ message: 'Erreur lors de la recherche par image' });
    }
};

import vision from '@google-cloud/vision';

import upload from multer({ dest: 'uploads/' });

// Initialiser le client Google Vision
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'path/to/your/google-cloud-keyfile.json'
});

app.post('/api/search-by-image', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;

        // Analyse de l'image par Google Vision API
        const [result] = await client.labelDetection(imagePath);
        const labels = result.labelAnnotations;

        // Simuler une correspondance de produits en fonction des étiquettes détectées
        const results = labels.map(label => ({
            id: label.mid,
            name: label.description,
            score: label.score
        }));

        res.json(results);  // Renvoyer les résultats
    } catch (error) {
        console.error('Erreur lors de la recherche par image', error);
        res.status(500).json({ message: 'Erreur lors de la recherche par image' });
    }
});


export default {searchByImg}