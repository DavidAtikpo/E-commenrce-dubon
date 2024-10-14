import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import TopBar from '../components/topbar/TopBar';
import BeforeFooter from '../components/BeforeFooter';
import '../styles/pages/Carte.css';
import axios from 'axios';
import Footer from '../components/Footer';
import LoginPage from '../pages/auth/LoginPage';
import { calculateFinalPrice, calculateTotal } from '../utils/cartUtils';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../utils/cartActions';
import { handleProductClick } from '../utils/productUtils';
import CaptchaComponent from './auth/CaptchaComponent';
import { API_URL } from '../config';
import Modal from 'react-modal'; // Import du Modal depuis la bibliothèque React Modal

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const navigate = useNavigate();
  const [captchaValue] = useState(null);

// fonction pour trouver les produit dans le panier
  useEffect(() => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    setCartItems(cart);

// fontion pour retrouver les produit deja vu enregistres dans localstorsge
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewedProducts(recentlyViewed);

// fonction de verification de token dans cookie 
    const authToken = Cookies.get('authToken');
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  //enregistrement du prix total dans cookies
  useEffect(() => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    setCartItems(cart);
  
    // Calcul du total
    const total = calculateTotal(cart);
    
    // Enregistrement du total dans les cookies
    // const totals = calculateTotal(cartItems.toLocaleString)

    localStorage.setItem('cartTotal', total, { expires: 7 });
  
    console.log("Total price after update:", total); // Vérification du prix total
  }, []);


  //validation du CAPTCHA 

  // const handleCaptchaChange = (value) => {
  //   console.log("CAPTCHA token:", value); 
  //   setCaptchaValue(value);
  // };

  const handleVerificationSuccess = async () => {
    if (captchaValue) {
      try {
        const response = await axios.post( `${API_URL }/api/user/verify-recaptcha`, {
          token: captchaValue, // Envoyer le token du CAPTCHA au backend
        });
        console.log("Sending token:", captchaValue);
        if (response.data.success) {
          // Le CAPTCHA a été validé côté serveur
          setIsVerificationModalOpen(false);
          navigate('/shipping-address'); // Rediriger après la validation
        } else {
          alert('Échec de la validation CAPTCHA.');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du CAPTCHA:', error);
        alert('Erreur lors de la vérification CAPTCHA.');
      }
    }
  };

//fonction pour le shipping address
const handleCheckout = () => {
  if (isAuthenticated) {
    navigate('/shipping-address');
  } else {
    setIsVerificationModalOpen(true); // Ouvre le modal de vérification
  }
};

  const handleAddToCartFromModal = () => {
    const currentCart = [...cartItems];
    const productIndex = currentCart.findIndex(item => item._id === selectedProduct._id);
  
    if (productIndex !== -1) {
      currentCart[productIndex].quantity += 1;
    } else {
      currentCart.push({
        ...selectedProduct,
        quantity: 1
      });
    }
  
    setCartItems(currentCart);
    Cookies.set('cart', JSON.stringify(currentCart), { expires: 7 });
    
    console.log("Cart after update:", currentCart); // Vérification du contenu du panier dans la console
    setIsOptionsModalOpen(false);
    alert(`${selectedProduct.title} a été ajouté au panier.`);
  };
  

  // fonction pour on click sur detail 
  const handleViewDetailsFromModal = () => {
    navigate(`/productPage/${selectedProduct._id}`);
    setIsOptionsModalOpen(false);
  };

  return (
    <div className="cart-page">
      <TopBar cartItemsLength={cartItems.length} />

      <div className="cart-container">
        <div className="cart-left">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2>Votre panier est vide !</h2>
              <Link to="/" className="start-shopping-btn">
                Commencez vos achats
              </Link>
            </div>
          ) : (
            <div className="cart-items">
              <h2>Votre Panier ({cartItems.length})</h2>
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="product-price">Prix: {item.price.toLocaleString()} FCFA</p>
                    {item.discount && item.discount > 0 ? (
                      <span className="discount-badge">-{item.discount}%</span>
                    ) : (
                      <span className="no-discount">Aucune promotion</span>
                    )}
                    <p className="final-price">
                      Prix Final: {calculateFinalPrice(item.price, item.discount)} FCFA
                    </p>
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => decreaseQuantity(index, cartItems, setCartItems)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => increaseQuantity(index, cartItems, setCartItems)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(index, cartItems, setCartItems)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="cart-right">
        <h3>Récapitulatif du Panier</h3>
        <p>Sous-total: {calculateTotal(cartItems).toLocaleString()} FCFA</p>
        <p>Livraison gratuite sur les articles éligibles</p>
        <button className="checkout-btn" onClick={handleCheckout}>
          Passer à la commande (FCFA {calculateTotal(cartItems).toLocaleString()})
        </button>
      </div>

      <div className="recently-viewed">
        <h3>Produits consultés récemment</h3>
        <div className="recently-viewed-items">
          {recentlyViewedProducts.map((product, index) => (
            <div
              key={index}
              className="recently-viewed-item"
              onClick={() => handleProductClick(product, setSelectedProduct, setIsOptionsModalOpen)}
            >
              <img src={product.image} alt={product.title} className="recently-viewed-image" />
              <p>{product.title}</p>
              <p>Prix: {calculateFinalPrice(product.price, product.discount)} FCFA</p>
            </div>
          ))}
        </div>
      </div>

      <Modal
  isOpen={isOptionsModalOpen}
  onRequestClose={() => setIsOptionsModalOpen(false)}
  contentLabel="Choisissez une option"
  className="modal-content"  // Appliquez la classe CSS pour le modal
>
  <h3 className="modal-header">{selectedProduct?.title}</h3>  {/* Utilisez la classe pour le titre */}
  <button className="modal-button" onClick={handleAddToCartFromModal}>Ajouter au panier</button>
  <button className="modal-button secondary" onClick={handleViewDetailsFromModal}>Voir les détails</button>
</Modal>

<Modal
        isOpen={isVerificationModalOpen}
        onRequestClose={() => setIsVerificationModalOpen(false)}
        contentLabel="Vérification"
        className="modal-verification-content"
      >
        <h3 className="modal-verification-header">Vérification de l'utilisateur</h3>
        <p>Veuillez confirmer que vous n'êtes pas un robot.</p>
        <CaptchaComponent onVerificationSuccess={handleVerificationSuccess} />
      </Modal>


      {/* Modal de connexion */}
      <Modal
  isOpen={isLoginModalOpen}
  onRequestClose={() => setIsLoginModalOpen(false)}
  contentLabel="Modal de Connexion"
  className="modal-login-content"  // Utilisation de la classe CSS au lieu du style inline
>
  <h3 className="modal-login-header">Connexion</h3>  {/* Vous pouvez personnaliser le titre si nécessaire */}
  <LoginPage />
</Modal>

      <BeforeFooter />
      <Footer />
    </div>
  );
};

export default Cart;
