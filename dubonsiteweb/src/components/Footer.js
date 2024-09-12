import React from 'react';
import './Footer.css'; // Import the CSS file for styling
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>BESOIN D'AIDE?</h4>
          <ul>
            <li>Ecrivez-nous</li>
            <li>Centre d'aide</li>
            <li>Contactez-nous</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>LIENS</h4>
          <ul>
            <li>DUBON SERVICE</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>A PROPOS</h4>
          <ul>
            <li>A propos de nous</li>
            {/* <li>Jumia careers</li>
            <li>Jumia Express</li>
            <li>Terms and Conditions</li>
            <li>Privacy Notice</li>
            <li>Jumia Store Credit Terms & Conditions</li>
            <li>Cookie Notice</li>
            <li>Jumia Global</li>
            <li>Official Stores</li>
            <li>Flash Sales</li> */}
          </ul>
        </div>

        {/* <div className="footer-section">
          <h4>MAKE MONEY WITH JUMIA</h4>
          <ul>
            <li>Sell on Jumia</li>
            <li>Vendor hub</li>
            <li>Become a Sales Consultant</li>
            <li>Become a Logistics Service Partner</li>
            <li>Join the Jumia DA Academy</li>
            <li>Join the Jumia KOL Program</li>
          </ul>
        </div> */}

        <div className="footer-section">
          <h4>DUBON  INTERNATIONAL</h4>
          <ul>            
            {/* <li>Algeria</li>
            <li>Morocco</li>
            <li>Egypt</li>
            <li>Senegal</li>
            <li>Ghana</li>
            <li>Tunisia</li>
            <li>Ivory Coast</li>
            <li>Uganda</li>
            <li>Kenya</li>
            <li>Zando</li> */}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-socials">
          <h5>REJOIGNEZ NOUS</h5>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-twitter"></i>
            <i className='fab fa-whatsapp'></i>
            <i className='fab fa-tiktok'></i>
          </div>
        </div>

        <div className="footer-payment">
          <h5>PAYMENT METHODS & DELIVERY PARTNERS</h5>
          <div className="payment-icons">
            {/* <i className="fab fa-cc-mastercard"></i> */}
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-flooz"></i>
            {/* <i className="fab fa-cc-discover"></i> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
