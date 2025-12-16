import mongoose from "mongoose";

const { Schema, model } = mongoose;

//sku-will be added later on;
const variantSchema = new Schema({
    stock: { type: Number, required: true, min: 0, default: 0 },
    price: { type: Number, min: 0},
    color: { type: String },
    size: { type: String },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }
}, { _id: true, versionKey: false } );

const Variant = new model("Variant", variantSchema);

export default Variant;