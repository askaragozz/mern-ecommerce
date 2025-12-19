import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware.js';
import { getAllUsers, getUser } from '../controllers/users.controller.js';

const userAdminRouter = Router();

userAdminRouter.get('/', requireAuth, requireAdmin, getAllUsers );
userAdminRouter.get('/:id', requireAuth, requireAdmin, getUser );

export default userAdminRouter;