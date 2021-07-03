import { RequestHandler } from 'express';
import verificationServices from '../services/verification.service';
import userServices from '../services/user.service';
import tokenServices from '../services/token.service';
import { BaseError } from '../utils/errors';

const verificationController: Record<'send' | 'confirm', RequestHandler> = {
  send: async (req, res, next) => {
    try {
      const email = req.query.email as string;
      if (!email)
        throw new BaseError({
          statusCode: 400,
          message: 'email is absent in query params',
          type: 'validation',
          details: [
            {
              name: 'email',
              msg: 'email absent in query params',
              location: 'params',
            },
          ],
        });

      const user = await userServices.getOne(
        { email },
        { allowUnverified: true }
      );

      if (user.verified)
        throw new BaseError({
          statusCode: 400,
          message: `email "${email}" is already verified`,
          type: 'resource',
          details: [
            { name: 'email', msg: 'email is already verified', value: email },
          ],
        });

      verificationServices.generateTokenAndSend(user.email, user._id);
      res.status(200).json({
        success: true,
        message: `sent verification link to "${user.email}"`,
      });
    } catch (e) {
      next(e);
    }
  },

  confirm: async (req, res, next) => {
    try {
      const token = req.query.token as string;
      if (!token)
        throw new BaseError({
          statusCode: 400,
          message: 'token required',
          type: 'validation',
          details: [{ name: 'token', msg: 'token absent in query params' }],
        });

      const decoded = tokenServices.verifyEmailVerificationToken(token);
      await userServices.markVerified(decoded.id);
      res.status(200).json({
        success: true,
        message: `verified email ${decoded.email}`,
      });
    } catch (e) {
      next(e);
    }
  },
};

export default verificationController;
