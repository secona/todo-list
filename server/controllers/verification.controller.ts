import { RequestHandler } from 'express';
import verificationServices from '../services/verification.service';
import userServices from '../services/user.service';
import tokenServices from '../services/token.service';
import { BaseError } from '../utils/errors';

const verificationController: Record<
  'resendVerification' | 'confirm',
  RequestHandler
> = {
  resendVerification: async (req, res, next) => {
    const email = req.query.email as string;
    userServices
      .getOne({ email }, { allowUnverified: true })
      .then(user => {
        if (user.verified)
          throw new BaseError({
            statusCode: 400,
            message: `Email "${email}" is already verified`,
            type: 'resource',
            details: [
              {
                name: 'email',
                msg: 'Email is already verified',
                value: email,
              },
            ],
          });

        verificationServices.generateTokenAndSend(user.email, user._id);
        res.status(200).json({
          success: true,
          message: `sent verification link to "${user.email}"`,
        });
      })
      .catch(next);
  },

  confirm: (req, res, next) => {
    const token = req.query.token as string;
    if (!token)
      return next(
        new BaseError({
          statusCode: 400,
          message: 'token required',
          type: 'validation',
          details: [
            {
              name: 'token',
              msg: 'token absent in query params',
            },
          ],
        })
      );

    tokenServices.verifyEmailVerificationToken(token, (error, decoded) => {
      if (error || !decoded)
        // redirect to front-end, for now do this
        return res.status(400).json({
          error: { message: 'Invalid token' },
        });

      userServices
        .markVerified(decoded.id)
        .then(() => {
          // redirect to front-end, for not do this
          res.status(200).json({
            message: `verified email for user with id "${decoded.id}"`,
          });
        })
        .catch(next);
    });
  },
};

export default verificationController;
