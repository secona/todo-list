import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { get, IUser } from '../../api/user';
import { ITodo } from '../../api/todo';
import { Todo } from './components/Todo';
import { TodoList } from './components/TodoList';
import { TodoInfo } from './components/TodoInfo';
import { Header } from './components/Header';
import { NewTodoForm } from './components/NewTodoForm';
import { Container } from '../../components/Container';
import { LinearLoading } from '../../components/LinearLoading';

export const Index = () => {
  const history = useHistory();
  const [user, setUser] = React.useState<IUser>();
  const [loading, setLoading] = React.useState(true);
  const [todoOpen, setTodoOpen] = React.useState<ITodo | null>(null);

  React.useEffect(() => {
    get({ params: { complete: true } })
      .then(({ data }) => {
        if (data.success) {
          setUser(data.data.user);
          setLoading(false);
        } else history.push('/login');
      })
      .catch(e => {
        if (e.message === 'ERR_STORED_CREDENTIALS') {
          localStorage.removeItem('login');
          return history.push('/login');
        } else alert(e.message);
      });
  }, []);

  const addTodo = React.useCallback(
    (todo: ITodo) => {
      if (!user) return;
      const todos = [...user.todos, todo];
      setUser({ ...user, todos });
    },
    [user, setUser]
  );

  const removeTodo = React.useCallback(
    (tbr: ITodo) => {
      if (!user) return;
      const todos = user.todos.filter(todo => todo._id !== tbr._id);
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
          removeTodo={removeTodo}
        />
      )}
      <Container>
        <Header>Things to do</Header>
        <TodoList>
          <NewTodoForm addTodo={addTodo} />
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
