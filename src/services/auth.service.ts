import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../constants';

interface UserToken {
  id: string;
  email: string;
  password: string;
}

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

  generateUserToken(payload: UserToken) {
    return jwt.sign(payload, JWT_KEY, { expiresIn: '30d' });
  },

  verifyUserToken(
    token: string,
    cb: (err: jwt.VerifyErrors | null, decoded: UserToken | undefined) => void
  ) {
    jwt.verify(token, JWT_KEY, undefined, (error, decoded) => {
      cb(error, <UserToken | undefined>decoded);
    });
  },
};

export default authServices;
