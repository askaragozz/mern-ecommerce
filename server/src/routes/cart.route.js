import { Router } from 'express';
import { getCart, deleteCart } from '../controllers/carts.controller.js';
import { requireAuth } from "../middlewares/auth.middleware.js";
import { addCartItem, deleteCartItem } from '../controllers/cartItems.controller.js';

const cartRouter = Router();

cartRouter.get('/', requireAuth, getCart);
cartRouter.delete('/', requireAuth, deleteCart);

cartRouter.post('/items/:productId', requireAuth, addCartItem);
cartRouter.delete('/items/:productId', requireAuth, deleteCartItem);

export default cartRouter;