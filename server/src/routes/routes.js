import { Router } from 'express';

import authRouter from './auth.route.js';
import adminUserRouter from './user.admin.route.js';
import productAdminRouter from './product.admin.route.js';
import productPublicRouter from './product.public.route.js';
import categoryAdminRouter from './category.admin.route.js';
import cartRouter from './cart.route.js';
import orderRouter from './order.route.js';

const apiRouter = Router();
apiRouter.use('/products', productPublicRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/orders', orderRouter);

const adminRouter = Router();
adminRouter.use('/products', productAdminRouter);
adminRouter.use('/categories', categoryAdminRouter);
adminRouter.use('/users', adminUserRouter);


export { apiRouter, adminRouter}