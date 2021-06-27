import * as React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';
import { Todo } from './components/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { NewTodoForm } from './components/NewTodoForm';
import { Container } from '../../components/Container';
import { LinearLoading } from '../../components/LinearLoading';
import { IUser, ITodo } from '../../types/index';
import { IGetUserResponse } from '../../types/response';

export const Index = () => {
  const history = useHistory();
  const [user, setUser] = React.useState<IUser>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const login = localStorage.getItem('login');
    if (!login) {
      history.push('/login');
      return;
    }

    const [id, token] = login.split(';');
    const authorization = `Bearer ${token}`;
    const config: AxiosRequestConfig = { headers: { authorization } };

    axios.get<IGetUserResponse>(`/api/users/${id}?complete=1`, config).then(
      res => {
        setUser(res.data.data);
        setLoading(false);
      },
      () => history.push('/login')
    );
  }, [setUser, setLoading]);

  const postCreate = React.useCallback(
    (todo: ITodo) => {
      if (!user) return;
      const todos = [...user.todos, todo];
      setUser({ ...user, todos });
    },
    [user, setUser]
  );

  const removeTodo = React.useCallback(
    (_id: string) => {
      if (!user) return;
      const todos = user.todos.filter(todo => todo._id !== _id);
      setUser({ ...user, todos });
    },
    [user, setUser]
  );

  return (
    <>
      {loading && <LinearLoading />}
      <Container>
        <Header>Things to do</Header>
        <TodoList>
          <NewTodoForm afterCreation={postCreate} />
          {user?.todos.map(todo => (
            <Todo
              todo={todo}
              key={todo._id}
              loading={[loading, setLoading]}
              redirectTo={to => history.push(to)}
              removeTodo={removeTodo}
            />
          ))}
        </TodoList>
      </Container>
    </>
  );
};
