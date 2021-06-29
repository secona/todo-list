import * as React from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteTodo, FailedResponse, ITodo } from '../../../api/todo';
import { IconButton } from '../../../components/IconButton';

export interface TodoProps {
  todo: ITodo;
  removeTodo: (_id: string) => void;
  redirectTo: (path: string) => void;
  setTodoOpen: (todo: ITodo) => void;
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${p => p.theme.elevationColor['01dp']};
  padding: 0.5rem;
  color: white;
  border-radius: 0.3rem;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.elevationColor['02dp']};
  }
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Todo = ({
  todo,
  removeTodo,
  redirectTo,
  setTodoOpen,
  loading: [loading, setLoading],
}: TodoProps) => {
  const onClick = () => {
    setLoading(true);
    deleteTodo(todo._id)
      .then(() => removeTodo(todo._id))
      .catch((err: AxiosError<FailedResponse> | Error) => {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.error.message.includes('todo')) {
            return removeTodo(todo._id);
          }
        }
        localStorage.removeItem('login');
        redirectTo('/login');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper onClick={() => setTodoOpen(todo)}>
      <Title>{todo.title}</Title>
      <IconButton isSecondary onClick={onClick} disabled={loading}>
        <FaTrashAlt />
      </IconButton>
    </Wrapper>
  );
};
