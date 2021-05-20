import * as dotenv from 'dotenv';
dotenv.config();

export const LOG_PREFIX = '[\x1B[36mSERVER\x1B[0m]';
export const SALT_ROUNDS = 10;

export const MONGODB_URI = process.env.MONGODB_URI!;
export const JWT_KEY = process.env.JWT_KEY!;

export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS!;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;
export const EMAIL_NAME = process.env.EMAIL_NAME!;
