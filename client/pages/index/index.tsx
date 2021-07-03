import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { get, IUser } from '../../api/user';
import { ITodo } from '../../api/todo';
import { TodoContext } from './TodoContext';
import { Todo } from './Todo';
import { TodoList } from './TodoList';
import { TodoInfo } from './TodoInfo';
import { Header } from './Header';
import { NewTodoForm } from './NewTodoForm';
import { Container } from '../../components/Container';
import { LinearLoading } from '../../components/LinearLoading';

export const Index = withRouter(props => {
  const { history } = props;
  const [user, setUser] = React.useState<IUser>();
  const [loading, setLoading] = React.useState(true);
  const [openedTodo, setOpenedTodo] = React.useState<ITodo | null>(null);

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

  const todoFunctions = React.useMemo(
    () => ({
      create: (todo: ITodo) => {
        if (!user) return;
        const todos = [...user.todos, todo];
        setUser({ ...user, todos });
      },

      delete: (todo: ITodo) => {
        if (!user) return;
        const todos = user.todos.filter(t => t._id !== todo._id);
        setUser({ ...user, todos });
      },

      update: (todo: ITodo) => {
        if (!user) return;
        const todos = [...user.todos];
        const idx = todos.findIndex(t => t._id === todo._id);
        todos[idx] = todo;
        setUser({ ...user, todos });
      },
    }),
    [user, setUser]
  );

  return (
    <TodoContext.Provider value={todoFunctions}>
      {loading && <LinearLoading />}
      {openedTodo && <TodoInfo openedTodo={[openedTodo, setOpenedTodo]} />}
      <Container>
        <Header>Things to do</Header>
        <TodoList>
          <NewTodoForm />
          {user?.todos.map(todo => (
            <Todo
              todo={todo}
              key={todo._id}
              loading={[loading, setLoading]}
              setOpenedTodo={setOpenedTodo}
            />
          ))}
        </TodoList>
      </Container>
    </TodoContext.Provider>
  );
});
