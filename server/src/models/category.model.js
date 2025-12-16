import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true
});

export const Category = model('Category', categorySchema);