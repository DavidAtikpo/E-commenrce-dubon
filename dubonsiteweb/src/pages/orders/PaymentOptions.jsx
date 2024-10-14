import React, { useState } from 'react';

const PaymentOptions = ({ onPaymentOptionChange }) => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('payAfterDelivery');
  const [includeShippingFee, setIncludeShippingFee] = useState(false);

  const handlePaymentChange = (event) => {
    const option = event.target.value;
    setSelectedPaymentOption(option);
    onPaymentOptionChange(option, includeShippingFee);
  };

  const handleShippingFeeToggle = () => {
    setIncludeShippingFee((prev) => !prev);
    onPaymentOptionChange(selectedPaymentOption, !includeShippingFee);
  };

  return (
    <div className="payment-options">
      <h3>Options de paiement</h3>
      <div>
        <input
          type="radio"
          id="payAfterDelivery"
          name="paymentOption"
          value="payAfterDelivery"
          checked={selectedPaymentOption === 'payAfterDelivery'}
          onChange={handlePaymentChange}
        />
        <label htmlFor="payAfterDelivery">Payer après livraison</label>
      </div>
      <div>
        <input
          type="radio"
          id="payNow"
          name="paymentOption"
          value="payNow"
          checked={selectedPaymentOption === 'payNow'}
          onChange={handlePaymentChange}
        />
        <label htmlFor="payNow">Passer au paiement</label>
      </div>
      {selectedPaymentOption === 'payNow' && (
        <div>
          <input
            type="checkbox"
            id="includeShippingFee"
            checked={includeShippingFee}
            onChange={handleShippingFeeToggle}
          />
          <label htmlFor="includeShippingFee">
            Payer avec les frais de livraison
          </label>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
