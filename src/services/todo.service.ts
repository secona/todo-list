import Todo, { ITodo } from '../models/todo.model';
import User from '../models/user.model';

// TODO: prevent user from setting unwanted fields such as `owner`
const todoServices = {
  async getAllUserTodos(userId: any) {
    const todos = await Todo.find({ owner: userId }).lean().exec();
    return todos;
  },

  async newTodo(userId: any, body: ITodo) {
    const newTodo = new Todo({ ...body, owner: userId } as ITodo);
    const user = await User.findByIdAndUpdate(userId, {
      $push: { todos: newTodo._id },
    });

    if (!user) return null;
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

    Object.assign(todo, body);
    const updated = await todo.save();
    return updated;
  },

  async deleteTodoById(todoId: any, userId: string) {
    const todo = await Todo.findByIdAndRemove(todoId).exec();
    if (!todo || todo.owner.toString() !== userId) return null;

    await User.findByIdAndUpdate(userId, { $pull: { todos: todoId } });
    return true; // delete success!
  },
};

export default todoServices;
