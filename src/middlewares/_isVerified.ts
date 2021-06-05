import { RequestHandler } from 'express';
import userServices from '../services/user.service';

/** not intended to be used on its own */
const _isVerified = <RequestHandler>(async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    req.user = await userServices.getOne({ _id });
    next();
  } catch (e) {
    next(e);
  }
});

export default _isVerified;
