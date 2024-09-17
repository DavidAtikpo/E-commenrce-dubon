import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '..//productPage.css';

const ProductPage = () => {
    const { productId } = useParams();  // Pour obtenir l'ID du produit depuis l'URL
    const [product, setProduct] = useState({});

    useEffect(() => {
        // Charger les données du produit via API
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${productId}`);
            setProduct(data);
        };
        fetchProduct();
    }, [productId]);

    if (!product) return <div>Chargement...</div>;

    return (
        <div className="product-page">
            {/* En-tête produit (image et titre) */}
            <div className="product-header">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <div className="product-brand">Marque: {product.brand}</div>
                </div>
            </div>

            {/* Prix et ajout au panier */}
            <div className="product-price">
                {product.discount ? (
                    <>
                        <span className="price-discount">GH₵ {product.discountedPrice}</span>
                        <span className="price-original">GH₵ {product.price}</span>
                        <span className="price-percentage">-{product.discountPercentage}%</span>
                    </>
                ) : (
                    <span className="price">GH₵ {product.price}</span>
                )}
                <button className="add-to-cart-btn">Ajouter au panier</button>
            </div>

            {/* Détails du produit */}
            <div className="product-details-section">
                <h2>Product Details</h2>
                <p>{product.longDescription}</p>
                <h3>Specifications</h3>
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
                <h3>Questions about this product?</h3>
                <button className="chat-btn">Chat</button>
            </div>
        </div>
    );
};

export default ProductPage;
