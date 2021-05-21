import { RequestHandler } from 'express';
import tokenServices from '../services/token.service';
import userServices from '../services/user.service';
import verificationServices from '../services/verification.service';

// TODO: prevent any changes if email is unverified
const userController = {
  byId: <RequestHandler>(async (req, res) => {
    try {
      const id = req.params.id;
      const data = await userServices.getById(id, !!req.query.complete);

      if (data) return res.status(200).json({ data });
      return res.status(404).json({
        error: { message: `User with id "${id}" not found` },
      });
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
      const { email, password } = req.body;
      const result = await tokenServices.generateUserToken(email, password);

      if (result) return res.status(200).json({ data: result });

      if (result === false) {
        return res.status(401).json({
          error: { message: `Password Incorrect` },
        });
      }

      res.status(404).json({
        error: { message: `User with email "${email}" not found` },
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  update: <RequestHandler>(async (req, res) => {
    try {
      const id = req.params.id;
      const data = await userServices.updateUser(id, req.body);

      if (!data) {
        return res.status(404).json({
          error: { message: `User with id "${id}" not found` },
        });
      }

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
      const data = await userServices.deleteUser(id);

      if (!data) {
        return res.status(404).json({
          error: { message: `User with id "${id}" not found` },
        });
      }

      return res.status(200).json({
        message: `Successfully deleted user with id "${id}"`,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),
};

export default userController;
