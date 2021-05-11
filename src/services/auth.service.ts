import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../constants';

export function generateToken(
  payload: string | object | Buffer,
  options?: jwt.SignOptions
) {
  return jwt.sign(payload, JWT_KEY as string, options);
}

export function verifyToken(
  token: string,
  options?: jwt.VerifyOptions,
  cb?: jwt.VerifyCallback
) {
  jwt.verify(token, JWT_KEY as string, options, cb);
}
