import React, { useState } from 'react';

const CheckoutPage = () => {
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        phone: '',
    });

    const handleChange = (e) => {
        setShippingDetails({
            ...shippingDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
            const cart = JSON.parse(localStorage.getItem('cart'));
        
            const orderData = {
                shippingDetails,
                cart,
            };
        
            try {
                const response = await axios.post('http://localhost:5000/api/orders/create', orderData);
                if (response.status === 201) {
                    alert('Commande passée avec succès !');
                    localStorage.removeItem('cart');  // Vider le panier après la commande
                }
            } catch (error) {
                console.error("Erreur lors de la création de la commande :", error);
                alert('Erreur lors de la commande.');
            }
    
        
        // Envoyer les détails de la commande à l'API backend
        console.log('Commande passée avec succès', shippingDetails);
    };

    return (
        <div className="checkout-page">
            <h2>Informations de livraison</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom complet"
                    value={shippingDetails.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={shippingDetails.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Ville"
                    value={shippingDetails.city}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Pays"
                    value={shippingDetails.country}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Téléphone"
                    value={shippingDetails.phone}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Confirmer la commande</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
