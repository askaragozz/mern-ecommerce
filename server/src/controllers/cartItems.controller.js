import { isValidObjectId } from 'mongoose';
import User from '../models/user.model.js';
import Cart from '../models/cart.model.js';

export const addCartItem = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!userId) return res.status(400).json({ message: "Missing param: userId" });
    if (!productId) return res.status(400).json({ message: "Missing param: productId" });

    if (!isValidObjectId(userId))
        return res.status(400).json({ message: "Invalid userId" });

    if (!isValidObjectId(productId))
        return res.status(400).json({ message: "Invalid productId" });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // 1) Ensure cart exists (atomic)
        const cart = await Cart.findOneAndUpdate(
            { userId: user._id, status: "active" },
            { $setOnInsert: { userId: user._id, status: "active", cartItems: [] } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // 2) Try increment existing item (atomic)
        const incResult = await Cart.updateOne(
            { _id: cart._id, "cartItems.productId": productId },
            { $inc: { "cartItems.$.quantity": 1 } }
        );

        // 3) If not found, push a new item
        if (incResult.matchedCount === 0) {
            await Cart.updateOne(
                { _id: cart._id, "cartItems.productId": { $ne: productId } },
                { $push: { cartItems: { productId, quantity: 1 } } }
            );
        }

        const updatedCart = await Cart.findById(cart._id);

        return res.status(200).json({
            cart: updatedCart._id,
            items: updatedCart.cartItems.map((cartItem) => ({
                productId: cartItem.productId,
                quantity: cartItem.quantity,
            })),
        });
    } catch (error) {
        console.error("Error adding cart item", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  if (!productId) return res.status(400).json({ message: 'Missing param: productId' });
  if (!isValidObjectId(productId))
    return res.status(400).json({ message: 'Invalid productId' });

  try {
    const decResult = await Cart.updateOne(
      { 'userId': userId, status: 'active', 'cartItems.productId': productId },
      { $inc: { 'cartItems.$.quantity': -1 } }
    );

    if (decResult.matchedCount === 0)
      return res.status(404).json({ message: 'Cart item not found' });

    await Cart.updateOne(
      { userId, status: 'active', 'cartItems.productId': productId },
      { $pull: { cartItems: { quantity: { $lte: 0 } } } }
    );

    return res.status(204).json();
  } catch (error) {
    console.error('Error decrementing cart item', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

