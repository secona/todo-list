import { LeanDocument } from 'mongoose';
import Todo, { ITodo, ITodoDoc } from '../models/todo.model';
import User, { IUserDoc } from '../models/user.model';
import userServices from './user.service';
import { BaseError } from '../utils/errors';
import objectToString from '../utils/objectToString';

const todoServices = {
  async getAllUserTodos(user: string | LeanDocument<IUserDoc> | IUserDoc) {
    if (typeof user === 'string')
      user = await userServices.getOne({ _id: user });

    const todos = await Todo.find({ owner: user._id }).lean().exec();
    return todos;
  },

  async newTodo(user: string | LeanDocument<IUserDoc> | IUserDoc, body: ITodo) {
    if (typeof user === 'string')
      user = await userServices.getOne({ _id: user });

    const { _id } = user;
    const newTodo = new Todo({ ...body, owner: _id } as ITodo);
    const [savedTodo] = await Promise.all([
      newTodo.save(),
      User.updateOne({ _id }, { $push: { todos: newTodo._id } }),
    ]);
    return savedTodo;
  },

  async getOneTodo(
    filter: Partial<
      Omit<ITodo, 'owner'> & { _id: string; owner: ITodo['owner'] | string }
    >
  ) {
    const todo = await Todo.findOne(filter).lean().exec();
    if (!todo)
      throw new BaseError({
        statusCode: 404,
        message: `Todo with ${objectToString(filter)} not found`,
      });
    return todo;
  },

  async updateTodo(
    todo: string | LeanDocument<ITodoDoc> | ITodoDoc,
    body: Partial<ITodo>
  ) {
    if (typeof todo === 'string') todo = await this.getOneTodo({ _id: todo });

    const value = Todo.filterAllowed(body);
    return await Todo.findByIdAndUpdate(todo._id, value, {
      new: true,
      omitUndefined: true,
    }).lean();
  },

  async deleteTodo(todo: string | LeanDocument<ITodoDoc> | ITodoDoc) {
    if (typeof todo === 'string') todo = await this.getOneTodo({ _id: todo });

    const { _id: todoId, owner: userId } = todo;
    await Promise.all([
      Todo.deleteOne({ _id: todoId }),
      User.updateOne({ _id: userId }, { $pull: { todos: todoId } }),
    ]);
  },
};

export default todoServices;
