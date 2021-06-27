import { IUser, ITodo } from '.';

export interface ILoginResponse {
  id: string;
  data: string;
}

export interface IGetUserResponse {
  data: IUser;
}

export interface IRegisterResponse {
  data: IUser;
}

export interface INewTodoResponse {
  data: ITodo;
}

export interface IPatchTodoResponse {
  data: ITodo;
}

export interface IValidationErrorResponse {
  error: {
    location: string;
    param: string;
    value: any;
    msg: any;
  }[];
}

export interface IErrorResponse {
  error: {
    message: string;
  };
}
