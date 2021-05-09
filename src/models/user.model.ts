import mongoose from 'mongoose';

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

export default mongoose.model<IUserDoc>('User', UserSchema);
