import User from'../models/User';
import Order from'../models/Order';

// Récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Récupérer toutes les commandes
exports.getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
};

// Supprimer une commande
exports.deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        await order.remove();
        res.json({ message: 'Order removed' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};
