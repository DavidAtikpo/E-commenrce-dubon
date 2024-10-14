// import React, { useEffect, useState } from 'react';
// import '../../components/product.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { API_URL } from '../../config';
// import NewProducts from '../../components/newProduct';

// const ProductManagement = () => {
//   const [productsByCategory, setProductsByCategory] = useState({});
//   const [imageIndexes, setImageIndexes] = useState({});
//   const navigate = useNavigate();

//   // Regrouper les produits par catégorie
//   const groupByCategory = (products) => {
//     return products.reduce((acc, product) => {
//       const category = product.category;
//       if (!acc[category]) {
//         acc[category] = [];
//       }
//       acc[category].push(product);
//       return acc;
//     }, {});
//   };

//   // Charger les produits depuis le serveur
//   useEffect(() => {
//     axios.get(`${API_URL}/api/product/`)
//       .then(response => {
//         const products = response.data;
//         const groupedProducts = groupByCategory(products);
//         setProductsByCategory(groupedProducts);

//         const initialIndexes = {};
//         products.forEach(product => {
//           initialIndexes[product._id] = 0;
//         });
//         setImageIndexes(initialIndexes);
//       })
//       .catch(error => {
//         console.error("Erreur lors de la récupération des produits :", error);
//       });
//   }, []);

//   // Changer l'index de l'image pour faire défiler les images des produits
//   const handleImageIndexChange = (productId, direction) => {
//     setImageIndexes((prevIndexes) => {
//       const newIndex = (prevIndexes[productId] + direction + productsByCategory.length) % productsByCategory[productId].images.length;
//       return { ...prevIndexes, [productId]: newIndex };
//     });
//   };

//   // Rediriger vers la page de détail du produit
//   const handleProductClick = (productId) => {
//     navigate(`/dubon-ser-pro-ma/${productId}`);
//   };

//   return (
//       <div className="main-container">
//         <NewProducts/>,
//       <h2 className="category-title">Categories</h2>
//       {Object.keys(productsByCategory).map((category, index) => (
//         <div key={index} className="category-section">
//           <h2 className="category-name">{category}</h2>
//           <div className="products-grid">
//             {productsByCategory[category].map((product) => (
//               <div key={product._id} className="product-card" onClick={() => handleProductClick(product._id)}>
//                 <div className="product-image-container">
//                   <button
//                     className="image-nav-button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleImageIndexChange(product._id, -1);
//                     }}
//                   >&#8249;</button>
//                   <img
//                     src={product.images.length > 0 ? product.images[imageIndexes[product._id]] : '/default-image.jpg'}
//                     alt={product.title}
//                     className="product-image"
//                   />
//                   <button
//                     className="image-nav-button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleImageIndexChange(product._id, 1);
//                     }}
//                   >&#8250;</button>
//                 </div>
//                 <div className="product-info">
//                   <h3 className="product-title">{product.title}</h3>
//                   <p className="product-price">Prix: {product.price.toLocaleString()} FCFA</p>
//                   {product.discount && product.discount > 0 ? (
//                     <span className="discount-badge">-{product.discount}%</span>
//                   ) : (
//                     <span className="no-discount">Aucune promotion</span>
//                   )}
//                   <p className="final-price">Prix Final: {(product.price - (product.price * product.discount / 100)).toFixed(2)} FCFA</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductManagement;

import React, { useEffect, useState } from 'react';
import './AdminProduct.css';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const navigate = useNavigate();

  // Charger les produits depuis le serveur
  useEffect(() => {
    axios.get(`${API_URL}/api/product/`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits :", error);
      });
  }, []);

  // Filtrer les produits par le terme de recherche
  const filteredProducts = products.filter(product => 
    (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleProductsPerPageChange = (event) => {
    setProductsPerPage(Number(event.target.value));
    setCurrentPage(1); // Retour à la première page quand on change le nombre de produits par page
  };

  // Dropdown handling for actions
  const handleDropdownClick = (productId) => {
    setSelectedProduct(selectedProduct === productId ? null : productId); // Ouvre/ferme le menu dropdown
  };

  const handleAction = (action, productId) => {
    console.log(`Action ${action} sur le produit avec ID : ${productId}`);
    // Gérer l'action ici (rediriger vers une page d'édition, etc.)
  };

  return (
    <div className="product-management">
      <h1>Gestion des produits</h1>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Start typing to search for products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Choix du nombre de produits par page */}
      <div className="table-controls">
        <label>
          Rows per page:
          <select value={productsPerPage} onChange={handleProductsPerPageChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom du produit</th>
            <th>Catégorie</th>
            <th>Stock</th>
            <th>Prix</th>
            <th>Remise</th>
            <th>Réduction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.images || '/default-image.jpg'} alt={product.title} className="product-image" />
              </td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>
                {product.stock > 0 ? (
                  <span className="in-stock">{product.stock} en stock</span>
                ) : (
                  <span className="out-of-stock">Rupture de stock</span>
                )}
              </td>
              <td>{product.price} FCFA</td>
              <td>{product.discount ? `${product.discount}%` : 'Pas de remise'}</td>
              <td>{(product.price - (product.price * product.discount / 100)).toFixed(2)} FCFA</td>
              <td className="actions">
                <div className="dropdown">
                  <button className='tp' onClick={() => handleDropdownClick(product._id)}>&#x22EE;</button>
                  {selectedProduct === product._id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleAction('edit', product._id)}>Editer</button>
                      <button onClick={() => handleAction('duplicate', product._id)}>Dupliquer</button>
                      <button onClick={() => handleAction('addTag', product._id)}>Ajouter un tag</button>
                      <button onClick={() => handleAction('removeTag', product._id)}>Enlever un tag</button>
                      <button onClick={() => handleAction('delete', product._id)} className="delete-button">Supprimer</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
