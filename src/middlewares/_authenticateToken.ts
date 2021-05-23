import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import tokenService from '../services/token.service';

/** not intended to be used on its own */
const _authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({
      error: { message: 'Bearer token required' },
    });

  tokenService.verifyUserToken(token, async (error, decoded) => {
    if (error || !decoded) {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    }

    if (decoded.id !== req.params.id) {
      return res.status(403).json({
        error: { message: 'Invalid token. Token id does not match param id' },
      });
    }

    // req.user will not be empty since before this middleware, we're checking if user with id exists
    const { password, email } = req.user!;
    const passwordCorrect = await bcrypt.compare(decoded.password, password);
    if (!passwordCorrect || email !== decoded.email) {
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

export default _authenticateToken;
