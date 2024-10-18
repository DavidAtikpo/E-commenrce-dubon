import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema({
  type: { type: String, required: false}, // Type de règle (fixe, distance, poids)
  fixedFee: { type: Number, default: 0 }, // Si les frais sont fixes
  distanceRates: [
    { maxDistance: Number, rate: Number } // Liste des distances et des tarifs
  ],
  weightRates: [
    { maxWeight: Number, rate: Number } // Liste des poids et des tarifs
  ],
  freeShippingThreshold: { type: Number, default: 0 }, // Seuil pour la livraison gratuite
});

export default mongoose.model('ShippingRule', shippingSchema);

