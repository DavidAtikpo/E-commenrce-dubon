import React, { useState, useEffect } from 'react';
import { Box, Button, Menu, MenuItem, Tab, Tabs } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import './categorieNavBar.css'

const CategoryNavigationBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ setCategories] = useState([]);
  const [moreCategories, setMoreCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // État pour mobile
  const [accordionOpen, setAccordionOpen] = useState(false); // Contrôler l'accordéon

  const Navigate = useNavigate();

  const fixedTabs = ['TOUTES CATEGORIES', 'EVENEMENT', 'SERVICES', 'FORMATION', 'E-RESTAURANT'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories`);
        const fetchedCategories = response.data;

        setCategories(fetchedCategories.slice(0, 3));
        setMoreCategories(fetchedCategories.slice(3));

        if (selectedTab === 0) {
          setProducts(fetchedCategories);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleCategorie = (categorieName) => {
    Navigate(`/category/${categorieName}`);
  };

  const handleTabChange = async (event, newValue) => {
    setSelectedTab(newValue);

    if (newValue === 0) {
      const response = await axios.get(`${API_URL}/api/categories`);
      setProducts(response.data);
    } else {
      const tabName = fixedTabs[newValue];
      try {
        const response = await axios.get(`${API_URL}/api/products?category=${tabName}`);
        setProducts(response.data);
      } catch (error) {
        console.error(`Erreur lors de la récupération des produits pour ${tabName} :`, error);
        setProducts([]);
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '10px' }}>
      {isMobile ? (
        <>
          {/* Menu accordéon pour mobile */}
          <Button className="accordion-button" onClick={toggleAccordion}>
            Catégories <ExpandMoreIcon />
          </Button>
          <Box className={`accordion ${accordionOpen ? 'active' : ''}`}>
            {fixedTabs.map((tab, index) => (
              <Button key={index} onClick={() => handleTabChange(null, index)} className="accordion-button">
                {tab}
              </Button>
            ))}
            {moreCategories.length > 0 && (
              <Button onClick={handleClick} className="accordion-button">
                Voir plus <ExpandMoreIcon />
              </Button>
            )}
          </Box>
        </>
      ) : (
        <Tabs value={selectedTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" aria-label="category tabs">
          {fixedTabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
          {moreCategories.length > 0 && (
            <Tab label={<><ExpandMoreIcon /> Voir plus</>} onClick={handleClick} />
          )}
        </Tabs>
      )}

      <Menu id="more-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {moreCategories.map((category, index) => (
          <MenuItem key={index} onClick={() => {
            handleClose();
            setSelectedTab(fixedTabs.length);
            handleCategorie(category);
          }}>
            {category}
          </MenuItem>
        ))}
      </Menu>

      <Box className="tabs-container">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Button key={index} variant="outlined" onClick={() => handleCategorie(product)} className="product-button">
              {product}
            </Button>
          ))
        ) : (
          <Button variant="outlined">Aucune catégorie disponible</Button>
        )}
      </Box>
    </Box>
  );
};

export default CategoryNavigationBar;
