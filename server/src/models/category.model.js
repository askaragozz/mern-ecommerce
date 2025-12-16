import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema({
    title: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null }
}, { timestamps: true });

categorySchema.statics.isLeaf = async function (categoryId) {
  const childCount = await this.countDocuments({ parentId: categoryId });
  return childCount === 0;
};

const Category = model('Category', categorySchema);

export default Category;