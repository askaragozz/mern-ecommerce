import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    "stock": {
        type: Number,
        required: true,
        min: 0
    },
    categoryIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        index: true,
        required: true
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true
});

const Product = model('Product', productSchema);

export default Product;