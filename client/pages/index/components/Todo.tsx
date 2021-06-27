import * as React from 'react';
import styled from 'styled-components';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { IconButton } from '../../../components/IconButton';
import { ITodo } from '../../../types/index';
import { IErrorResponse } from '../../../types/response';

export interface TodoProps {
  todo: ITodo;
  removeTodo: (_id: string) => void;
  redirectTo: (path: string) => void;
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
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
  flex-grow: 1;
  word-wrap: break-word;
`;

export const Todo = ({
  todo,
  removeTodo,
  redirectTo,
  loading: [loading, setLoading],
}: TodoProps) => {
  const deleteTodo = () => {
    setLoading(true);
    const token = localStorage.getItem('login')?.split(';')[1];
    const cfg: AxiosRequestConfig = {
      headers: { authorization: `Bearer ${token}` },
    };

    axios
      .delete(`/api/users/${todo.owner}/todos/${todo._id}`, cfg)
      .then(() => removeTodo(todo._id))
      .catch(({ response }: AxiosError<IErrorResponse>) => {
        if (response?.data.error.message.match(/^Todo.+not found$/))
          return removeTodo(todo._id);
        localStorage.removeItem('login');
        redirectTo('/login');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper>
      <Title>{todo.title}</Title>
      <IconButton isSecondary onClick={deleteTodo} disabled={loading}>
        <FaTrashAlt />
      </IconButton>
    </Wrapper>
  );
};
