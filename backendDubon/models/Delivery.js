import mongoose from'mongoose';

const deliverySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    deliveryStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryDate: {
        type: Date
    },
    deliveredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Référence à un livreur
    }
}, { timestamps: true });

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;
