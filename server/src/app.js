import express from 'express';
import cookieParser from 'cookie-parser';
import { apiRouter, adminRouter } from './routes/routes.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/api', apiRouter);
app.use('/api/admin', adminRouter);

export { app };