import * as React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';
import { Todo } from './components/Todo';
import { TodoList } from './components/TodoList';
import { TodoInfo } from './components/TodoInfo';
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
  const [todoOpen, setTodoOpen] = React.useState<ITodo | null>(null);

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

  const updateTodo = React.useCallback(
    (newTodo: ITodo) => {
      if (!user) return;
      const todos = [...user.todos];
      const idx = todos.findIndex(todo => todo._id === newTodo._id);
      todos[idx] = newTodo;
      setUser({ ...user, todos });
    },
    [user, setUser]
  );

  return (
    <>
      {loading && <LinearLoading />}
      {todoOpen && (
        <TodoInfo
          todo={todoOpen}
          updateTodo={updateTodo}
          redirectTo={to => history.push(to)}
          closePopup={() => setTodoOpen(null)}
        />
      )}
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
              setTodoOpen={setTodoOpen}
              removeTodo={removeTodo}
            />
          ))}
        </TodoList>
      </Container>
    </>
  );
};
