import * as dotenv from 'dotenv';
dotenv.config();

export const LOG_PREFIX = '[\x1B[36mSERVER\x1B[0m]';
export const SALT_ROUNDS = 10;

export const MONGODB_URI = process.env.MONGODB_URI!;
export const JWT_KEY = process.env.JWT_KEY!;
