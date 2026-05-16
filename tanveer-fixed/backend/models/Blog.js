import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    date: { type: String }, // ISO date string YYYY-MM-DD
    image: { type: String },
    excerpt: { type: String },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

BlogSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Blog', BlogSchema);
