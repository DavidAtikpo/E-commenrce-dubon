// models/Rating.js

import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    productId: { 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Product', 
     required: true
     },
    userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true 
    },
    productRating: { type: Number, 
     required: true 
    },
    productComment: {
     type: String, 
     required: true 
    },
    deliveryRating: {
     type: Number, 
     required: true 
    },  // Note de livraison
    deliveryComment: { 
     type: String, 
     required: true 
    }, // Commentaire de livraison
  }, { timestamps: true });
  

// Exporter le modèle
export default mongoose.model('Rating', ratingSchema);
