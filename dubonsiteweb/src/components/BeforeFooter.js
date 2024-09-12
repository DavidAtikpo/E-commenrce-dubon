import React from 'react';
import './BeforeFooter.css'; // Assurez-vous de styliser correctement dans ce fichier

const BeforeFooter = () => {
  return (
    <div className="before-footer">
      <div className="before-footer-content">
        <div className="newsletter">
          <h3>Est tu nouveau?</h3>
          <p>Inscrit toi ici!</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter E-mail Address" />
            <button>Suivant</button>
          </div>
          <div className="newsletter-terms">
            <input type="checkbox" />
          </div>
          <p className="legal-terms">
            I accept the <span className="highlight">Legal Terms</span>
          </p>
        </div>
        <div className="download-app">
          <p>DUBON SERVICE</p>
          <p>Get access to exclusive offers!</p>
          {/* <div className="app-links">
            <img src="app-store-link.png" alt="App Store" />
            <img src="google-play-link.png" alt="Google Play" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BeforeFooter;
