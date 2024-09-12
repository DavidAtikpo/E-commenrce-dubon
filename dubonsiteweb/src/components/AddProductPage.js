import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import './AddProductPage.css'

const AddProductPage = () => {
  // Initialiser l'état pour stocker les données du formulaire
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaName, setMetaName] = useState('');
  const [metaTags, setMetaTags] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

//   const navigate = useNavigate();

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: productName,
      category: productCategory,
      price: productPrice,
      discount: productDiscount,
      description: productDescription,
      meta: {
        title: metaTitle,
        name: metaName,
        tags: metaTags,
        description: metaDescription
      }
    };

    try {
      // Envoyer une requête POST à votre backend
      const response = await axios.post('http://votre-backend-url/api/products', productData);

      if (response.status === 201) {
        alert('Produit ajouté avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
      alert('Erreur lors de l\'ajout du produit');
    }
  };

  return (
    <div className="add-product-page">
      <h1>Product Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="general-info">
          <h2>General Information</h2>
          <label>Product Name *</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />

          <label>Product Category *</label>
          <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required>
            <option value="">Select Product Category</option>
            <option value="electronics">Electronics</option>
            <option value="home-decor">Home Decor</option>
            {/* Ajouter d'autres catégories ici */}
          </select>

          <label>Product Price *</label>
          <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />

          <label>Product Discount (%)</label>
          <input type="number" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} />

          <label>Product Description *</label>
          <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required></textarea>
        </div>

        <div className="meta-info">
          <h2>Meta Data</h2>
          <label>Meta Title *</label>
          <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} required />

          <label>Meta Name *</label>
          <input type="text" value={metaName} onChange={(e) => setMetaName(e.target.value)} required />

          <label>Meta Tags *</label>
          <input type="text" value={metaTags} onChange={(e) => setMetaTags(e.target.value)} required />

          <label>Meta Description *</label>
          <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} required></textarea>
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
