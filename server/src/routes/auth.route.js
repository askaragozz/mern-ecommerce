import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { validateRegister } from '../middlewares/auth/register.middleware.js';

const authRouter = Router();

authRouter.post('/register', validateRegister, register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;
