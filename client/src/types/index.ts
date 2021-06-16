export interface ITodo {
  _id: string;
  owner: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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
