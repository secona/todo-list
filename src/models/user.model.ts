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

async function hashPassword(
  this: mongoose.Document,
  next: mongoose.HookNextFunction
) {
  const user = this as IUserDoc;
  if (!this.isModified('password')) return next();

  try {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(user.password, salt);
      user.password = password;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

UserSchema.pre('save', hashPassword);

export default mongoose.model<IUserDoc>('User', UserSchema);
