import axios, { AxiosRequestConfig } from 'axios';

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
  message?: string;
  data: { todo: ITodo | null };
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

export interface TodoValues {
  title: string;
  description?: string;
}

export const newTodo = (data: TodoValues, config?: AxiosRequestConfig) =>
  axios.post<SuccessResponse>('/api/users/:userId/todos', data, config);

export const deleteTodo = (todoId: string, config?: AxiosRequestConfig) =>
  axios.delete<SuccessResponse>(`/api/users/:userId/todos/${todoId}`, config);

export const patchTodo = (
  todoId: string,
  data: TodoValues,
  config?: AxiosRequestConfig
) =>
  axios.patch<SuccessResponse>(
    `/api/users/:userId/todos/${todoId}`,
    data,
    config
  );
