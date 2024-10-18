import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    code: { type: String, required: true, unique: true },
    used: { type: Boolean, default: false },  // Indique si le code promo a été utilisé
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('PromoCode', promoCodeSchema);
