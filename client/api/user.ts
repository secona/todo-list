import axios, { AxiosRequestConfig } from 'axios';
import { ITodo } from './todo';
import { ErrorField } from './shared/errors';
import { fetchWithToken } from './shared/instances';

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
  success: true;
  message?: string;
  data: { user: IUser };
}

export interface FailedResponse {
  success: false;
  message?: string;
  error: ErrorField;
}

export type UserResponse = SuccessResponse | FailedResponse;

export interface LoginValues {
  email: string;
  password: string;
}

export interface SuccessLoginResponse {
  success: true;
  data: {
    id: string;
    token: string;
  };
}

export type LoginResponse = SuccessLoginResponse | FailedResponse;

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export const login = (data: LoginValues, config?: AxiosRequestConfig) =>
  axios.post<LoginResponse>('/api/users/login', data, config);

export const register = (data: RegisterValues, config?: AxiosRequestConfig) =>
  axios.post<UserResponse>('api/users/register', data);

export const get = (config?: AxiosRequestConfig) =>
  fetchWithToken.get<UserResponse>('/api/users/:userId', config);
