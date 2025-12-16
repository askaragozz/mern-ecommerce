import { Router } from 'express';

import authRouter from './auth.route.js';
import productAdminRouter from './product.admin.route.js';
import productPublicRouter from './product.public.route.js';
import categoryAdminRouter from './category.admin.route.js';

const apiRouter = Router();
apiRouter.use('products', productPublicRouter);
apiRouter.use('auth', authRouter);

const adminRouter = Router();
adminRouter.use('/products', productAdminRouter);
adminRouter.use('/categories', categoryAdminRouter);


export { apiRouter, adminRouter}