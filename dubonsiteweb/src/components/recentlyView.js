import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RecentlyViewed = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    // Ouvrir le modal pour choisir entre "Détails" ou "Ajouter au panier"
    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowOptions(true);
    };

    const handleAddToCart = () => {
        if (!selectedProduct) return;

        const currentCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        
        const existingProductIndex = currentCart.findIndex(item => item._id === selectedProduct._id);
        if (existingProductIndex !== -1) {
            currentCart[existingProductIndex].quantity += 1;
        } else {
            const productToAdd = {
                ...selectedProduct,
                quantity: 1,
                image: selectedProduct.images[0],
            };
            currentCart.push(productToAdd);
        }
        
        Cookies.set('cart', JSON.stringify(currentCart), { expires: 7 });
        alert(`${selectedProduct.title} ajouté au panier!`);
        setShowOptions(false); // Fermer le modal après l'ajout
    };

    const handleViewDetails = () => {
        if (!selectedProduct) return;
        navigate(`/product/${selectedProduct._id}`);
        setShowOptions(false); // Fermer le modal après redirection
    };

    return (
        <div>
            <h2>Produits récemment consultés</h2>
            <div className="recently-viewed-container">
                {products.map(product => (
                    <div key={product._id} onClick={() => handleProductClick(product)}>
                        <img src={product.image} alt={product.title} />
                        <p>{product.title}</p>
                    </div>
                ))}
            </div>

            {showOptions && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{selectedProduct?.title}</h3>
                        <p>Que souhaitez-vous faire ?</p>
                        <button onClick={handleAddToCart}>Ajouter au panier</button>
                        <button onClick={handleViewDetails}>Voir les détails</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentlyViewed;
