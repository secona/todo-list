import { RequestHandler } from 'express';
import User from '../models/user.model';
import verificationServices from '../services/verification.service';
import tokenServices from '../services/token.service';
import { NotFoundError, BadRequestError } from '../utils/errors';

const verificationController = {
  resendVerification: <RequestHandler>(async (req, res, next) => {
    try {
      const email = req.query.email as string;
      const data = await User.findOne({ email }).lean().exec();

      if (!data)
        return next(new NotFoundError(`User with email "${email}" not found`));

      if (data.verified)
        return next(
          new BadRequestError(`User with email "${email}" already verified`)
        );

      verificationServices.generateTokenAndSend(data.email, data._id);
      res.status(200).json({
        message: `Successfully sent verification email to "${email}"`,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
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

      User.findByIdAndUpdate(decoded.id, { verified: true })
        .exec()
        .then(() => {
          // redirect to front-end, for now do this
          return res.status(200).json({
            message: `Successfully verified email for user with id "${decoded.id}"`,
          });
        })
        .catch(error => res.status(500).json({ error }));
    });
  }),
};

export default verificationController;
