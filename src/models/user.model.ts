import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  todos: mongoose.Schema.Types.ObjectId[];
  verified: boolean;
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
    verified: {
      type: Boolean,
      required: true,
      default: false,
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

/** This model contain user infos */
const User = mongoose.model<IUserDoc>('User', UserSchema);
export default User;
