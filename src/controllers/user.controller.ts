import { RequestHandler } from 'express';
import tokenServices from '../services/token.service';
import userServices from '../services/user.service';
import verificationServices from '../services/verification.service';
import toBoolean from '../utils/toBoolean';

const userController = {
  byId: <RequestHandler>(async (req, res) => {
    try {
      const id = req.params.id;
      const complete = toBoolean(req.query.complete as string);
      const data = await userServices.getById(id, complete);
      return res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  register: <RequestHandler>(async (req, res) => {
    try {
      const data = await userServices.createUser(req.body);
      verificationServices.generateTokenAndSend(data.email, data.id);
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  signIn: <RequestHandler>(async (req, res) => {
    try {
      const {
        user: { _id: id },
        body: { email, password },
      } = req;
      const token = await tokenServices.generateUserToken({
        id,
        email,
        password,
      });
      res.status(200).json({ data: token });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  update: <RequestHandler>(async (req, res) => {
    try {
      const id = req.params.id;
      const data = await userServices.updateUser(id, req.user!, req.body);
      return res.status(200).json({
        message: `Successfully updated user with id "${id}"`,
        data,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  remove: <RequestHandler>(async (req, res) => {
    try {
      const id = req.params.id;
      await userServices.deleteUser(id);

      return res.status(200).json({
        message: `Successfully deleted user with id "${id}"`,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),
};

export default userController;
