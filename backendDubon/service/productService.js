import Product from'../models/Product';
import Review from'../models/Review';

exports.createProduct = async (productData) => {
    const product = await Product.create(productData);
    return product;
};

exports.updateProduct = async (productId, productData) => {
    const product = await Product.findByIdAndUpdate(productId, productData, { new: true });
    return product;
};

exports.deleteProduct = async (productId) => {
    const product = await Product.findByIdAndDelete(productId);
    return product;
};

// Ajouter un avis (review) sur un produit
exports.addReview = async (userId, productId, rating, comment) => {
    const review = await Review.create({
        user: userId,
        product: productId,
        rating,
        comment,
    });

    // Mettre à jour la note globale du produit
    const product = await Product.findById(productId);
    product.ratings.push({ star: rating, postedBy: userId });
    await product.save();
    
    return review;
};
