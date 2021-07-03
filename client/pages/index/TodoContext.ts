import { createContext, useContext } from 'react';
import { ITodo } from '../../api/todo';

export interface ITodoContext
  extends Record<'create' | 'update' | 'delete', (todo: ITodo) => void> {}

export const TodoContext = createContext<ITodoContext>({
  create: _ => console.warn('no context provided'),
  update: _ => console.warn('no context provided'),
  delete: _ => console.warn('no context provided'),
});

export const useTodo = () => useContext(TodoContext);
