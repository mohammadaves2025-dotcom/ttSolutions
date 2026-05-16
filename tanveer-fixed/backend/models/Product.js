import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String },
    category: { type: String, required: true, index: true },
    subcategory: { type: String },
    brand: {
      type: String,
      enum: ['ANTIVA', 'AVANTI', 'Other'],
      default: 'Other',
      index: true,
    },
    image: { type: String },
    videoLink: { type: String },
    brochureLink: { type: String },
    specs: { type: mongoose.Schema.Types.Mixed, default: {} },
    keyFeatures: { type: [String], default: [] },
    isAvailableOnGeM: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Full-text search index
ProductSchema.index({ title: 'text', category: 'text', subcategory: 'text' });

export default mongoose.model('Product', ProductSchema);
