import express from'express';
import orderController from'../controllers/orderController.js';
import  protect  from'../middleware/authMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/post',authMiddleware.authMiddleware, orderController.postOrder);  // Créer une commande
// router.get('/:id', protect.isAdmin,orderController. getOrderById);  // Récupérer une commande par ID
router.put('/:id/pay', protect.isAdmin,orderController.updateOrderToPaid);  // Mettre à jour le statut de paiement

router.get('/all', orderController. getAllOrders);
// routes/orderRoutes.js
router.put('/return/:orderId', orderController.returnOrder);


// Route pour mettre à jour le statut d'une commande
router.put('/:orderId',  orderController.updateOrderStatus);

export default router;
