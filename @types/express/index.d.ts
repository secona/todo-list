import { LeanDocument } from 'mongoose';
import { IUserDoc } from '../../src/models/user.model';

declare global {
  namespace Express {
    interface Request {
      user: LeanDocument<IUserDoc>;
    }
  }
}
