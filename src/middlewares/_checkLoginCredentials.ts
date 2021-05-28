import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/user.model';
import { NotFoundError, UnauthorizedError } from '../utils/errors';

const _checkLoginCredentials: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean().exec();
  if (!user)
    return next(new NotFoundError(`User with email "${email}" not found`));

  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect)
    return next(new UnauthorizedError('Password incorrect'));

  req.user = user;
  next();
};

export default _checkLoginCredentials;
