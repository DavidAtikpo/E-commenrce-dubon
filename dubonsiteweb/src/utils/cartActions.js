
// import Cookies from 'js-cookie';

export const decreaseQuantity = (index, cartItems, setCartItems) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
    }
  };
  
  export const increaseQuantity = (index, cartItems, setCartItems) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
  };

  export const handleProductClick = (product, setSelectedProduct, setShowOptionsModal) => {
    setSelectedProduct(product);  // Stocker le produit sélectionné
    setShowOptionsModal(true);    // Ouvrir le modal pour offrir les options
  };
  
  export const removeFromCart = (index, cartItems, setCartItems) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1); // Supprime l'élément à l'index donné
    setCartItems(updatedCart);
      
    // Met à jour les cookies avec les nouveaux articles du panier
    localStorage.setItem('cart', JSON.stringify(updatedCart), { expires: 7 });
  };
  