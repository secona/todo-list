import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../constants';

interface UserToken {
  id: string;
  email: string;
  password: string;
}

const authServices = {
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
