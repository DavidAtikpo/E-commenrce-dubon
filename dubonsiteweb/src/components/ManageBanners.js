import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBanners = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/banner/get-ads');
                setAds(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des bannières', error);
            }
        };

        fetchAds();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/banner/delete/${id}`);
            setAds(ads.filter((ad) => ad._id !== id));
            alert('Bannière supprimée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de la bannière', error);
        }
    };

    return (
        <div>
            <h2>Gérer les bannières publicitaires</h2>
            {ads.map((ad) => (
                <div key={ad._id} className="ad-item">
                    <p>{ad.altText}</p>
                    <img src={ad.imageUrl} alt={ad.altText} style={{ width: '100px', height: 'auto' }} />
                    <button onClick={() => handleDelete(ad._id)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
};

export default ManageBanners;
