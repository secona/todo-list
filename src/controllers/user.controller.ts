import { RequestHandler } from 'express';
import tokenServices from '../services/token.service';
import userServices from '../services/user.service';
import verificationServices from '../services/verification.service';
import toBoolean from '../utils/toBoolean';

const userController: Record<
  'byId' | 'register' | 'signIn' | 'update' | 'remove',
  RequestHandler
> = {
  byId: async (req, res, next) => {
    try {
      // TODO: fix toBoolean. throws error `Cannot read property 'toString' of undefined`
      // const complete = toBoolean(req.query.complete as string);
      const complete = !!req.query.complete;
      const user = !complete
        ? req.user!
        : await userServices.populateLean(req.user!);
      res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  },

  register: (req, res, next) => {
    userServices
      .createUser(req.body)
      .then(data => {
        verificationServices.generateTokenAndSend(data.email, data.id);
        res.status(201).json({ data });
      })
      .catch(next);
  },

  signIn: (req, res, next) => {
    const {
      user: { _id: id },
      body: { email, password },
    } = req;
    tokenServices
      .generateUserToken({ id, email, password })
      .then(token => res.status(200).json({ data: token }))
      .catch(next);
  },

  update: (req, res, next) => {
    userServices
      .updateUser(req.user!, req.body)
      .then(data =>
        res.status(200).json({
          message: `Successfully updated user with id "${data?._id}"`,
          data,
        })
      )
      .catch(next);
  },

  remove: (req, res, next) => {
    userServices
      .deleteUser(req.user!)
      .then(() =>
        res.status(200).json({
          message: `Successfully deleted user with id "${req.params.id}"`,
        })
      )
      .catch(next);
  },
};

export default userController;
