import { CallbackError, UpdateQuery } from 'mongoose';
import * as bcrypt from 'bcrypt';
import User, { IUserDoc, IUser } from '../models/user.model';
import { SALT_ROUNDS } from '../constants';

interface IResult {
  code: number;
  message?: string;
  error?: CallbackError | { message: string };
  data?: IUserDoc;
}

//TODO: service for updating user

export function getById(id: any) {
  return new Promise<IResult>((resolve, reject) => {
    User.findById(id).exec((error, data) => {
      if (!data) {
        return resolve({
          code: 404,
          error: { message: `User with id ${id} not found` },
        });
      }

      if (error) return reject(error);
      return resolve({ code: 200, data });
    });
  });
}

export function deleteUser(id: any) {
  return new Promise<IResult>((resolve, reject) => {
    User.findByIdAndRemove(id).exec((error, data) => {
      if (!data) {
        return resolve({
          code: 404,
          error: { message: `User with id ${id} not found` },
        });
      }

      if (error) return reject(error);
      return resolve({
        code: 200,
        message: `User with id ${id} successfully deleted`,
      });
    });
  });
}

/** run `new User()` with hashed password */
export async function createUser(data: IUser) {
  return bcrypt
    .hash(data.password, SALT_ROUNDS)
    .then(password => Promise.resolve(new User({ ...data, password } as IUser)))
    .catch(error => Promise.reject(error));
}

export function isCorrectPassword(email: string, password: string) {
  return new Promise<IResult | boolean>((resolve, reject) => {
    User.findOne({ email }, undefined, undefined, (error, data) => {
      if (!data)
        return resolve({
          code: 404,
          error: { message: `User with email ${email} not found` },
        });
      if (error) return reject(error);

      const result = bcrypt.compareSync(password, data.password);
      resolve(result);
    });
  });
}
