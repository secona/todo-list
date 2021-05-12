import { CallbackError, LeanDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import User, { IUserDoc, IUser } from '../models/user.model';
import { SALT_ROUNDS } from '../constants';

interface IResult {
  code: number;
  message?: string;
  error?: CallbackError | { message: string };
  data?: IUserDoc | LeanDocument<IUserDoc>;
}

//TODO: service for updating user

export async function getById(id: any): Promise<IResult> {
  const data = await User.findById(id).lean().exec();
  return !data
    ? { code: 404, error: { message: `User with id ${id} not found` } }
    : { code: 200, data };
}

export async function createUser(data: IUser) {
  const password = await bcrypt.hash(data.password, SALT_ROUNDS);
  return User.create({ ...data, password } as IUser);
}

export async function deleteUser(id: any): Promise<IResult> {
  const data = await User.findByIdAndRemove(id).exec();
  return !data
    ? { code: 404, error: { message: `User with id ${id} not found` } }
    : { code: 204, message: `User with id ${id} successfully deleted` };
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
