import { RequestHandler } from 'express';
import verificationServices from '../services/verification.service';
import userServices from '../services/user.service';
import tokenServices from '../services/token.service';
import { BadRequestError } from '../utils/errors';

const verificationController = {
  resendVerification: <RequestHandler>(async (req, res, next) => {
    const email = req.query.email as string;
    userServices
      .getOne({ email }, { allowUnverified: true })
      .then(user => {
        if (user.verified)
          throw new BadRequestError(
            `User with email "${user.email}" already verified`
          );

        verificationServices.generateTokenAndSend(user.email, user._id);
        res.status(200).json({
          message: `Successfully sent verification link to "${user.email}"`,
        });
      })
      .catch(next);
  }),

  confirm: <RequestHandler>((req, res, next) => {
    const token = req.query.token as string;
    if (!token)
      return next(new BadRequestError('Token required for confirmation'));

    tokenServices.verifyEmailVerificationToken(token, (error, decoded) => {
      if (error || !decoded)
        // redirect to front-end, for now do this
        return res.status(400).json({
          error: { message: 'Invalid token' },
        });

      userServices
        .updateUser(decoded.id, { verified: true }, { directSetVerified: true })
        .then(() => {
          // redirect to front-end, for not do this
          res.status(200).json({
            message: `Successfully verified email for user with id "${decoded.id}"`,
          });
        })
        .catch(next);
    });
  }),
};

export default verificationController;
