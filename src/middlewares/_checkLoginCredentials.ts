import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import userServices from '../services/user.service';
import { UnauthorizedError } from '../utils/errors';

const _checkLoginCredentials: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.getOne({ email });

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) throw new UnauthorizedError('Password incorrect');

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export default _checkLoginCredentials;
