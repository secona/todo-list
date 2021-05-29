import { RequestHandler } from 'express';
import userServices from '../services/user.service';

/** not intended to be used on its own */
const _isVerified = <RequestHandler>(async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const user = await userServices.getOne({ _id });

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
});

export default _isVerified;
