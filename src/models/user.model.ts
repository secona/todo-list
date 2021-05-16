import mongoose, { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';

export interface IUser {
  name: string;
  email: string;
  password: string;
  todos?: mongoose.Schema.Types.ObjectId[];
}

export interface IUserDoc extends IUser, mongoose.Document {}

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
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
      },
    ],
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

/** This model contain user infos */
const User = mongoose.model<IUserDoc>('User', UserSchema);
export default User;
