import mongoose from 'mongoose';

import { MONGO_URI } from './env.js';


export const connectDB = async () => {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
};
