import Order from'../models/Order';
import Product from'../models/Product';

exports.generateSalesReport = async ({ startDate, endDate }) => {
    const orders = await Order.find({
        createdAt: { $gte: startDate, $lte: endDate },
    });

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    const totalOrders = orders.length;

    return { totalRevenue, totalOrders };
};

exports.generateStockReport = async () => {
    const products = await Product.find({});
    const totalStock = products.reduce((acc, product) => acc + product.quantity, 0);

    return { totalStock, products };
};
