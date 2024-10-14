// cartUtils.js

export const calculateFinalPrice = (price, discount) => {
  return discount ? (price - (price * discount / 100)).toFixed(2) : price;
};

export const calculateTotal = (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return 0; // Retourne 0 si le panier est vide ou undefined
  }

  return cartItems.reduce((total, item) => {
    const finalPrice = calculateFinalPrice(item.price, item.discount);
    return total + finalPrice * item.quantity;
  }, 0);
};
