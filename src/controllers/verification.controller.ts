import { RequestHandler } from 'express';
import User from '../models/user.model';
import verificationServices from '../services/verification.service';
import tokenServices from '../services/token.service';
import userServices from '../services/user.service';

const verificationController = {
  sendEmail: <RequestHandler>(async (req, res) => {
    try {
      const id = req.params.id;
      const data = await userServices.getById(id);
      if (!data)
        return res.status(404).json({
          error: { message: `User with id "${id}" not found` },
        });

      verificationServices.generateTokenAndSend(data.email, id);
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  confirm: <RequestHandler>(async (req, res) => {
    const token = req.query.token as string;
    if (!token)
      return res.status(400).json({
        error: { message: 'Token required for confirmation' },
      });

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
