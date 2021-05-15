import { CallbackError, LeanDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import User, { IUserDoc, IUser } from '../models/user.model';

interface IResult {
  code: number;
  message?: string;
  error?: CallbackError | { message: string };
  data?: IUserDoc | LeanDocument<IUserDoc>;
}

// TODO: improve return type
const userServices = {
  async getById(id: any): Promise<IResult> {
    const data = await User.findById(id).lean().exec();
    return !data
      ? { code: 404, error: { message: `User with id ${id} not found` } }
      : { code: 200, data };
  },

  async createUser(data: IUser) {
    const user = new User(data);
    return user.save();
  },

  async updateUser(id: any, update: Partial<IUser>): Promise<IResult> {
    const data = await User.findById(id).exec();
    if (!data)
      return { code: 404, error: { message: `User with id ${id} not found` } };

    Object.assign(data, update);

    const saved = await data.save();
    return { code: 200, data: saved };
  },

  async deleteUser(id: any): Promise<IResult> {
    const data = await User.findByIdAndRemove(id).exec();
    return !data
      ? { code: 404, error: { message: `User with id ${id} not found` } }
      : { code: 200, message: `User with id ${id} successfully deleted` };
  },

  async isCorrectPassword(
    email: string,
    password: string
  ): Promise<404 | [boolean, LeanDocument<IUserDoc>]> {
    const data = await User.findOne({ email }).lean().exec();
    if (!data) return 404;

    const compareWith = data.password;
    const result = await bcrypt.compare(password, compareWith);
    return [result, data];
  },

  /**
   * Won't throw an error if the provided email is the
   * same as the email associated with the provided id
   */
  isEmailAvailable(email: string, id?: any) {
    return User.findOne({ email }).then(data => {
      if (data && data._id.toString() !== id) {
        return Promise.reject('Email is already in use');
      }
    });
  },
};

export default userServices;
