import jwt from 'jsonwebtoken';
import { LeanDocument } from 'mongoose';
import userServices from './user.service';
import { IUserDoc } from '../models/user.model';
import { JWT_KEY } from '../constants/env';
import { ForbiddenError } from '../utils/errors';

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
      throw new ForbiddenError(
        'Invalid token. Token id does not match params id'
      );

    if (decoded.email !== user.email)
      throw new ForbiddenError(
        'Outdated token. User recently changed their email'
      );

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