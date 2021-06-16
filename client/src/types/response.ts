import { IUser } from '.';

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

export interface IErrorResponse {
  error: {
    location: string;
    param: string;
    value: any;
    msg: any;
    message?: string;
  };
}
