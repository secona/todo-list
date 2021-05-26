import { LeanDocument } from 'mongoose';
import { ITodoDoc } from '../../src/models/todo.model';
import { IUserDoc } from '../../src/models/user.model';

declare global {
  namespace Express {
    interface Request {
      user: LeanDocument<IUserDoc>;
      todo: LeanDocument<ITodoDoc>;
    }
  }
}
