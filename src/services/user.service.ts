import * as bcrypt from 'bcrypt';
import authServices from './auth.service';
import User, { IUser } from '../models/user.model';
import Todo from '../models/todo.model';
import { SALT_ROUNDS } from '../constants';

const userServices = {
  /**
   * @param complete if true, it will populate the `todos` field
   */
  async getById(id: any, complete?: boolean) {
    let query = User.findById(id).lean();
    if (complete) query = query.populate('todos');
    return query.exec();
  },

  async createUser(data: IUser) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    const user = new User(data);
    return user.save();
  },

  async updateUser(id: any, update: Partial<IUser>) {
    if (update.password) {
      update.password = await bcrypt.hash(update.password, SALT_ROUNDS);
    }
    const data = await User.findByIdAndUpdate(id, update, { new: true })
      .lean()
      .exec();
    return data;
  },

  async deleteUser(id: any) {
    const data = await User.findByIdAndRemove(id).exec();
    if (!data) return null;

    await Todo.deleteMany({ owner: id }).exec();
    return data;
  },

  async generateToken(email: string, password: string) {
    const data = await User.findOne({ email }).lean().exec();
    if (!data) return null; // 404 - email not found

    const result = await bcrypt.compare(password, data.password);
    if (!result) return false; // 401 - incorrect password

    const id = data._id;
    const token = authServices.generateUserToken({ id, email, password });
    return token;
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
