import * as React from 'react';
import { Todo } from './Todo';
import { ITodo } from '../../../types/index';

interface Props {
  todos: ITodo[] | undefined;
  handleDelete: (_id: string) => void;
  handleError: () => void;
}

export const Todos = React.memo(
  ({ todos, handleDelete, handleError }: Props) => {
    return (
      <div>
        {todos?.map(todo => (
          <Todo
            todo={todo}
            key={todo._id}
            afterDeletion={handleDelete}
            handleError={handleError}
          />
        ))}
      </div>
    );
  }
);
