import * as React from 'react';
import styled from 'styled-components';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { IconButton } from '../../../components/IconButton';
import { ITodo } from '../../../types/index';
import { IErrorResponse } from '../../../types/response';

export interface TodoProps {
  todo: ITodo;
  afterDeletion?: (_id: string) => void;
  handleError?: () => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background-color: ${p => p.theme.elevationColor['01dp']};
  padding: 0.5rem;
  margin-bottom: 0.2rem;
  color: white;
  border-radius: 0.3rem;
  align-items: center;
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
  padding-left: 0.55rem;
  flex-grow: 1;
  word-wrap: break-word;
`;

export const Todo = ({ todo, afterDeletion, handleError }: TodoProps) => {
  const handleDelete = () => {
    const token = localStorage.getItem('login')?.split(';')[1];
    const config: AxiosRequestConfig = {
      headers: { authorization: `Bearer ${token}` },
    };

    axios.delete(`/api/users/${todo.owner}/todos/${todo._id}`, config).then(
      () => afterDeletion?.(todo._id),
      ({ response }: AxiosError<IErrorResponse>) => {
        if (/^Todo.+not found$/.test(response?.data.error.message!))
          return afterDeletion?.(todo._id);
        handleError?.();
      }
    );
  };

  return (
    <Wrapper>
      <IconButton isSecondary onClick={handleDelete}>
        <FaTrashAlt />
      </IconButton>
      <Title>{todo.title}</Title>
    </Wrapper>
  );
};
