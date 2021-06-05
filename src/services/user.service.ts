import * as bcrypt from 'bcrypt';
import { LeanDocument } from 'mongoose';
import User, { IUser, IUserDoc, IUserAllowed } from '../models/user.model';
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
      throw new NotFoundError(`User with ${objectToString(filter)} not found`);

    if (!options.allowUnverified && !data.verified)
      throw new ForbiddenError(`Email "${data.email}" is unverified`);

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

  isEmailAvailable(email: string, id?: any) {
    return User.findOne({ email }).then(data => {
      if (data && data._id.toString() !== id) {
        return Promise.reject('Email is already in use');
      }
    });
  },
};

export default userServices;
