import mongoose from 'mongoose';

export interface ITodo {
  title: string;
  description?: string;
}

interface ITodoDoc extends ITodo, mongoose.Document {}

// TODO: service and controller for todos
const TodoSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

/** This model contain todo */
const Todo = mongoose.model<ITodoDoc>('Todo', TodoSchema);
export default Todo;
