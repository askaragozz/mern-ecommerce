import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { validateRegister } from '../middlewares/register.middleware.js';

const authRouter = Router();

authRouter.post('/register', validateRegister, register);
authRouter.post('/login', login);
authRouter.post('/logout/:id', logout);

export default authRouter;
