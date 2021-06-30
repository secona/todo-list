import axios, { AxiosRequestConfig } from 'axios';
import { ErrorField } from './shared/errors';
import { fetchWithToken } from './shared/instances';

export interface ITodo {
  _id: string;
  owner: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SuccessResponse {
  success: true;
  message?: string;
  data: { todo: ITodo };
}

export interface FailedResponse {
  success: false;
  message?: string;
  error: ErrorField;
}

export type TodoResponse = SuccessResponse | FailedResponse;

export interface TodoValues {
  title: string;
  description?: string;
}

export const newTodo = (data: TodoValues, config?: AxiosRequestConfig) =>
  fetchWithToken.post<TodoResponse>('/api/users/:userId/todos', data, config);

export const deleteTodo = (todoId: string, config?: AxiosRequestConfig) =>
  fetchWithToken.delete<TodoResponse>(
    `/api/users/:userId/todos/${todoId}`,
    config
  );

export const patchTodo = (
  todoId: string,
  data: TodoValues,
  config?: AxiosRequestConfig
) =>
  fetchWithToken.patch<TodoResponse>(
    `/api/users/:userId/todos/${todoId}`,
    data,
    config
  );
