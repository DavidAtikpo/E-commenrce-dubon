import mongoose from'mongoose';

const adSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    linkUrl: {
        type: String,
        required: true,
    },
    altText: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Ad', adSchema);
