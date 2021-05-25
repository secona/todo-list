import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/user.model';

const _checkLoginCredentials: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean().exec();
  if (!user)
    return res.status(404).json({
      error: { message: `User with email "${email}" not found` },
    });

  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect)
    return res.status(401).json({
      error: { message: 'Password incorrect' },
    });

  req.user = user;
  next();
};

export default _checkLoginCredentials;
