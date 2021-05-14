import { RequestHandler } from 'express';
import userServices from '../services/user.service';
import authServices from '../services/auth.service';

const userController = {
  byId: <RequestHandler>(async (req, res) => {
    try {
      const { code, ...json } = await userServices.getById(req.params.id);
      res.status(code).json(json);
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  register: <RequestHandler>(async (req, res) => {
    try {
      const data = await userServices.createUser(req.body);
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  signIn: <RequestHandler>(async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await userServices.isCorrectPassword(email, password);
      if (result === 404)
        return res
          .status(404)
          .json({ error: { message: `User with email ${email} not found` } });

      if (result[0]) {
        const token = authServices.generateUserToken({
          id: result[1]._id,
          email,
          password,
        });
        return res.status(200).json({ data: token });
      }
      return res.status(400).json({ error: { message: 'Password incorrect' } });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  update: <RequestHandler>(async (req, res) => {
    try {
      const { code, ...json } = await userServices.updateUser(
        req.params.id,
        req.body
      );
      res.status(code).json(json);
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  remove: <RequestHandler>(async (req, res) => {
    try {
      const { code, ...json } = await userServices.deleteUser(req.params.id);
      res.status(code).json(json);
    } catch (error) {
      res.status(500).json({ error });
    }
  }),
};

export default userController;
