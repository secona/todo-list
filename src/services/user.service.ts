import { CallbackError, LeanDocument, UpdateQuery } from 'mongoose';
import * as bcrypt from 'bcrypt';
import User, { IUserDoc, IUser } from '../models/user.model';

interface IResult {
  code: number;
  message?: string;
  error?: CallbackError | { message: string };
  data?: IUserDoc | LeanDocument<IUserDoc>;
}

export async function getById(id: any): Promise<IResult> {
  const data = await User.findById(id).lean().exec();
  return !data
    ? { code: 404, error: { message: `User with id ${id} not found` } }
    : { code: 200, data };
}

export async function createUser(data: IUser) {
  const user = new User(data);
  return user.save();
}

export async function updateUser(
  id: any,
  update: UpdateQuery<IUserDoc>
): Promise<IResult> {
  const data = await User.updateOne({ _id: id }, update, { new: true }).exec();
  return !data
    ? { code: 404, error: { message: `User with id ${id} not found` } }
    : { code: 200, message: `User with id ${id} successfully updated` };
}

export async function deleteUser(id: any): Promise<IResult> {
  const data = await User.findByIdAndRemove(id).exec();
  return !data
    ? { code: 404, error: { message: `User with id ${id} not found` } }
    : { code: 200, message: `User with id ${id} successfully deleted` };
}

export async function isCorrectPassword(
  email: string,
  password: string
): Promise<404 | boolean> {
  const data = await User.findOne({ email });
  if (!data) return 404;

  const compareWith = data.password;
  const result = await bcrypt.compare(password, compareWith);
  return result;
}

/**
 * Won't throw an error if the provided email is the
 * same as the email associated with the provided id
 */
export function isEmailAvailable(email: string, id?: any) {
  return User.findOne({ email }).then(data => {
    if (data && data._id.toString() !== id) {
      return Promise.reject('Email is already in use');
    }
  });
}
