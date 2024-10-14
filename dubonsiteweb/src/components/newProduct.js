import React, { useEffect, useState } from 'react';
import {  Typography} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import './NewProducts.css'; 

const NewProducts = () => {
  const [products, setProducts] = useState([]); // État pour stocker les produits
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null);     // État pour les erreurs
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour récupérer les produits du backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product/getNewProduct`);
        setProducts(response.data);  // Mettre à jour les produits
        setLoading(false);  // Arrêter l'état de chargement
      } catch (err) {
        setError('Erreur lors de la récupération des nouveaux produits');
        setLoading(false);
      }
    };

    fetchProducts(); // Appel de la fonction pour récupérer les produits
  }, []);

  if (loading) {
    return <Typography variant="body1">Chargement des nouveaux produits...</Typography>;
  }

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  const handleProductClick = (productId) => {
    navigate(`/productPage/${productId}`); // Redirection vers la page de détail du produit
  };
  return (
    <div className="container">
      <h4 className="title">Nouveaux Produits</h4>
      <div className="scroll-container">
        <div className="scroll-content">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-card" key={product._id} onClick={() => handleProductClick(product._id)}>
                <div className="card">
                  <img
                    className="card-media"
                    alt={product.title}
                    src={product.images[0]} // Assurez-vous que 'product.images' est une URL valide
                    title={product.title}
                  />
                  <div className="card-content">
                    <h6 className="product-title">{product.title}</h6>
                    <p className="product-description">{product.description}</p>
                    <h6 className="product-price">
                      {product.discount ? (
                        <>
                          {product.finalPrice} FCFA
                          <span className="price-original">{product.price} FCFA</span>
                          <span className="price-percentage">-{product.discount}%</span>
                        </>
                      ) : (
                        <span className="price">{product.price} FCFA</span>
                      )}
                    </h6>
                    <button className="buy-button">Acheter maintenant</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">Aucun produit disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
  

//   return (
//   <div className="container">
//     <h4 className="title">Nouveaux Produits</h4>
//     <div className="scroll-container">
//       <div className="scroll-content">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div className="product-card" key={product._id} onClick={() => handleProductClick(product._id)}>
//               <div className="card">
//                 <img
//                   className="card-media"
//                   alt={product.title}
//                   height="200"
//                   src={product.images[0]} // Assurez-vous que 'product.images' est une URL valide
//                   title={product.title}
//                 />
//                 <div className="card-content">
//                   <h6 className="product-title">{product.title}</h6>
//                   <p className="product-description">{product.description}</p>
//                   <h6 className="product-price">
//                     {product.discount ? (
//                       <>
//                         {product.finalPrice} FCFA
//                         <span className="price-original">{product.price} FCFA</span>
//                         <span className="price-percentage">-{product.discount}%</span>
//                       </>
//                     ) : (
//                       <span className="price">{product.price} FCFA</span>
//                     )}
//                   </h6>
//                   <button className="buy-button">Acheter maintenant</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="no-products">Aucun produit disponible.</p>
//         )}
//       </div>
//     </div>
//   </div>
// );

};

export default NewProducts;
