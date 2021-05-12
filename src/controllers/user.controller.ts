import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import User, { IUser } from '../models/user.model';
import * as userServices from '../services/user.service';
import * as authServices from '../services/auth.service';
import { SALT_ROUNDS } from '../constants';

export const byId: RequestHandler = async (req, res) => {
  try {
    const { code, ...json } = await userServices.getById(req.params.id);
    res.status(code).json(json);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    const data = await userServices.createUser(req.body);
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const signIn: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userServices.isCorrectPassword(email, password);
    if (result === 404)
      return res
        .status(404)
        .json({ error: { message: `User with email ${email} not found` } });

    if (result) {
      const token = authServices.generateToken(
        { email, password },
        { expiresIn: '30d' }
      );
      return res.status(200).json({ data: token });
    }
    return res.status(400).json({ error: { message: 'Password incorrect' } });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  const updatedUser: IUser = { ...req.body, password };
  User.findByIdAndUpdate(id, updatedUser, { new: true }, (error, data) => {
    if (!data) {
      return res.status(404).json({
        error: { message: `User with id ${id} not found` },
      });
    }

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({
      message: `Successfully updated user with id ${id}`,
      data,
    });
  });
};

export const remove: RequestHandler = async (req, res) => {
  try {
    const { code, ...json } = await userServices.deleteUser(req.params.id);
    res.status(code).json(json);
  } catch (error) {
    res.status(500).json({ error });
  }
};
