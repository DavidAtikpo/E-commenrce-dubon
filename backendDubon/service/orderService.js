import Order from'../models/Order';
import Delivery from'../models/Delivery';

exports.createOrder = async (orderData) => {
    const order = await Order.create(orderData);
    return order;
};

exports.getUserOrders = async (userId) => {
    const orders = await Order.find({ user: userId }).populate('items.product');
    return orders;
};

exports.getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('user items.product');
    return order;
};

// Mettre à jour l'état de la livraison
exports.updateDeliveryStatus = async (orderId, status, deliveredBy) => {
    const delivery = await Delivery.findOne({ order: orderId });
    if (delivery) {
        delivery.deliveryStatus = status;
        delivery.deliveredBy = deliveredBy;
        await delivery.save();
    } else {
        throw new Error('Delivery not found');
    }
};
