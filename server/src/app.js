import express from 'express';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/api/v1/auth', authRouter);

export { app };