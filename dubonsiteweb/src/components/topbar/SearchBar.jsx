import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config.js';
import './SearchBar.css'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get(`${API_URL}/api/products/search`, {
          params: { query: searchTerm },
        });
        if (response.data) {
          navigate('/search-results', { state: { results: response.data } });
        }
      } catch (error) {
        console.error('Erreur lors de la recherche :', error);
      }
    }
  };

  return (
  <div className="search-bar">
    <label className="search-label"></label>
    <input
      type="text"
      placeholder="Trouvez des produits ici"
      className="search-input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      // Ajout du gestionnaire d'événements pour les touches
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "ArrowRight") {
          handleSearch();
        }
      }}
    />
    {/* <Button className="search-button" onClick={handleSearch}>
      Rechercher
    </Button> */}
  </div>
);

};

export default SearchBar;
