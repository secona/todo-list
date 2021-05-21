import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import User from '../models/user.model';
import { JWT_KEY } from '../constants';

interface UserToken {
  id: string;
  email: string;
  password: string;
}

const userAuthServices = {
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
};

export default userAuthServices;
