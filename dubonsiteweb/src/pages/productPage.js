import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/productPage.css';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import BeforeFooter from '../components/BeforeFooter';
import logo from '../assets/favicon.png';  // Image par défaut

const ProductPage = ({ addToCart }) => {
    const { productId } = useParams();  // Pour obtenir l'ID du produit depuis l'URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);  // Gérer la quantité sélectionnée par l'utilisateur
    const [isLoading, setIsLoading] = useState(true);  // Indicateur de chargement

    useEffect(() => {
        // Charger les données du produit via API
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/product/${productId}`);
                setProduct(data);
                setIsLoading(false);  // Arrêter le chargement
            } catch (error) {
                console.error("Erreur lors de la récupération des détails du produit :", error);
                setIsLoading(false);  // Arrêter le chargement en cas d'erreur
            }
        };
        fetchProduct();
    }, [productId]);

    if (isLoading) {
        return <div>Chargement...</div>;  // Affichage pendant le chargement
    }

    if (!product) {
        return <div>Produit introuvable.</div>;  // Cas où le produit n'existe pas
    }

    // Fonction pour gérer l'ajout au panier
    const handleAddToCart = () => {
        const productToAdd = {
            ...product,
            quantity,  // Ajouter la quantité sélectionnée
        };
        addToCart(productToAdd);  // Ajouter le produit au panier via la fonction prop `addToCart`
        alert(`${product.name} ajouté au panier!`);
    };

    return (
        <div className="product-page">
            <NavBar />

            {/* En-tête produit (image et titre) */}
            <div className="product-header">
                <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : logo} 
                    alt={product.name} 
                    className="product-image" 
                />
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <div className="product-brand">Marque: {product.brand}</div>
                </div>
            </div>

            {/* Prix, quantité et ajout au panier */}
            <div className="product-price">
                {product.discount ? (
                    <>
                        <span className="price-discount">{product.discountedPrice} FCFA</span>
                        <span className="price-original">{product.price} FCFA</span>
                        <span className="price-percentage">-{product.discount}%</span>
                    </>
                ) : (
                    <span className="price">{product.price} FCFA</span>
                )}
                <div className="quantity-selector">
                    <label>Quantité:</label>
                    <input 
                        type="number" 
                        value={quantity} 
                        min="1" 
                        onChange={(e) => setQuantity(Number(e.target.value))}  // Convertir la valeur en nombre
                    />
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Ajouter au panier</button>
            </div>

            {/* Détails du produit */}
            <div className="product-details-section">
                <h2>Détails du produit</h2>
                <p>{product.longDescription}</p>
                <h3>Spécifications</h3>
                <ul>
                    {product.specifications && product.specifications.map((spec, index) => (
                        <li key={index}>{spec}</li>
                    ))}
                </ul>
            </div>

            {/* Section Avis clients */}
            <div className="product-reviews">
                <h3>Évaluations des utilisateurs ({product.reviews?.length} évaluations)</h3>
                {product.reviews && product.reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p>Étoiles: {review.rating} / 5</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>

            {/* Section Questions */}
            <div className="product-questions">
                <h3>Questions à propos de ce produit?</h3>
                <button className="chat-btn">Chat</button>
            </div>

            <BeforeFooter />
            <Footer />
        </div>
    );
};

export default ProductPage;
