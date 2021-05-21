import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import User from '../models/user.model';
import { JWT_KEY } from '../constants';

interface UserToken {
  id: string;
  email: string;
  password: string;
}

interface EmailVerificationToken {
  id: string;
  email: string;
}

const tokenServices = {
  async generateUserToken(email: string, password: string) {
    const user = await User.findOne({ email }).lean().exec();
    if (!user) return null; // 404 - not found

    const result = await bcrypt.compare(password, user.password);
    if (!result) return false; // 401 - unauthorized

    const id = user._id;
    const payload: UserToken = { id, email, password };
    return jwt.sign(payload, JWT_KEY, { expiresIn: '30d' });
  },

  verifyUserToken(
    token: string,
    cb: (err: jwt.VerifyErrors | null, decoded: UserToken | undefined) => void
  ) {
    jwt.verify(token, JWT_KEY, undefined, (error, decoded) => {
      cb(error, <UserToken | undefined>decoded);
    });
  },

  generateEmailVerificationToken(payload: EmailVerificationToken) {
    return jwt.sign(payload, JWT_KEY, { expiresIn: '1d' });
  },

  verifyEmailVerificationToken(
    token: string,
    cb: (
      err: jwt.VerifyErrors | null,
      decoded: EmailVerificationToken | undefined
    ) => void
  ) {
    jwt.verify(token, JWT_KEY, undefined, (error, decoded) => {
      cb(error, <EmailVerificationToken | undefined>decoded);
    });
  },
};

export default tokenServices;
