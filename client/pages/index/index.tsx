import * as React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';
import { Todo } from './components/Todo';
import { Header } from './components/Header';
import { Container } from '../../components/Container';
import { LinearLoading } from '../../components/LinearLoading';
import { IUser } from '../../types/index';
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

    const [id, token] = login!.split(';');
    const authorization = `Bearer ${token}`;
    const config: AxiosRequestConfig = { headers: { authorization } };

    axios.get<IGetUserResponse>(`/api/users/${id}?complete=1`, config).then(
      res => {
        setUser(res.data.data);
        setLoading(false);
      },
      () => history.push('/login')
    );
  }, [setUser]);

  // TODO: fix this
  const handleTodoDelete = (_id: string) => {
    if (user) {
      const idx = user.todos.findIndex(t => t._id === _id);
      const todos = user.todos.splice(idx, 1);
      setUser({ ...user, todos });
    }
  };

  return (
    <>
      {loading && <LinearLoading />}
      <Container>
        <Header />
        <div>
          {user?.todos.map(todo => (
            <Todo
              todo={todo}
              key={todo._id}
              afterDeletion={handleTodoDelete}
              handleError={() => history.push('/login')}
            />
          ))}
        </div>
      </Container>
    </>
  );
};
