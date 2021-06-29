import jwt from 'jsonwebtoken';
import { LeanDocument } from 'mongoose';
import userServices from './user.service';
import { IUserDoc } from '../models/user.model';
import { JWT_KEY } from '../constants/env';
import { BaseError } from '../utils/errors';

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

  async verifyUserToken(token: string, user: LeanDocument<IUserDoc>) {
    const decoded = jwt.verify(token, JWT_KEY) as UserToken;
    if (decoded.id !== String(user._id))
      throw new BaseError({
        statusCode: 403,
        message: 'invalid token',
        type: 'auth',
        details: [
          {
            name: 'id',
            msg: "token's id does not match user's id",
            value: decoded.id,
          },
        ],
      });

    if (decoded.email !== user.email)
      throw new BaseError({
        statusCode: 403,
        message: 'outdated token',
        type: 'auth',
        details: [
          {
            name: 'email',
            msg: 'user recently changed their email',
            value: decoded.email,
          },
        ],
      });

    await userServices.isPasswordCorrect(user, decoded.password);
    return decoded;
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
