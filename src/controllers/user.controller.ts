import { RequestHandler } from 'express';
import tokenServices from '../services/token.service';
import userServices from '../services/user.service';
import verificationServices from '../services/verification.service';
import toBoolean from '../utils/toBoolean';

const userController = {
  byId: <RequestHandler>(async (req, res, next) => {
    try {
      const complete = toBoolean(req.query.complete as string);
      const user = !complete
        ? req.user!
        : await userServices.populateLean(req.user!);
      res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }),

  register: <RequestHandler>((req, res, next) => {
    userServices
      .createUser(req.body)
      .then(data => {
        verificationServices.generateTokenAndSend(data.email, data.id);
        res.status(201).json({ data });
      })
      .catch(next);
  }),

  signIn: <RequestHandler>((req, res, next) => {
    const {
      user: { _id: id },
      body: { email, password },
    } = req;
    tokenServices
      .generateUserToken({ id, email, password })
      .then(token => res.status(200).json({ data: token }))
      .catch(next);
  }),

  update: <RequestHandler>((req, res, next) => {
    userServices
      .updateUser(req.user!, req.body)
      .then(data =>
        res.status(200).json({
          message: `Successfully updated user with id "${data?._id}"`,
          data,
        })
      )
      .catch(next);
  }),

  remove: <RequestHandler>((req, res, next) => {
    userServices
      .deleteUser(req.user!)
      .then(() =>
        res.status(200).json({
          message: `Successfully deleted user with id "${req.params.id}"`,
        })
      )
      .catch(next);
  }),
};

export default userController;
