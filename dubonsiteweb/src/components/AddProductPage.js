import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';  
import './AddProductPage.css';

const AddProductPage = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');
  // const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  // const [color, setColor] = useState('');
  const [tags, setTags] = useState('');
  const [productImages, setProductImages] = useState([]);  
  const [imagePreviews, setImagePreviews] = useState([]);  

  // Gérer les fichiers lorsqu'ils sont déposés ou sélectionnés
  const onDrop = (acceptedFiles) => {
    setProductImages(prevImages => [...prevImages, ...acceptedFiles]);  
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);  
  };
  const removeImage = (indexToRemove) => {
    // Filtrer les images et les aperçus qui ne correspondent pas à l'index à supprimer
    const updatedImages = productImages.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);

    setProductImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      slug,
      description,
      price,
      discount,
      category,
      // brand,
      quantity,
      // color,
      tags: tags.split(','), 
    };

    const formData = new FormData();
    formData.append('productData', JSON.stringify(productData));
    
    // Modifier l'ajout des images sans indexation
    productImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/product/add-products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Produit ajouté avec succès');
        setTitle('');
        setSlug('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setCategory('');
        // setBrand('');
        setQuantity('');
        // setColor('');
        setTags('');
        setProductImages([]);
        setImagePreviews([]);
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
        <div className='product'>
          <div className="general-info">
            <h2>General Information</h2>
            <label>Titre *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Slug *</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />

            <label>Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

            <label>Prix *</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

            <label>Remise (%)</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />

            <label>Categorie *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="Produit">Produit</option>
              <option value="Service">Service</option>
              <option value="Evenementiel">Evenementiel</option>
              <option value="Import-Export">Import-Export</option>
              <option value="E-Restaurant">E-Restaurant</option>
              <option value="Produit frais">Produit frais</option>
            </select>

            {/* <label>Brand *</label> */}
            {/* <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required /> */}

            <label>Quantite *</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

            {/* <label>Color *</label> */}
            {/* <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required /> */}

            <label>Mot-cles (comma-separated)</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
        </div>

        <div className="upload-section">
          <h2>Product Images</h2>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drop files here or click to upload.</p>
          </div>

          {imagePreviews.length > 0 && (
            <div className="image-previews">
              {/* <h4>Image Previews:</h4> */}
              <div className="preview-grid">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img src={preview} alt={`Preview ${index + 1}`} className="preview-image" />
                    {/* Bouton pour supprimer l'image */}
                    <button className="remove-image" onClick={() => removeImage(index)}>✖</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className='button-container'>
          <button type="button" className='cancel-btn'>Cancel</button>
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;



