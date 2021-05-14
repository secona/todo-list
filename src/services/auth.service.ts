import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../constants';

const authServices = {
  generateToken(payload: string | object | Buffer, options?: jwt.SignOptions) {
    return jwt.sign(payload, JWT_KEY as string, options);
  },

  verifyToken(
    token: string,
    options?: jwt.VerifyOptions,
    cb?: jwt.VerifyCallback
  ) {
    jwt.verify(token, JWT_KEY as string, options, cb);
  },
};

export default authServices;
