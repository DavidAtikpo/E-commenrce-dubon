import React, { useState } from 'react';
import './UnderNavBar.css'; // Make sure to import your styles

function NavBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (category) => {
    setActiveDropdown(category);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar">
      <ul className="nav-categories">
        {/* Appliances Dropdown */}
        <li
          className="nav-item"
          onMouseEnter={() => handleMouseEnter('appliances')}
          onMouseLeave={handleMouseLeave}
        >
          Service Complet
          {activeDropdown === 'appliances' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>Viandes Congelées</h4>
                <ul>
                  <li>Poulet congelé</li>
                  <li>Boeuf congelé</li>
                  <li>Dinde</li>
                  <li>Poison congelé</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Légumes Congelés</h4>
                <ul>
                  <li>Petit pois</li>
                  <li>Carottes</li>
                  <li>Epinards</li>
                  <li>Haricots verts</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Fruits Congelés</h4>
                <ul>
                  <li>Fraises</li>
                  <li>Mangues</li>
                  <li>Myrtlles</li>
                  <li>Ananas</li>
                </ul>
              </div>

              <div className="dropdown-column">
                <h4>Plats Préparés Congelés</h4>
                <ul>
                  <li>Pizzas</li>
                  <li>Lasagnes</li>
                  <li>Nuggets de poulet</li>
                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Phones & Tablets */}
        <li className="nav-item"
        onMouseEnter={() => handleMouseEnter('produit-congeles')}
        onMouseLeave={handleMouseLeave}
        >Produit Congeles
        {activeDropdown === 'produit-congeles' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>Small Appliances</h4>
                <ul>
                  <li>Blenders</li>
                  <li>Deep Fryers</li>
                  <li>Juicers</li>
                  <li>Air Fryers</li>
                  <li>Rice Cookers</li>
                  <li>Toasters & Ovens</li>
                  <li>Microwaves</li>
                  <li>Vacuum Cleaners</li>
                  <li>Kettles</li>
                  <li>Yam Pounders</li>
                  <li>Irons</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Large Appliances</h4>
                <ul>
                  <li>Washing Machines</li>
                  <li>Fridges</li>
                  <li>Freezers</li>
                  <li>Air Conditioners</li>
                  <li>Heaters</li>
                  <li>Fans</li>
                  <li>Air Purifiers</li>
                  <li>Water Dispensers</li>
                  <li>Generators & Inverters</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Brands</h4>
                <ul>
                  <li>Nexus</li>
                  <li>Hisense</li>
                  <li>Polystar</li>
                  <li>TCL</li>
                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Health & Beauty */}
        <li className="nav-item"
        onMouseEnter={() => handleMouseEnter('import-export')}
        onMouseLeave={handleMouseLeave}
        >Import-Export
        {activeDropdown === 'import-export' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>Produits Agricoles</h4>
                <ul>
                  <li>Cacao</li>
                  <li>Cafe</li>
                  <li>Riz</li>
                  <li>Céréales (maïs, blé)</li>
                  <li>Huiles végétales</li>
                </ul>
              </div>

              <div className="dropdown-column">
                <h4>Produits de la Mer</h4>
                <ul>
                  <li>Poissons frais ou surgelés</li>
                  <li>Fruits de mer (crevettes, calamars, etc.)</li>
                  <li>Algues alimentaires</li>
                </ul>
              </div>

              <div className="dropdown-column">
                <h4>Textiles et Vêtements</h4>
                <ul>
                  <li>Tissus en coton</li>
                  <li>Vêtements fabriqués localement</li>
                  <li>Chaussures</li>
                </ul>
              </div>

              <div className="dropdown-column">
                <h4>Équipements Industriels</h4>
                <ul>
                  <li>Machines agricoles</li>
                  <li>Matériaux de construction (ciment, fer, bois)</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Produits de Luxe </h4>
                <ul>
                  <li>Vins et spiritueux</li>
                  <li>Bijoux</li>
                  <li>Voitures de luxe</li>
                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Add other categories as needed */}
        <li className="nav-item"
        onMouseEnter={() => handleMouseEnter('evenementiel')}
        onMouseLeave={handleMouseLeave}
        >Evenementiel
        {activeDropdown === 'evenementiel' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>Services</h4>
                <ul>
                  <li>Organisation de mariages</li>
                  <li>Organisation de séminaires et conférences</li>
                  <li>Planification de fêtes et anniversaires</li>
                  <li>Décoration événementielle</li>
                  <li>Animation (DJ, orchestres, spectacles)</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Catering</h4>
                <ul>
                  <li>Service traiteur</li>
                  <li>Fourniture de boissons et repas</li>
                  <li>Buffets et cocktails</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Photographie et Vidéo </h4>
                <ul>
                  <li>Services de photographie professionnelle</li>
                  <li>Captation vidéo</li>
                  <li>Cabines photo</li>
                  <li>Drone pour événements</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Divertissement et Animation </h4>
                <ul>
                  <li>Jeux gonflables</li>
                  <li>Clowns, magiciens, artistes de rue</li>
                  <li>Feux d'artifice</li>
                  <li>Photobooth interactif</li>
                </ul>
              </div>
              
            </div>
          )}
        </li>

        {/* Add other categories as needed */}
        <li className="nav-item"
        onMouseEnter={() => handleMouseEnter('agro-alimentaire')}
        onMouseLeave={handleMouseLeave}
        >Agro-alimentaire
        {activeDropdown === 'agro-alimentaire' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>Produits Transformés</h4>
                <ul>
                  <li>Jus de fruits</li>
                  <li>Confitures</li>
                  <li>Conserves de légumes</li>
                  <li>Pâtes alimentaires</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Produits Laitiers</h4>
                <ul>
                  <li>Lait</li>
                  <li>Fromages</li>
                  <li>Yaourts</li>
                  <li>Beurre</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Céréales et Dérivés</h4>
                <ul>
                  <li>Farine</li>
                  <li>Riz</li>
                  <li>Semoule</li>
                  <li>Pâtes</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Produits à Base de Viande et de Poisson</h4>
                <ul>
                  <li>Saucisses</li>
                  <li>Charcuterie</li>
                  <li>Poissons en conserve (sardines ...)</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Boissons</h4>
                <ul>
                  <li>Jus de fruits</li>
                  <li>Boissons gazeuses</li>
                  <li>Eau minérale</li>
                </ul>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
