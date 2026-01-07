import { Router } from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orders.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const orderRouter = Router();

orderRouter.post('/', requireAuth, createOrder);
orderRouter.get('/', requireAuth, getOrders);
orderRouter.get('/:id', requireAuth, getOrderById);

export default orderRouter;