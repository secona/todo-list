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

  async getTodoById(todoId: any) {
    const todo = Todo.findById(todoId).lean().exec();
    return todo;
  },

  async updateTodoById(todoId: any, body: ITodo) {
    const todo = await Todo.findByIdAndUpdate(todoId, body, { new: true })
      .lean()
      .exec();
    return todo;
  },

  async deleteTodoById(todoId: any) {
    const data = await Todo.findByIdAndRemove(todoId);
    return data;
  },
};

export default todoServices;
