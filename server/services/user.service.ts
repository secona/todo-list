import * as bcrypt from 'bcrypt';
import { LeanDocument } from 'mongoose';
import User, { IUser, IUserDoc, IUserAllowed } from '../models/user.model';
import Todo from '../models/todo.model';
import { SALT_ROUNDS } from '../constants';
import { BaseError } from '../utils/errors';
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
      throw new BaseError({
        statusCode: 404,
        message: `User with ${objectToString(filter)} not found`,
        type: 'resource',
        details: [
          {
            name: 'user',
            msg: `User with ${objectToString(filter)} not found`,
          },
        ],
      });

    if (!options.allowUnverified && !data.verified)
      throw new BaseError({
        statusCode: 403,
        message: `Email "${data.email}" is unverified`,
        type: 'resource',
        details: [
          {
            name: 'email',
            msg: 'email is already verified',
            value: data.email,
          },
        ],
      });

    return data;
  },

  async populateLean(data: LeanDocument<IUserDoc>) {
    return User.populate(data, 'todos');
  },

  async createUser(data: IUserAllowed) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    data = User.filterAllowed(data);
    const user = new User(data);
    return user.save();
  },

  async updateUser(
    user: string | LeanDocument<IUserDoc> | IUserDoc,
    update: Partial<IUserAllowed>
  ): Promise<LeanDocument<IUserDoc>> {
    if (typeof user === 'string') user = await this.getOne({ _id: user });

    const value = {
      ...User.filterAllowed(update),
      verified: !update.email || user.email === update.email,
      password:
        update.password && (await bcrypt.hash(update.password, SALT_ROUNDS)),
    };

    return User.findByIdAndUpdate(user._id, value, {
      new: true,
      omitUndefined: true,
    }).lean();
  },

  async deleteUser(
    user: string | LeanDocument<IUserDoc> | IUserDoc
  ): Promise<LeanDocument<IUserDoc> | IUserDoc> {
    if (typeof user === 'string') user = await this.getOne({ _id: user });

    await Promise.all([
      User.deleteOne({ _id: user._id }),
      Todo.deleteMany({ owner: user._id }),
    ]);

    return user; //success!
  },

  async markVerified(user: string | LeanDocument<IUserDoc> | IUserDoc) {
    if (typeof user === 'string')
      user = await this.getOne({ _id: user }, { allowUnverified: true });
    return User.findByIdAndUpdate(user._id, { verified: true }, { new: true })
      .lean()
      .exec();
  },

  /**
   * @param user user's email or document
   * @param password user's plain text (aka non-hashed) password
   */
  async isPasswordCorrect(
    user: string | LeanDocument<IUserDoc> | IUserDoc,
    password: any
  ) {
    if (typeof user === 'string') user = await this.getOne({ email: user });
    const result = await bcrypt.compare(password, user.password);
    if (!result)
      throw new BaseError({
        statusCode: 401,
        message: 'Password incorrect',
        type: 'auth',
        details: [{ name: 'password', msg: 'Password incorrect' }],
      });
    return result;
  },

  isEmailAvailable(email: string, id?: any) {
    return User.findOne({ email }).then(data => {
      if (data && data._id.toString() !== id) {
        return Promise.reject('Email is already in use');
      }
    });
  },
};

export default userServices;
