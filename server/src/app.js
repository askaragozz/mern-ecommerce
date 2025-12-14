import express from 'express';
import authRouter from './routes/auth.route.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
console.log(`Auth router insight ${authRouter.stack[0].route.path}`);

app.use((req, _res, next) => {
        console.log('CT:', req.headers['content-type']);
    console.log('BODY:', req.body);
  console.log('IN:', req.method, req.url);
  next();
});

app.use('/api/v1/auth', authRouter);

export { app };