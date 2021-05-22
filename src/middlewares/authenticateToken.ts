import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import authServices from '../services/token.service';
import userServices from '../services/user.service';

const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: { message: 'Bearer token required' },
    });
  }

  authServices.verifyUserToken(token, async (error, decoded) => {
    if (error || !decoded) {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    }

    if (decoded.id !== req.params.id) {
      return res.status(403).json({
        error: { message: 'Invalid token. Token id does not match param id' },
      });
    }

    // req.user will not be empty since before this middleware, wer are checking
    // if user with id exists
    const passwordValid = await bcrypt.compare(decoded.password, req.user!.password);
    if (!passwordValid || req.user?.email !== decoded.email) {
      return res.status(403).json({
        error: {
          message:
            'Outdated token. User recently changed their password or email',
        },
      });
    }

    return next();
  });
};

export default authenticateToken;
