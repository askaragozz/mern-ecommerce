import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter, productRouter, categoryRouter } from './routes/routes.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);

export { app };