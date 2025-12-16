import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        index: true,
        required: true
    }]
}, { timestamps: true
});

export const Product = model('Product', productSchema);