import React, { useEffect, useState } from 'react';
import './Main.css';
import axios from 'axios';

const Main = () => {
  const [productsByCategory, setProductsByCategory] = useState({});

  // Fonction pour regrouper les produits par catégorie
  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  // Fonction pour récupérer les produits du backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/product/')
      .then(response => {
        const products = response.data; // Récupère la liste des produits
        const groupedProducts = groupByCategory(products); // Regroupe par catégorie
        setProductsByCategory(groupedProducts);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits :", error);
      });
  }, []);

  return (
    <div className="main-container">
      <h2>Categories</h2>

      {/* Parcours des catégories et produits */}
      {Object.keys(productsByCategory).map((category, index) => (
        <div key={index} className="category-section">
          <h2 style={{ color: 'blue' }}>{category}</h2>
          <div className="products-grid">
            {productsByCategory[category].map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.images.length > 0 ? product.images[0] : '/default-image.jpg'} 
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>Prix: {product.price} FCFA</p>
                  <span className="discount">{product.discount || "Aucune promotion"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
