import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdBanner from './AdBanner';

const AdDisplay = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/banner/get-ads');
                console.log('Données récupérées depuis l\'API:', data); // Affiche les données récupérées
                setAds(data); // Stocker les publicités dans l'état
            } catch (error) {
                console.error("Erreur lors de la récupération des publicités", error);
            }
        };
    
        fetchAds();
    }, []);
    

    return (
        <div>
            {ads.length > 0 ? (
                ads.map((ad, index) => (
                    <AdBanner 
                        key={index}
                        imageUrl={ad.imageUrl} 
                        linkUrl={ad.linkUrl} 
                        altText={ad.altText} 
                    />
                ))
            ) : (
                <p>Aucune publicité disponible pour le moment.</p>
            )}
        </div>
    );
};

export default AdDisplay;
