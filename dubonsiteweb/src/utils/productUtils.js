// utils/productUtils.js
export const handleProductClick = (product, setSelectedProduct, setShowOptionsModal) => {
  setSelectedProduct(product);  // Stocker le produit sélectionné
  setShowOptionsModal(true);    // Ouvrir le modal pour offrir les options
};

