import { IUser } from '.';

export interface ILoginResponse {
  id: string;
  data: string;
}

export interface IGetUserResponse {
  data: IUser;
}
