import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logo from '../assets/favicon.png'

const ProductDetail = () => {
  const { productId } = useParams(); // Récupérer l'ID du produit à partir de l'URL
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // État de chargement

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${productId}`)
      .then(response => {
        setProduct(response.data);
        setIsLoading(false); // Arrêter l'état de chargement
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails du produit :", error);
        setIsLoading(false); // Arrêter l'état de chargement même en cas d'erreur
      });
  }, [productId]);

  if (isLoading) {
    return <div>Chargement...</div>; // Affichage pendant le chargement
  }

  if (!product) {
    return <div>Produit introuvable.</div>; // Cas où le produit n'existe pas
  }

  return (
    <div>
      <h2>{product.title}</h2>
      {product.images && product.images.length > 0 ? (
        <img src={product.images[0]} alt={product.title} />
      ) : (
        <img src={logo} alt={product.title} />  // Image par défaut si aucune image n'est disponible
      )}
      <p>{product.description}</p>
      <p>Prix: {product.price} FCFA</p>
      {product.discount && <p>Remise: {product.discount}%</p>}
      <button className="add-to-cart-btn">Ajouter au panier</button>
    </div>
  );
};

export default ProductDetail;
