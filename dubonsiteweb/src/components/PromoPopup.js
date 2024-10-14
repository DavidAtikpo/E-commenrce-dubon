import React, { useState, useEffect } from 'react';
import './PromoPopup.css'; // Assurez-vous d'avoir un fichier CSS pour le style du pop-up

const PromoPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [promoCode, setPromoCode] = useState('');

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('userId'); // Vérifier si l'utilisateur est connecté
        const existingPromo = localStorage.getItem('promoCode'); // Vérifier si un code promo existe déjà

        if (!isLoggedIn && !existingPromo) {
            // Générer un code promo unique si l'utilisateur n'est pas connecté et n'a pas encore reçu de code
            const generatedCode = generatePromoCode();
            setPromoCode(generatedCode);
            localStorage.setItem('promoCode', generatedCode); // Sauvegarder le code promo pour éviter la régénération
            setShowPopup(true);  // Affiche le pop-up
        } else if (existingPromo) {
            // Si un code promo existe déjà dans le localStorage, le réutiliser
            setPromoCode(existingPromo);
            setShowPopup(true);  // Affiche le pop-up
        }
    }, []);

    const generatePromoCode = () => {
        // Exemple de logique de génération de code promo (peut être personnalisé)
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return `CODE PROMO:${code}`;
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Ferme le pop-up
    };

    if (!showPopup) return null;  // Si le pop-up ne doit pas s'afficher, ne renvoie rien

    return (
        <div className="promo-popup">
                <h2>Félicitations !</h2>
                <p>Vous avez reçu un code promo exclusif pour votre première visite :</p>
                <strong>{promoCode}</strong>
                <p>Utilisez ce code lors de votre commande pour obtenir une réduction sur nos produits.</p>
                <button className='bouton' onClick={handleClosePopup}>Fermer</button>
            
        </div>
    );
};

export default PromoPopup;
