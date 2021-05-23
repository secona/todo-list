import mongoose from 'mongoose';

export interface IUserAllowed {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends IUserAllowed {
  todos: mongoose.Schema.Types.ObjectId[];
  verified: boolean;
}

export interface IUserDoc extends IUser, mongoose.Document {}

export interface IUserModel extends mongoose.Model<IUserDoc> {
  filterAllowed(obj: IUser | Partial<IUser>): IUserAllowed;
}

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

UserSchema.statics.filterAllowed = function (obj: IUser | Partial<IUser>) {
  const { email, name, password } = obj;
  return { email, name, password } as IUserAllowed;
};

/** This model contain user infos */
const User = mongoose.model<IUserDoc, IUserModel>('User', UserSchema);
export default User;
