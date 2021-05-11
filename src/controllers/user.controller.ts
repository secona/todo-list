import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import User, { IUser } from '../models/user.model';
import * as userServices from '../services/user.service';
import * as authServices from '../services/auth.service';
import { SALT_ROUNDS } from '../constants';

export const byId: RequestHandler = (req, res) => {
  const id = req.params.id;
  userServices
    .getById(id)
    .then(({ code, ...json }) => res.status(code).json(json))
    .catch(error => res.status(500).json({ error }));
};

export const register: RequestHandler = async (req, res) => {
  const user = await userServices.createUser(req.body);
  user
    .save()
    .then(data => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ error }));
};

export const signIn: RequestHandler = (req, res) => {
  const { email, password } = req.body;
  userServices
    .isCorrectPassword(email, password)
    .then(result => {
      if (typeof result === 'boolean') {
        if (result) {
          const token = authServices.generateToken(
            { email, password },
            { expiresIn: '30d' }
          );
          return res.status(200).json({ data: token });
        }
        return res
          .status(400)
          .json({ error: { message: 'Password incorrect' } });
      }

      const { code, ...json } = result;
      res.status(result.code).json(json);
    })
    .catch(error => res.status(500).json({ error }));
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

export const remove: RequestHandler = (req, res) => {
  const id = req.params.id;
  userServices
    .deleteUser(id)
    .then(({ code, ...json }) => res.status(code).json(json))
    .catch(error => res.status(500).json({ error }));
};
