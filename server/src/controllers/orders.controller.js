
import Order from '../models/order.model.js';

export const createOrder = async (req, res) => {

    const userId = req.user.id;
    const { cartId,items, totalAmount } = req.body;

    try {
        if (!userId || !cartId || !items || !totalAmount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newOrder = await Order.create({ userId, cartId, items, totalAmount, status: 'pending' });
        
        return res.status(201).json({ message: 'Order created successfully', order: newOrder });          
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}; 

export const getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.id;

    try {
        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
