import * as React from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteTodo, ITodo } from '../../api/todo';
import { useTodo } from './TodoContext';
import { IconButton } from '../../components/IconButton';
import { useHistory } from 'react-router-dom';

export interface TodoProps {
  todo: ITodo;
  setOpenedTodo: (todo: ITodo) => void;
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
  setOpenedTodo: setTodoOpen,
  loading: [loading, setLoading],
}: TodoProps) => {
  const { delete: removeTodo } = useTodo();
  const history = useHistory();

  const onClick = () => {
    setLoading(true);
    deleteTodo(todo._id)
      .then(({ data }) => {
        if (data.success || data.message === 'todo not found')
          return removeTodo(todo);
        localStorage.removeItem('login');
        history.push('/login');
      })
      .catch(e => {
        if (e.message === 'ERR_STORED_CREDENTIALS') {
          localStorage.removeItem('login');
          history.push('/login');
        } else alert(e.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper>
      <Title onClick={() => setTodoOpen(todo)}>{todo.title}</Title>
      <IconButton color='secondary' onClick={onClick} disabled={loading}>
        <FaTrashAlt />
      </IconButton>
    </Wrapper>
  );
};
