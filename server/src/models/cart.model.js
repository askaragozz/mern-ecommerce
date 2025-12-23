//models/cart.model.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        status: {
            type: String,
            enum: ["active"], // will be extended
            default: "active",
            required: true,
        },
        cartItems: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

// Enforce: only one ACTIVE cart per user (safe under concurrency)
cartSchema.index(
    { userId: 1, status: 1 },
    { unique: true, partialFilterExpression: { status: "active" } }
);

const Cart = model("Cart", cartSchema);

export default Cart;
