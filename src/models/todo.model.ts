import mongoose from 'mongoose';

export interface ITodo {
  owner: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
}

interface ITodoDoc extends ITodo, mongoose.Document {}

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
