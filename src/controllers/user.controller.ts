import { RequestHandler } from 'express';
import User, { IUser } from '../models/user.model';

export const byId: RequestHandler = (req, res) => {
  const id = req.params.id;
  User.findById(id, undefined, undefined, (error, data) => {
    if (!data) {
      return res.status(404).json({
        error: { message: `User with id ${id} not found` },
      });
    }

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ data });
  });
};

export const create: RequestHandler = (req, res) => {
  const newUser: IUser = req.body;
  User.create(newUser)
    .then(data => res.status(201).json({ data }))
    .catch(error => res.status(400).json({ error }));
};

export const update: RequestHandler = (req, res) => {
  const id = req.params.id;
  const updatedUser: IUser = req.body;
  User.findByIdAndUpdate(id, updatedUser, { new: true }, (error, data) => {
    if (!data) {
      return res.status(404).json({
        error: { message: `User with id ${id} not found` },
      });
    }

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({
      message: `Successfully updated user with id ${id}`,
      data,
    });
  });
};

export const remove: RequestHandler = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id, { new: true }, (error, data) => {
    if (!data) {
      return res.status(404).json({
        error: { message: `User with id ${id} not found` },
      });
    }

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({
      message: `Successfully removed user with id ${id}`,
    });
  });
};
