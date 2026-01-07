import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },

    title: { type: String, required: true, trim: true },

    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

orderItemSchema.pre('validate', function (next) {
  if (this.quantity != null && this.unitPrice != null) {
    this.lineTotal = this.quantity * this.unitPrice;
  }
  next();
});

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true, unique: true, index: true },
    orderNo: { type: String, unique: true, index: true },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled", "refunded"], default: "pending", required: true, index: true },
    items: {
        type: [orderItemSchema], 
        required: true,
        validate: {
            validator: (arr) => Array.isArray(arr) && arr.length > 0,
            message: 'Order must have at least 1 item',
        },
    },
    totalAmount: { type: Number, required: true, min: 0 }

}, { timestamps: true })

const Order = model("Order", orderSchema);
export default Order;