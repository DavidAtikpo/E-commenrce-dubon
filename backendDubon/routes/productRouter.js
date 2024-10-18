import express from 'express';
import productCtrl from '../controllers/productCtrl.js';
import middleware from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';
import productController from '../controllers/productController.js'

const router = express.Router();

// Route pour ajouter un produit avec téléchargement d'images
router.post('/add-products', upload.array('images', 10), productController.createProduct);

// Autres routes pour manipuler les produits
router.get('/get-product/:productId', productController.getProductById);
router.get('/',productController.getAllProduct);
router.get('/getNewProduct',productController.getNewProduct)
router.put('/update-product/:productId',productController.updateProduct)
// router.put('/:id', middleware.authMiddleware, middleware.isAdmin, productCtrl.updateProduct);
// router.delete('/:id', middleware.authMiddleware, middleware.isAdmin, productCtrl.deleteProduct);
router.delete('/delete-product/:productId',productController.deleteProduct)

export default router;




// const express = require('express');
// const { getProducts, getProductById, createProduct } = require('../controllers/productController');
// const { protect } = require('../middlewares/authMiddleware');

// const router = express.Router();

// router.get('/', getProducts);  // Récupérer tous les produits
// router.get('/:id', getProductById);  // Récupérer un produit par ID
// router.post('/', protect, createProduct);  // Ajouter un nouveau produit (administrateur)

// module.exports = router;
