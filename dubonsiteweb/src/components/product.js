import React, { useEffect, useState } from 'react';
import './product.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ajout de useNavigate

const Product = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [imageIndexes, setImageIndexes] = useState({});
  const navigate = useNavigate(); // Utilisation de useNavigate

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

  useEffect(() => {
    axios.get('http://localhost:5000/api/product/')
      .then(response => {
        const products = response.data;
        const groupedProducts = groupByCategory(products);
        setProductsByCategory(groupedProducts);

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

  const handleProductClick = (productId) => {
    navigate(`/productPage/${productId}`); // Redirection vers la page de détail du produit
  };

  return (
    <div className="main-container">
      <h2>Categories</h2>
      {Object.keys(productsByCategory).map((category, index) => (
        <div key={index} className="category-section">
          <h2 style={{ color: 'blue' }}>{category}</h2>
          <div className="products-grid">
            {productsByCategory[category].map((product) => (
              <div key={product._id} className="product-card" onClick={() => handleProductClick(product._id)}>
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

export default Product;
