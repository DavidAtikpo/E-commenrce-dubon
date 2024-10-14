import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import Cookies from 'js-cookie';
import '../styles/pages/AdminPage.css'
import Footer from '../components/Footer';
import TopBar from '../components/topbar/TopBar';
import BeforeFooter from '../components/BeforeFooter';
import { FaFacebookF, FaWhatsapp, FaTwitter, } from 'react-icons/fa'; // Import des icônes
import logo from '../assets/favicon.png';
import { API_URL } from '../config';
import ProductRating from '../components/ProductRating'
const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/product/get-product/${productId}`);
                setProduct(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails du produit :", error);
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // const handleAddToCart = () => {
    //     if (!product) return;
    
    //     const currentCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        
    //     // Chercher si le produit est déjà dans le panier
    //     const existingProductIndex = currentCart.findIndex(item => item._id === product._id);
    
    //     if (existingProductIndex !== -1) {
    //         // Si le produit existe déjà, incrémenter la quantité
    //         currentCart[existingProductIndex].quantity += quantity;
    //     } else {
    //         // Si le produit n'existe pas, l'ajouter au panier
    //         const productToAdd = {
    //             ...product,
    //             quantity,
    //             image: product.images[0], // Utiliser la première image
    //         };
    //         currentCart.push(productToAdd);
    //     }
    
    //     // Mettre à jour le cookie
    //     Cookies.set('cart', JSON.stringify(currentCart), { expires: 7 });
    
    //     alert(`${product.title} ajouté au panier!`);
    // };
    


    // enregistrer le panier dans le localstorage
    const handleAddToCart = () => {
        if (!product) return;
    
        // Récupérer le panier à partir du localStorage
        const currentCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        
        // Chercher si le produit est déjà dans le panier
        const existingProductIndex = currentCart.findIndex(item => item._id === product._id);
    
        if (existingProductIndex !== -1) {
            // Si le produit existe déjà, incrémenter la quantité
            currentCart[existingProductIndex].quantity += quantity;
        } else {
            // Si le produit n'existe pas, l'ajouter au panier
            const productToAdd = {
                ...product,
                quantity,
                image: product.images[0], // Utiliser la première image
            };
            currentCart.push(productToAdd);
        }
    
        // Mettre à jour le localStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));
    
        alert(`${product.title} ajouté au panier!`);
    };
    



    

    useEffect(() => {
        if (product) {
            const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
            
            // Vérifier si le produit est déjà dans la liste
            const productExists = recentlyViewed.find(item => item._id === product._id);
            
            if (!productExists) {
                const productToAdd = {
                    ...product,
                    image: product.images[0],
                };
                recentlyViewed.push(productToAdd);
                localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
            }
        }
    }, [product]);
    
    

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!product) {
        return <div>Produit introuvable.</div>;
    }

    return (
        <div className="product-page">
            <TopBar />
            <div className="product-container">
                <div className="product-images">
                    <img 
                        src={product.images && product.images.length > 0 ? product.images[selectedImageIndex] : logo} 
                        alt={product.title} 
                        className="product-main-image" 
                    />
                    <div className="thumbnail-container">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index}`}
                                className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                                onClick={() => setSelectedImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-details">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    {/* <div className="product-brand">Marque: {product.brand}</div> */}

                    {/* Section des évaluations */}
                    <div className="product-rating">
                    <ProductRating productId={product._id} />
                    </div>

                    <div className="product-price">
                        {product.discount ? (
                            <>
                                <span className="price-discount">{product.finalPrice} FCFA</span>
                                <span className="price-original">{product.price} FCFA</span>
                                <span className="price-percentage">-{product.discount}%</span>
                            </>
                        ) : (
                            <span className="price">{product.price} FCFA</span>
                        )}
                    </div>

                    <div className="quantity-selector">
                        <label>Quantité:</label>
                        <input 
                            type="number" 
                            value={quantity} 
                            min="1" 
                            onChange={(e) => setQuantity(Number(e.target.value))} 
                        />
                    </div>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Ajouter au panier
                    </button>

                    {/* Section de partage sur les réseaux sociaux */}
                    <div className="social-share">
                        <p>Partager ce produit :</p>
                        <div className="social-icons">
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="social-icon" />
                            </a>
                            <a href={`https://api.whatsapp.com/send?text=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp className="social-icon" />
                            </a>
                            <a href={`https://twitter.com/share?url=${window.location.href}&text=Check out this product!`} target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="social-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <BeforeFooter />
            <Footer />
        </div>
    );
};

export default ProductDetails;
