import * as bcrypt from 'bcrypt';
import { LeanDocument } from 'mongoose';
import User, { IUser, IUserDoc } from '../models/user.model';
import Todo from '../models/todo.model';
import { SALT_ROUNDS } from '../constants';

const userServices = {
  /**
   * @param complete if true, it will populate the `todos` field
   */
  async getById(id: any, complete?: boolean) {
    let query = User.findById(id).lean();
    if (complete) query = query.populate('todos');
    const data = await query.exec();

    if (!data) return 'not-found';
    if (!data.verified) return 'not-verified';
    return data;
  },

  async createUser(data: IUser) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    const value = User.filterAllowed(data);
    const user = new User(value);
    return user.save();
  },

  async updateUser(
    id: any,
    user: LeanDocument<IUserDoc>,
    update: Partial<IUser>
  ) {
    update.verified = !update.email || user.email === update.email;
    if (update.password) {
      update.password = await bcrypt.hash(update.password, SALT_ROUNDS);
    }

    const value = User.filterAllowed(update);
    const data = await User.findByIdAndUpdate(id, value, {
      new: true,
      omitUndefined: true,
    }).lean();
    return data;
  },

  async deleteUser(id: any) {
    await User.deleteOne({ id }).exec();
    await Todo.deleteMany({ owner: id }).exec();
    return true; //success!
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
