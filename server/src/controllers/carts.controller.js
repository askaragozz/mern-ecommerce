//controllers/cart.controller.js
import { isValidObjectId } from "mongoose";
import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  const userId = req.user.id;

  if (!userId) return res.status(400).json({ message: 'Missing userId' });
  if (!isValidObjectId(userId))
    return res.status(400).json({ message: 'Invalid userId' });

  try {

    // Get-or-create (active cart)
    const cart = await Cart.findOneAndUpdate(
      { userId, status: 'active' },
      { $setOnInsert: { userId, status: 'active', cartItems: [] } },
      { new: true, upsert: true }
    ).lean();

    return res.status(200).json({
      id: cart._id,
      status: cart.status,
      items: (cart.cartItems || []).map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    });
  } catch (error) {
    console.error('Error getting cart', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const deleteCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!productId) return res.status(400).json({ message: "Missing param: productId" });

    if (!isValidObjectId(productId))
        return res.status(400).json({ message: "Invalid productId" });

    try {
        const deletedCart = await Cart.findByIdAndDelete({userId: userId});
        if(!deletedCart) res.status(404).json({ message: "Cart not found"});
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error('Delete Cart error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};