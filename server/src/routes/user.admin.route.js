import { Router } from 'express';
import { requireAuth } from '../middlewares/auth/requireAuth.js';
import { requireAdmin } from '../middlewares/auth/requireAdmin.js';
import { getAllUsers, getUser } from '../controllers/users.controller.js';

const userAdminRouter = Router();

userAdminRouter.get('/', requireAuth, requireAdmin, getAllUsers );
userAdminRouter.get('/:id', requireAuth, requireAdmin, getUser );

export default userAdminRouter;