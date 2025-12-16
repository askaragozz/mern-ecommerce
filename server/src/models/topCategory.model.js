// This is a read-only model for top categories in the application.
// Top categories are used to group regular categories under broader classifications.
// They should only be created or modified by administrators through a secure interface.
import mongoose from 'mongoose';

const topCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  { versionKey: false, timestamps: false }
);

const TopCategory = mongoose.model('TopCategory', topCategorySchema);

export default TopCategory;