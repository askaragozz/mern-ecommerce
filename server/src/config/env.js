import { config } from 'dotenv';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
config({ path: `.env.${NODE_ENV}.local` });

export const { 
    PORT,
    MONGO_URI, 
} = process.env;
