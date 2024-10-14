import React, { useState } from 'react';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import TopBar from '../topbar/TopBar';
import MonProfile from '../MonCompte/MonProfile';
import Footer from '../../components/Footer';
import BeforeFooter from '../BeforeFooter';
import { API_URL } from '../../config';

const ProfilePhotoComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null); // Pour l'aperçu de l'image
  const [crop, setCrop] = useState({ aspect: 1 }); // Recadrage avec un rapport d'aspect de 1:1 (carré)
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Crée un lien temporaire pour la prévisualisation
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('profilePhoto', selectedFile);
    const token = localStorage.getItem('token');

    axios.put(`${API_URL}/api/user/profilePhoto`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setMessage('Photo de profil mise à jour avec succès'))
      .catch(error => setMessage('Erreur lors de la mise à jour de la photo de profil'));
  };

  const onCropComplete = (crop) => {
    if (selectedFile && crop.width && crop.height) {
      getCroppedImg(selectedFile, crop);
    }
  };

  const getCroppedImg = (file, crop) => {
    const canvas = document.createElement('canvas');
    const image = new Image();
    image.src = preview;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    image.onload = () => {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        const croppedUrl = URL.createObjectURL(blob);
        setCroppedImageUrl(croppedUrl);
        setSelectedFile(blob); // Remplace le fichier original par le fichier recadré
      });
    };
  };

  return (
    <div>
      <TopBar />
      <div style={styles.upload}>
        <h2>Changer la photo de profil</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        
        {preview && (
          <div>
            <h3>Aperçu de l'image</h3>
            <ReactCrop
              src={preview}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={onCropComplete}
            />
            {croppedImageUrl && (
              <div>
                <h3>Image recadrée</h3>
                <img src={croppedImageUrl} alt="Cropped" style={{ maxWidth: '100%' }} />
              </div>
            )}
          </div>
        )}
        
        <button onClick={handleFileUpload}>Télécharger</button>
        <p>{message}</p>
      </div>
      <MonProfile />
      <BeforeFooter />
      <Footer />
    </div>
  );
};

const styles = {
  upload: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
};

export default ProfilePhotoComponent;

