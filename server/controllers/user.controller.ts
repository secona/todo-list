import { RequestHandler } from 'express';
import tokenServices from '../services/token.service';
import userServices from '../services/user.service';
import verificationServices from '../services/verification.service';
import toBoolean from '../utils/toBoolean';

const userController: Record<
  'byId' | 'register' | 'login' | 'update' | 'remove',
  RequestHandler
> = {
  byId: async (req, res, next) => {
    try {
      const complete = toBoolean(req.query.complete as string);
      const user = !complete
        ? req.user!
        : await userServices.populateLean(req.user!);
      res.status(200).json({ success: true, data: { user } });
    } catch (e) {
      next(e);
    }
  },

  register: (req, res, next) => {
    userServices
      .createUser(req.body)
      .then(user => {
        res.status(201).json({ success: true, data: { user } });
      })
      .catch(next);
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userServices.getOne({ email });
      const id = String(user._id);
      await userServices.isPasswordCorrect(user, password);

      const token = await tokenServices.generateUserToken({
        id,
        email,
        password,
      });

      res.status(200).json({ success: true, data: { id, token } });
    } catch (e) {
      next(e);
    }
  },

  update: (req, res, next) => {
    userServices
      .updateUser(req.user!, req.body)
      .then(user =>
        res.status(200).json({
          success: true,
          message: `updated user with id "${user?._id}"`,
          data: { user },
        })
      )
      .catch(next);
  },

  remove: (req, res, next) => {
    userServices
      .deleteUser(req.user!)
      .then(() =>
        res.status(200).json({
          success: true,
          message: `deleted user with id "${req.params.id}"`,
          data: { user: null },
        })
      )
      .catch(next);
  },
};

export default userController;
