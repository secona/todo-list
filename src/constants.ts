import * as dotenv from 'dotenv';
dotenv.config();

export const {
  MONGODB_URI,
  JWT_KEY,
  LOG_PREFIX = '[\x1B[36mSERVER\x1B[0m]',
  SALT_ROUNDS = 10,
} = process.env;
