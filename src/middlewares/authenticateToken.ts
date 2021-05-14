import { RequestHandler } from 'express';
import authServices from '../services/auth.service';

const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({
      error: { message: 'You are unauthorized' },
    });

  authServices.verifyToken(token, undefined, (error, data) => {
    if (error)
      return res.status(403).json({
        error: { message: "You don't have access" },
      });

    return next();
  });
};

export default authenticateToken;
