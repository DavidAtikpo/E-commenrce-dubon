import Order from'../models/Order.js';
import generateUniqueCode from'../utils/codeGenerator.js';
import getCoordinatesFromAddress from'../utils/geoLocation.js';
import  sendOrderStatusEmail  from '../service/emailService.js';

// Créer une nouvelle commande
const createOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

// Récupérer une commande par ID
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// Route pour créer une nouvelle commande
const postOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Aucun article dans la commande');
  } else {
    const order = new Order({
      user: req.user._id, // L'utilisateur connecté
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: false, // Non payé
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};



// Mettre à jour le statut de la commande après paiement
const updateOrderToPaid = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};




const confirmDelivery = async (req, res) => {
    const { orderId, userId } = req.body;

    // Génération d'un code unique pour confirmer la livraison
    const confirmationCode = generateUniqueCode(8);

    // Logique pour associer le code à la commande, à enregistrer dans la base de données
    // ex: await Order.findByIdAndUpdate(orderId, { confirmationCode });

    return res.status(200).json({ message: 'Code de confirmation généré', confirmationCode });
};




const assignDeliveryLocation = async (req, res) => {
    const { address } = req.body;

    try {
        const coordinates = await getCoordinatesFromAddress(address);

        // Assigner les coordonnées à la commande (par exemple, pour informer le livreur)
        // ex: await Order.findByIdAndUpdate(orderId, { deliveryCoordinates: coordinates });

        res.status(200).json({
            message: 'Coordonnées de livraison obtenues',
            coordinates,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







// Récupérer toutes les commandes
 const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate().sort({ createdAt: -1 });
    console.log('orders:',orders);
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
};

// Mettre à jour le statut d'une commande
// export const updateOrderStatus = async (req, res) => {
//   const { orderId } = req.params;
//   const { status } = req.body;
  
//   try {
//     const order = await Order.findById(orderId);
//     if (order) {
//       order.status = status;
//       await order.save();
//       res.json({ message: 'Statut de la commande mis à jour', order });
//     } else {
//       res.status(404).json({ message: 'Commande non trouvée' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande' });
//   }
// };

// notification

// controllers/orderController.js


export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  
  try {
    const order = await Order.findById(orderId).populate('user', 'email');
    if (order) {
      order.status = status;
      await order.save();
      
      // Envoi d'un email de notification
      await sendOrderStatusEmail(order.user.email, status);
      
      res.json({ message: 'Statut de la commande mis à jour et email envoyé', order });
    } else {
      res.status(404).json({ message: 'Commande non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande' });
  }
};

//retour

// controllers/orderController.js
export const returnOrder = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await Order.findById(orderId);
      if (order) {
        order.isReturned = true;
        await order.save();
        res.json({ message: 'Commande marquée comme retournée' });
      } else {
        res.status(404).json({ message: 'Commande non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la gestion du retour' });
    }
  };
  

export default {createOrder,returnOrder,getOrderById, updateOrderToPaid, confirmDelivery, assignDeliveryLocation,postOrder,updateOrderStatus,getAllOrders}