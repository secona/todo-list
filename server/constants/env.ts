import * as dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI!;
export const JWT_KEY = process.env.JWT_KEY!;

export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS!;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;
export const EMAIL_NAME = process.env.EMAIL_NAME!;
