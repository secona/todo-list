import * as bcrypt from 'bcrypt';
import { LeanDocument } from 'mongoose';
import User, { IUser, IUserDoc } from '../models/user.model';
import Todo from '../models/todo.model';
import { SALT_ROUNDS } from '../constants';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import objectToString from '../utils/objectToString';

const userServices = {
  async getOne(
    filter: Partial<IUser> & { _id?: string },
    options: Partial<Record<'populate' | 'allowUnverified', boolean>> = {}
  ) {
    let query = User.findOne(filter).lean();
    if (options.populate) query = query.populate('todos');
    const data = await query.exec();

    if (!data)
      throw new NotFoundError(
        `User with ${objectToString(filter)} not found`
      );

    if (!options.allowUnverified && !data.verified)
      throw new ForbiddenError(`Email "${data.email}" is unverified`);

    return data;
  },

  async createUser(data: IUser) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    const value = User.filterAllowed(data);
    const user = new User(value);
    return user.save();
  },

  async updateUser(
    user: string | LeanDocument<IUserDoc>,
    update: Partial<IUser>,
    options: { directSetVerified?: boolean } = {}
  ) {
    if (typeof user === 'string') user = await this.getOne({ _id: user });

    if (!options.directSetVerified)
      update.verified = !update.email || user.email === update.email;
    if (update.password)
      update.password = await bcrypt.hash(update.password, SALT_ROUNDS);

    const value = User.filterAllowed(update);
    const data = await User.findByIdAndUpdate(
      user._id,
      { ...value, verified: update.verified },
      { new: true, omitUndefined: true }
    ).lean();
    return data;
  },

  async deleteUser(user: string | LeanDocument<IUserDoc>) {
    if (typeof user === 'string') user = await this.getOne({ _id: user });

    await Promise.all([
      User.deleteOne({ _id: user._id }),
      Todo.deleteMany({ owner: user._id }),
    ]);

    return true; //success!
  },

  /**
   * Check is email is taken.\
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
