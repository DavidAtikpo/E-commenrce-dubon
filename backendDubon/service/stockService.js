import Product from'../models/Product';

exports.updateStock = async (productId, quantity) => {
    const product = await Product.findById(productId);

    if (product) {
        product.quantity = quantity;
        await product.save();
        return product;
    } else {
        throw new Error('Product not found');
    }
};

exports.checkLowStock = async (threshold = 5) => {
    const lowStockProducts = await Product.find({ quantity: { $lt: threshold } });
    return lowStockProducts;
};
