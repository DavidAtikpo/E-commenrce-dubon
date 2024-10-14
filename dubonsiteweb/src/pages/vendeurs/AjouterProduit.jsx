import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';  
import '../../components/AddProductPage.css';
import { API_URL } from '../../config';

const AjouterProduit = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tags, setTags] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [variants, setVariants] = useState([]);
  const [taxRate, setTaxRate] = useState('');
  const [availability, setAvailability] = useState('In Stock');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '', weight: '' });
  const [productImages, setProductImages] = useState([]);  
  const [imagePreviews, setImagePreviews] = useState([]);  

  // Nouveaux champs pour les métadonnées
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');

  // Slug auto-généré
  useEffect(() => {
    const newSlug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setSlug(newSlug);
  }, [title]);

  const onDrop = (acceptedFiles) => {
    setProductImages(prevImages => [...prevImages, ...acceptedFiles]);  
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);  
  };

  const removeImage = (indexToRemove) => {
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
  // Prix final calculé après remise
// Prix final calculé après remise
const finalPrice = !isNaN(parseFloat(price)) && !isNaN(parseFloat(discount))
  ? (parseFloat(price) - (parseFloat(price) * (parseFloat(discount) / 100))).toFixed(2)
  : parseFloat(price).toFixed(2);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      slug,
      description,
      price,
      finalPrice,
      discount,
      category,
      quantity,
      specifications,
      variants,
      taxRate,
      availability,
      dimensions,
      tags: tags.split(','), 
      meta: {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords.split(','),
      },
    };

    const formData = new FormData();
    formData.append('productData', JSON.stringify(productData));
    
    productImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post(`${API_URL}/api/product/add-products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Produit ajouté avec succès');
        // Réinitialiser les champs du formulaire
        setTitle('');
        setSlug('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setCategory('');
        setQuantity('');
        setTags('');
        setSpecifications('');
        setVariants([]);
        setTaxRate('');
        setAvailability('In Stock');
        setDimensions({ length: '', width: '', height: '', weight: '' });
        setProductImages([]);
        setImagePreviews([]);
        // Réinitialiser les champs de métadonnées
        setMetaTitle('');
        setMetaDescription('');
        setMetaKeywords('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
      alert('Erreur lors de l\'ajout du produit');
    }
  };

  return (
    <div className="add-product-page">
      <h2>Ajouter ton produit ici</h2>
      <form onSubmit={handleSubmit}>
        <div className='product'>
          <div className="general-info">
            <h2>General Information</h2>
            <label>Titre *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Slug *</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required readOnly />

            <label>Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

            <label>Prix *</label>
            <input type="number" step="any" value={price} onChange={(e) => setPrice(e.target.value)} required />

            <label>Remise (%)</label>
            <input type="number" step="any" value={discount} onChange={(e) => setDiscount(e.target.value)} />


            <label>Prix final</label>
            <input type="text" value={Number(finalPrice).toFixed(2)} readOnly />


            <label>Categorie *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="Produits Congeles">Produits Congeles</option>
              <option value="Produits frais">Produits frais</option>
              <option value="Agro-Alimentaires">Agro-Alimentaire</option>
              <option value="Boissons">Boissons</option>
              <option value="Produit SOBEBRA">Produit SOBEBRA</option>
            </select>

            <label>Quantite *</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

            <label>Mot-cles (comma-separated)</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />

            <label>Specifications</label>
            <textarea value={specifications} onChange={(e) => setSpecifications(e.target.value)}></textarea>

            <label>Variantes (comma-separated, ex: Small, Medium, Large)</label>
            <input type="text" value={variants.join(',')} onChange={(e) => setVariants(e.target.value.split(','))} />

            <label>Taux de taxe (%)</label>
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />

            <label>Disponibilité</label>
            <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <option value="In Stock">En stock</option>
              <option value="Out of Stock">Hors stock</option>
              <option value="Pre-order">Précommande</option>
            </select>

            <label>Dimensions (cm)</label>
            <input type="number" placeholder="Longueur" value={dimensions.length} onChange={(e) => setDimensions({...dimensions, length: e.target.value})} />
            <input type="number" placeholder="Largeur" value={dimensions.width} onChange={(e) => setDimensions({...dimensions, width: e.target.value})} />
            <input type="number" placeholder="Hauteur" value={dimensions.height} onChange={(e) => setDimensions({...dimensions, height: e.target.value})} />
            <input type="number" placeholder="Poids (kg)" value={dimensions.weight} onChange={(e) => setDimensions({...dimensions, weight: e.target.value})} />
          </div>

          {/* Meta Information Section */}
          <div className="meta-info">
            <h2>Meta Information</h2>

            <label>Meta Title</label>
            <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />

            <label>Meta Description</label>
            <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}></textarea>

            <label>Meta Keywords (comma-separated)</label>
            <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} />
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
              <div className="preview-grid">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img src={preview} alt={`Preview ${index + 1}`} className="preview-image" />
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

export default AjouterProduit;
