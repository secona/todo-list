import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../constants/env';

interface UserToken {
  id: string;
  email: string;
  password: string;
}

interface EmailVerificationToken {
  id: string;
  email: string;
}

const tokenServices = {
  async generateUserToken(payload: UserToken) {
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

  generateEmailVerificationToken(payload: EmailVerificationToken) {
    return jwt.sign(payload, JWT_KEY, { expiresIn: '1d' });
  },

  verifyEmailVerificationToken(
    token: string,
    cb: (
      err: jwt.VerifyErrors | null,
      decoded: EmailVerificationToken | undefined
    ) => void
  ) {
    jwt.verify(token, JWT_KEY, undefined, (error, decoded) => {
      cb(error, <EmailVerificationToken | undefined>decoded);
    });
  },
};

export default tokenServices;
