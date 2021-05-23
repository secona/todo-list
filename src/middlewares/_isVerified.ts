import { RequestHandler } from 'express';
import userServices from '../services/user.service';

/** not intended to be used on its own */
const _isVerified = <RequestHandler>(async (req, res, next) => {
  const id = req.params.id;
  const result = await userServices.getById(id);
  if (result === 'not-found')
    return res.status(404).json({
      error: { message: `User with id "${id}" not found` },
    });
  if (result === 'not-verified')
    return res.status(403).json({
      error: { message: `User with id "${id}"'s email not verified` },
    });
  req.user = result;
  next();
});

export default _isVerified;
