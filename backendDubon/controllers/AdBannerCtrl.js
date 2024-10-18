import  Ad from'../models/bannerModel.js'; 

// Route pour ajouter une publicité
const createBanner = async (req, res) => {
    const { imageUrl, linkUrl, altText } = req.body;
    console.log("url",imageUrl);
    
    try {
        const newAd = await  Ad({
            imageUrl,
            linkUrl,
            altText,
        });

        await newAd.save();
        res.status(201).json({ message: 'Publicité ajoutée avec succès', ad: newAd });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la publicité' });
    }
};

// Route pour récupérer toutes les publicités
const getBanner = async (req, res) => {
    
    try {
        const ads = await Ad.find();
        console.log("url",ads);
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des publicités' });
    }
};

export default {createBanner, getBanner};
