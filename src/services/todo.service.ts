import Todo, { ITodo } from '../models/todo.model';
import User from '../models/user.model';

const todoServices = {
  async getAllUserTodos(userId: any) {
    const todos = await Todo.find({ owner: userId }).lean().exec();
    return todos;
  },

  async newTodo(userId: any, body: ITodo) {
    const newTodo = new Todo({ ...body, owner: userId } as ITodo);
    await User.updateOne({ id: userId }, { $push: { todos: newTodo._id } });
    return await newTodo.save();
  },

  async getTodoById(todoId: any, userId: string) {
    const todo = await Todo.findById(todoId).lean().exec();
    if (!todo || todo.owner.toString() !== userId) return null;
    return todo;
  },

  async updateTodoById(todoId: any, userId: string, body: Partial<ITodo>) {
    const todo = await Todo.findById(todoId).exec();
    if (!todo || todo.owner.toString() !== userId) return null;

    const value = Todo.filterAllowed(body);
    return await Todo.findByIdAndUpdate(todoId, value, {
      new: true,
      omitUndefined: true,
    }).lean();
  },

  async deleteTodoById(todoId: any, userId: string) {
    const todo = await Todo.findById(todoId).exec();
    if (!todo || todo.owner.toString() !== userId) return null;

    await todo.delete().exec();
    await User.updateOne({ id: userId }, { $pull: { todos: todoId } });
    return true; // delete success!
  },
};

export default todoServices;
