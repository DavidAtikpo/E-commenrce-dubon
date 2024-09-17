import React from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import BeforeFooter from '../components/BeforeFooter';
import Footer from '../components/Footer';
import '../styles/pages/Carte.css';

const Cart = ({ recentlyViewedProducts = [] }) => {
  // Si le panier est vide
  const isCartEmpty = true; // Remplacez par la logique pour vérifier si le panier est vide

  return (
    <div className="cart-page">
      <NavBar/>
      {isCartEmpty ? (
        <div className="empty-cart">
          <img
            src="path_to_empty_cart_icon"
            alt="Empty cart"
            className="empty-cart-icon"
          />
          <h2>Your cart is empty!</h2>
          <p>
            Browse our categories and discover our best deals!
          </p>
          <Link to="/" className="start-shopping-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-items">
          {/* Logic pour afficher les items dans le panier */}
        </div>
      )}

      {/* Section Recently Viewed */}
      <div className="recently-viewed">
        <h3>Recently Viewed</h3>
        <div className="recent time-viewed-items">
          {/* Vérification si recentlyViewedProducts est défini et est un tableau */}
          {recentlyViewedProducts.length > 0 ? (
            recentlyViewedProducts.map((product, index) => (
              <div key={index} className="recently-viewed-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="recently-viewed-image"
                />
                <div className="recently-viewed-details">
                  <p>{product.name}</p>
                  <span className="recently-viewed-price">
                    {product.discount ? (
                      <>
                        <span className="discounted-price">GH₵ {product.discountedPrice}</span>
                        <span className="original-price">GH₵ {product.price}</span>
                        <span className="discount-percentage">-{product.discountPercentage}%</span>
                      </>
                    ) : (
                      <span>GH₵ {product.price}</span>
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No recently viewed products</p>
          )}
        </div>
        <Link to="/recently-viewed" className="see-all-link">See All</Link>
      </div>
      <BeforeFooter/>
      <Footer/>
    </div>
  );
};

export default Cart;
