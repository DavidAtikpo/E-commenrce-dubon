import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NavigationMenu = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  useEffect(() => {
    // Appel à l'API pour obtenir les catégories
    axios.get('http://localhost:5000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error("Erreur lors du chargement des catégories :", error));
  }, []);

  const handleMouseEnterCategory = (category) => {
    setActiveCategory(category);
    setActiveSubcategory(null);  // Reset subcategory on new category hover
  };

  const handleMouseEnterSubcategory = (subcategory) => {
    setActiveSubcategory(subcategory);
  };

  return (
    <div className="navigation-menu">
      <ul className="main-categories">
        {categories.map((category, index) => (
          <li
            key={index}
            onMouseEnter={() => handleMouseEnterCategory(category)}
          >
            {category.category}
            {activeCategory === category && (
              <ul className="sub-categories">
                {category.subcategories.map((sub, subIndex) => (
                  <li 
                    key={subIndex}
                    onMouseEnter={() => handleMouseEnterSubcategory(sub)}
                  >
                    {sub.name}
                    {activeSubcategory === sub && (
                      <div className="subcategory-items">
                        {sub.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="item">
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationMenu;
