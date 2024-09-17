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
          Produits
          {activeDropdown === 'appliances' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>Produit Congeles</h4>
                <ul>
                  <li>Viandes</li>
                  <li>Poissons</li>
                  <li>Dinde</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Produit Frais</h4>
                <ul>
                  <li>Lapins</li>
                  <li>Poulet Byciclette</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Agro-alimentaire</h4>
                <ul>
                  <li>Pates alimentaires</li>
                  <li>Oleagineux</li>
                </ul>
              </div>

              <div className="dropdown-column">
                <h4>Boissons</h4>
                <ul>
                  <li>Vins et Siriteux</li>
                  <li>Campagnes</li>
                  <li>Nuggets de poulet</li>
                </ul>
              </div>
              <div className="dropdown-column">
                <h4>Page</h4>
                <ul>
                  <li>Produits SOBEBRA</li>
                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Phones & Tablets */}
        <li className="nav-item"
        onMouseEnter={() => handleMouseEnter('produit-congeles')}
        onMouseLeave={handleMouseLeave}
        >Service
        {activeDropdown === 'produit-congeles' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>DUBON Menage</h4>
                {/* <ul>
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
                </ul> */}
              </div>
              <div className="dropdown-column">
                <h4>DUBON Express</h4>
                {/* <ul>
                  <li>Washing Machines</li>
                  <li>Fridges</li>
                  <li>Freezers</li>
                  <li>Air Conditioners</li>
                  <li>Heaters</li>
                  <li>Fans</li>
                  <li>Air Purifiers</li>
                  <li>Water Dispensers</li>
                  <li>Generators & Inverters</li>
                </ul> */}
              </div>
              <div className="dropdown-column">
                <h4>Maman HOUEVIHNON</h4>
                {/* <ul>
                  <li>Nexus</li>
                  <li>Hisense</li>
                  <li>Polystar</li>
                  <li>TCL</li>
                </ul> */}
              </div>
              <div className="dropdown-column">
                <h4>Frigo Relais</h4>
                {/* <ul>
                  <li>Nexus</li>
                  <li>Hisense</li>
                  <li>Polystar</li>
                  <li>TCL</li>
                </ul> */}
              </div>
              <div className="dropdown-column">
                <h4>DUBON Hygiene</h4>
                {/* <ul>
                  <li>Nexus</li>
                  <li>Hisense</li>
                  <li>Polystar</li>
                  <li>TCL</li>
                </ul> */}
              </div>
            </div>
          )}
        </li>

        {/* Health & Beauty */}
        <li className="nav-item"
        onMouseEnter={() => handleMouseEnter('import-export')}
        onMouseLeave={handleMouseLeave}
        >Evenementiel
        {activeDropdown === 'import-export' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>Location de Salle</h4>
                <ul>
                  <li>Standars</li>
                  <li>VIP</li>
                </ul>
              </div>

              <div className="dropdown-column">
                <h4>Service Traiteurs</h4>
                {/* <ul>
                  <li>Poissons frais ou surgelés</li>
                  <li>Fruits de mer (crevettes, calamars, etc.)</li>
                  <li>Algues alimentaires</li>
                </ul> */}
              </div>

              <div className="dropdown-column">
                <h4>Organisation d'evenement</h4>
                <ul>
                  <li>Mariage</li>
                  <li>Concert</li>
                  <li>anniversaire</li>
                  <li>Bapteme</li>
                  <li>Funerailles</li>
                </ul>
              </div>

              <div className="dropdown-column">
                <h4>Couverture Mediatique</h4>
                {/* <ul>
                  <li>Machines agricoles</li>
                  <li>Matériaux de construction (ciment, fer, bois)</li>
                </ul> */}
              </div>
            </div>
          )}
        </li>

        {/* Add other categories as needed */}
        <li className="nav-item"
        onMouseEnter={() => handleMouseEnter('evenementiel')}
        onMouseLeave={handleMouseLeave}
        >Import & Export
        {/* {activeDropdown === 'evenementiel' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>E-Restaurant</h4>
                <ul>
                  <li>Mets Africain</li>
                  <li>Rooftop</li>
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
          )} */}
        </li>

        {/* Add other categories as needed */}
        <li className="nav-item"
        onMouseEnter={() => handleMouseEnter('agro-alimentaire')}
        onMouseLeave={handleMouseLeave}
        >E-Restaurant
        {activeDropdown === 'agro-alimentaire' && (
            <div className="dropdown">
              <div className="dropdown-column">
                <h4>Mets Africain</h4>
                {/* <ul>
                  <li>Mets Africain</li>
                  <li>Rooftop</li>
                </ul> */}
              </div>
              <div className="dropdown-column">
                <h4>Rooftop</h4>
                {/* <ul>
                  <li>Lait</li>
                  <li>Fromages</li>
                  <li>Yaourts</li>
                  <li>Beurre</li>
                </ul> */}
              </div>
              {/* <div className="dropdown-column">
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
              </div> */}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
