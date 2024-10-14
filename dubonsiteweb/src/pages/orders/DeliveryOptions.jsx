import React, { useState } from 'react';

const DeliveryOptions = ({ onDeliveryOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState('standard');

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    onDeliveryOptionChange(option);
  };

  return (
    <div className="delivery-options">
      <h3>Choisissez une option de livraison</h3>
      <div>
        <input
          type="radio"
          id="standard"
          name="deliveryOption"
          value="standard"
          checked={selectedOption === 'standard'}
          onChange={handleOptionChange}
        />
        <label htmlFor="standard">Standard (3 jours)</label>
      </div>
      <div>
        <input
          type="radio"
          id="express"
          name="deliveryOption"
          value="express"
          checked={selectedOption === 'express'}
          onChange={handleOptionChange}
        />
        <label htmlFor="express">Express (1 jour)</label>
      </div>
    </div>
  );
};

export default DeliveryOptions;
