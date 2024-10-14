import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { API_URL } from '../config';

const EditProduct = () => {
  const { productId } = useParams();
  const history = useHistory();
  
  const [productData, setProductData] = useState({
    title: '',
    slug: '',
    description: '',
    price: 0,
    discount: 0,
    finalPrice: 0,
    category: '',
    quantity: 0,
    specifications: '',
    variants: [],
    taxRate: 0,
    availability: '',
    dimensions: { length: '', width: '', height: '', weight: '' },
    tags: [],
    meta: { title: '', description: '', keywords: [] },
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/product/get-product/${productId}`);
        setProductData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
        setError("Produit non trouvé");
      }
    };
    
    fetchProductDetails();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleDimensionsChange = (e) => {
    const { name, value } = e.target;
    setProductData({ 
      ...productData, 
      dimensions: { ...productData.dimensions, [name]: value }
    });
  };

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      meta: { ...productData.meta, [name]: value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await axios.put(`${API_URL}/api/product/update-product/${productId}`, productData);
      alert('Produit mis à jour avec succès');
      history.push(`/product/${productId}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
      setError('Erreur lors de la mise à jour du produit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-product-page">
      <h2>Modifier le produit</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Titre:
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Slug:
          <input
            type="text"
            name="slug"
            value={productData.slug}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Prix:
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Remise:
          <input
            type="number"
            name="discount"
            value={productData.discount}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Prix final:
          <input
            type="number"
            name="finalPrice"
            value={productData.finalPrice}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Catégorie:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
          />
        </label>

        {/* Autres champs à modifier */}
        {/* Par exemple pour les dimensions, tags, etc. */}
        <button type="submit" disabled={loading}>
          {loading ? 'Mise à jour...' : 'Mettre à jour le produit'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
