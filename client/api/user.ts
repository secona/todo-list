import axios, { AxiosRequestConfig } from 'axios';
import { ITodo } from './todo';

export interface IUser {
  _id: string;
  verified: boolean;
  todos: ITodo[];
  email: string;
  name: string;
  password: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface SuccessResponse {
  message?: string;
  data: { user: IUser | null };
}

export interface FailedResponse {
  message?: string;
  error: {
    statusCode: number;
    message: string;
    details: object;
    validationErrors?: {
      location: 'body' | 'cookies' | 'headers' | 'params' | 'query';
      param: string;
      value: any;
      msg: any;
    }[];
  };
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    id: string;
    token: string;
  };
}

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export const login = (data: LoginValues, config?: AxiosRequestConfig) =>
  axios.post<LoginResponse>('/api/users/login', data, config);

export const register = (data: RegisterValues, config?: AxiosRequestConfig) =>
  axios.post('/api/users/register', data);

export const get = (config?: AxiosRequestConfig) =>
  axios.get<SuccessResponse>('/api/users/:userId', config);
