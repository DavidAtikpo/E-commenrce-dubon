import React, { useEffect, useState } from 'react';
import './Main.css';
import axios from 'axios';

const Main = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [imageIndexes, setImageIndexes] = useState({}); // Stocker l'index des images par produit

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

        // Initialiser les index des images pour chaque produit à 0
        const initialIndexes = {};
        products.forEach(product => {
          initialIndexes[product._id] = 0;
        });
        setImageIndexes(initialIndexes);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits :", error);
      });
  }, []);

  // Fonction pour faire défiler les images des produits
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };

        // Pour chaque produit, incrémenter l'index ou revenir à 0 si à la fin de la liste des images
        Object.keys(newIndexes).forEach(productId => {
          const product = Object.values(productsByCategory).flat().find(p => p._id === productId);
          if (product && product.images.length > 1) {
            newIndexes[productId] = (newIndexes[productId] + 1) % product.images.length;
          }
        });

        return newIndexes;
      });
    }, 3000); // 0,3 secondes

    // Nettoyage de l'intervalle à la fin du composant
    return () => clearInterval(interval);
  }, [productsByCategory]);

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
                  src={product.images.length > 0 ? product.images[imageIndexes[product._id]] : '/default-image.jpg'} 
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
