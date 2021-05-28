import { RequestHandler } from 'express';
import userServices from '../services/user.service';

/** not intended to be used on its own */
const _isVerified = <RequestHandler>(async (req, res, next) => {
  const id = req.params.id;
  userServices
    .getById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
});

export default _isVerified;
