import Todo, { ITodo } from '../models/todo.model';
import User from '../models/user.model';
import { NotFoundError, ForbiddenError } from '../utils/errors';

const todoServices = {
  async getAllUserTodos(userId: any) {
    const todos = await Todo.find({ owner: userId }).lean().exec();
    return todos;
  },

  async newTodo(userId: any, body: ITodo) {
    const newTodo = new Todo({ ...body, owner: userId } as ITodo);
    const [savedTodo] = await Promise.all([
      newTodo.save(),
      User.updateOne({ _id: userId }, { $push: { todos: newTodo._id } }),
    ]);
    return savedTodo;
  },

  async getTodoById(todoId: any, userId: string) {
    const todo = await Todo.findById(todoId).lean().exec();
    if (!todo) throw new NotFoundError(`Todo with id "${todoId}" not found`);
    if (todo.owner.toString() !== userId)
      throw new ForbiddenError(
        `Todo with id "${todoId}" does not belong to user with id "${userId}"`
      );
    return todo;
  },

  async updateTodoById(todoId: any, body: Partial<ITodo>) {
    const value = Todo.filterAllowed(body);
    return await Todo.findByIdAndUpdate(todoId, value, {
      new: true,
      omitUndefined: true,
    }).lean();
  },

  async deleteTodoById(todoId: any, userId: string) {
    await Promise.all([
      Todo.deleteOne({ _id: todoId }),
      User.updateOne({ _id: userId }, { $pull: { todos: todoId } }),
    ]);
  },
};

export default todoServices;
