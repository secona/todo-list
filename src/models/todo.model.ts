import mongoose from 'mongoose';

export interface ITodoAllowed {
  title: string;
  description?: string;
}

export interface ITodo extends ITodoAllowed {
  owner: mongoose.Schema.Types.ObjectId;
}

export interface ITodoDoc extends ITodo, mongoose.Document {}

export interface ITodoModel extends mongoose.Model<ITodoDoc> {
  filterAllowed(obj: ITodo | Partial<ITodo>): object;
}

const TodoSchema = new mongoose.Schema<ITodoDoc>(
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

TodoSchema.statics.filterAllowed = function (obj: ITodo | Partial<ITodo>) {
  const { title, description } = obj;
  return { title, description } as ITodoAllowed;
};

/** This model contain todo */
const Todo = mongoose.model<ITodoDoc, ITodoModel>('Todo', TodoSchema);
export default Todo;
