import * as React from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteTodo, ITodo } from '../../api/todo';
import { IconButton } from '../../components/IconButton';

export interface TodoProps {
  todo: ITodo;
  removeTodo: (todo: ITodo) => void;
  redirectTo: (path: string) => void;
  setTodoOpen: (todo: ITodo) => void;
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${p => p.theme.elevationColor['01dp']};
  padding: 0.5rem;
  color: white;
  border-radius: 0.3rem;
  align-items: center;
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
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
      .then(({ data }) => {
        if (data.success) return removeTodo(todo);
        if (data.message === 'todo not found') return removeTodo(todo);
        localStorage.removeItem('login');
        redirectTo('/login');
      })
      .catch(e => {
        if (e.message === 'ERR_STORED_CREDENTIALS') {
          localStorage.removeItem('login');
          redirectTo('/login');
        } else alert('asdfsadfasdf' + e.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper>
      <Title onClick={() => setTodoOpen(todo)}>{todo.title}</Title>
      <IconButton isSecondary onClick={onClick} disabled={loading}>
        <FaTrashAlt />
      </IconButton>
    </Wrapper>
  );
};
