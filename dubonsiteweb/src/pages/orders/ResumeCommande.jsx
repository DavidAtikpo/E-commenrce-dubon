import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Pour faire la requête HTTP
import DeliveryOptions from './DeliveryOptions';
import PaymentOptions from './PaymentOptions';
import FullPaymentAdvantages from './FullPaymentAdvantages';
import './OrderSummary.css';
import { API_URL } from '../../config';

const OrderSummaryPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isOrderValid, setIsOrderValid] = useState(false);
  const [ setDeliveryOption] = useState('standard');
  const [paymentOption, setPaymentOption] = useState('payAfterDelivery');
  const [ setIncludeShippingFee] = useState(false);

  const navigate = useNavigate();

  // Fonction pour confirmer la commande
  const handleConfirmOrder = async () => {
    if (paymentOption === 'payAfterDelivery') {
      const orderData = {
        user: 'USER_ID', // Remplacez USER_ID par l'ID réel de l'utilisateur connecté
        orderItems: cartItems.map(item => ({
          name: item.title,
          qty: item.quantity,
          image: item.image,
          price: item.finalPrice,
          product: item.productId, // L'ID du produit
        })),
        shippingAddress: shippingAddress,
        paymentMethod: paymentOption, // payer après livraison
        taxPrice: 0, // Si vous avez des taxes à ajouter, sinon laissez à 0
        shippingPrice: deliveryFee,
        totalPrice: totalAmount + deliveryFee, // Le total avec les frais de livraison
        isPaid: false, // Non payé pour l'option "payer après livraison"
      };

      try {
        const token = localStorage.getItem('token')
        const { data } = await axios.post(`${ API_URL }/api/orders/post`, orderData,{
         headers:{
          Authorization: `Bearer ${token}`
        }
        
      }); // POST request pour enregistrer la commande
      console.log(data);
        alert('Commande confirmée avec succès.');
        navigate('/order-success'); // Redirection après la confirmation de commande
      } catch (error) {
        console.error('Erreur lors de la création de la commande', error);
        alert('Erreur lors de la création de la commande');
      }
    } else {
      // Redirection vers la page de paiement
      navigate('/payment');
    }
  };

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
    // Logique pour ajuster les frais de livraison selon l'option choisie
  };

  const handlePaymentOptionChange = (option, withShippingFee) => {
    setPaymentOption(option);
    setIncludeShippingFee(withShippingFee);
  };

  useEffect(() => {
    // Récupération du panier et des données de livraison
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    setCartItems(cart);
    const total = localStorage.getItem('cartTotal') ? parseFloat(localStorage.getItem('cartTotal')) : 0;
    setTotalAmount(total);
    const address = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null;
    setShippingAddress(address);
    const fee = 5000; // Exemple de frais de livraison
    setDeliveryFee(fee);
    setIsOrderValid(cart.length > 0 && address && total > 0);
  }, []);

  return (
    <div className="order-summary-container">
      <h2>Résumé de la commande</h2>

      {/* Section des produits commandés */}
      <div className="order-summary-items">
        {cartItems.map((item, index) => (
          <div key={index}>
            <span>{item.title}</span>
            <span>{item.quantity} x {item.finalPrice.toLocaleString()} FCFA</span>
          </div>
        ))}
      </div>

      {/* Section des options de livraison */}
      <DeliveryOptions onDeliveryOptionChange={handleDeliveryOptionChange} />

      {/* Section des frais de livraison */}
      <div className="order-summary-shipping">
        <h3>Adresse de livraison</h3>
        {shippingAddress ? (
 <p>
 Adresse: {shippingAddress.address},<br />
 Nom: {shippingAddress.name},<br />
 Ville: {shippingAddress.city},<br />
 Code postal: {shippingAddress.postalCode},<br />
 Pays: {shippingAddress.country},<br />
 Numéro de téléphone: {shippingAddress.mobile},<br />
 Région: {shippingAddress.state}
</p>
        ) : (
          <p>Aucune adresse de livraison spécifiée.</p>
        )}
        <p>Frais de livraison : {deliveryFee.toLocaleString()} FCFA</p>
      </div>

      {/* Section des options de paiement */}
      <PaymentOptions onPaymentOptionChange={handlePaymentOptionChange} />

      {/* Section des avantages du paiement complet */}
      {paymentOption === 'payNow' && <FullPaymentAdvantages />}

      {/* Section du montant total */}
      <div className="order-summary-total">
        <h3>Total : {totalAmount.toLocaleString()} FCFA</h3>
      </div>

      {/* Bouton pour confirmer la commande */}
      <button
        className="order-summary-button"
        onClick={handleConfirmOrder}
        disabled={!isOrderValid}
      >
        Confirmer la commande
      </button>
    </div>
  );
};

export default OrderSummaryPage;
