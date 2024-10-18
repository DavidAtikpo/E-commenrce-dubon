import express from 'express'
import AdminOrderCtrl from '../controllers/AdminOrderCtrl.js'
import AdminShippingSettings from '../controllers/AdminShippingSettings.js';

const router =express.Router();

router.put('/update-status/:orderId',AdminOrderCtrl.updateOrder)
router.get('/get-orders',AdminOrderCtrl.getOrders)
router.post('/admin/shipping-rules',AdminShippingSettings.postShippingRules)
router.get('/shipping-rules',AdminShippingSettings.getShippingRules)

export default router