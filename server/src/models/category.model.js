import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    topCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'TopCategory',
        default: null
    }
}, { timestamps: true
});

const Category = model('Category', categorySchema);

export default Category;