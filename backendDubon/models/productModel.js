import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  description: String,
  price: Number,
  discount: Number,
  finalPrice: Number,
  category: String,
  quantity: Number,
  specifications: String,
  variants: [String],
  taxRate: Number,
  availability: String,
  dimensions: {
    length: String,
    width: String,
    height: String,
    weight: String,
  },
  tags: [String],
  meta: {
    title: String,
    description: String,
    keywords: [String],
  },
  images: [String],
},{timestamps: true});
 // Adds createdAt and updatedAt fields automatically

// Export the model
export default mongoose.model("Product", productSchema);
