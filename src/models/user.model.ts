import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserDoc extends IUser, mongoose.Document {}

// TODO: the todo list
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre(
  'save',
  async function (this: mongoose.Document, next: mongoose.HookNextFunction) {
    const user = this as IUserDoc;
    if (!this.isModified('password')) return next();

    try {
      if (user.password) {
        const password = await bcrypt.hash(user.password, SALT_ROUNDS);
        user.password = password;
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
);

export default mongoose.model<IUserDoc>('User', UserSchema);
