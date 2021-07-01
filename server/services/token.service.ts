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

const verify = <T extends object>(token: string, secret: string) => {
  let result: Parameters<jwt.VerifyCallback<jwt.JwtPayload & T>> = [
    null,
    undefined,
  ];
  jwt.verify(
    token,
    secret,
    {},
    (err, decoded) => (result = [err, decoded as T])
  );
  return result;
};

const tokenServices = {
  async generateUserToken(payload: UserToken) {
    return jwt.sign(payload, JWT_KEY, { expiresIn: '30d' });
  },

  async verifyUserToken(token: string, user: LeanDocument<IUserDoc>) {
    const [err, decoded] = verify<UserToken>(token, JWT_KEY);
    if (err || !decoded)
      throw new BaseError({
        statusCode: 401,
        message: err?.message || 'invalid token',
        type: 'auth',
        details: [{ name: 'token', msg: 'invalid token', value: token }],
      });

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

  verifyEmailVerificationToken(token: string) {
    const [err, decoded] = verify<EmailVerificationToken>(token, JWT_KEY);
    if (err || !decoded)
      throw new BaseError({
        statusCode: 400,
        message: err?.message,
        type: 'auth',
        details: [{ name: 'token', msg: 'invalid token', value: token }],
      });

    return decoded;
  },
};

export default tokenServices;
