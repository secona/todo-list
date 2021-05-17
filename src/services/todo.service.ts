import Todo, { ITodo } from '../models/todo.model';
import User from '../models/user.model';

const todoServices = {
  async getAllUserTodos(userId: any) {
    const todos = await Todo.find({ owner: userId }).lean().exec();
    return todos;
  },

  async newTodo(userId: any, body: ITodo) {
    const user = await User.findById(userId);
    if (!user) return null;

    const todo = await new Todo({ ...body, owner: userId } as ITodo).save();
    user.todos.push(todo._id);
    user.save();

    return todo;
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
    const todo = await Todo.findById(todoId).exec();
    if (!todo || todo.owner.toString() !== userId) return null;

    await todo.delete();
    return true; // delete success!
  },
};

export default todoServices;
