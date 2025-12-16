import mongoose from "mongoose";

import Category from './category.model.js'

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    // 1) Identity / basic info
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true,},
    gender: { type: String, required: true },
    options: [{ 
        colors: [{ type: String, lowercase: true, trim: true } ],
        sizes: [{ type: String, lowercase: true, trim: true } ] 
    }],
    variants: [],
    attributes: [],
    basePrice: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);



// Products can only be added to leaf level categories!
productSchema.pre('save', async function (next) {
    try {
        const isLeaf = await Category.isLeaf(this._id);
        if (!isLeaf) return next(new Error("Product must belong to a leaf category"));
        next()
    } catch (error) {
        console.error("Error saving product:", error);
        next(error);
    }

});

const Product = model('Product', productSchema);

export default Product;