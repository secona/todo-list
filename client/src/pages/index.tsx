import * as React from 'react';
import { useHistory } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';
import { Todo } from '../components/Todo';
import { Container } from '../components/Container';
import { IUser } from '../types/index';
import { IGetUserResponse } from '../types/response';

export const Index = () => {
  const history = useHistory();
  const [user, setUser] = React.useState<IUser>();

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
      res => setUser(res.data.data),
      () => history.push('/login')
    );
  }, [setUser]);

  const handleTodoDelete = (_id: string) => {
    if (user) {
      const idx = user.todos.findIndex(t => t._id === _id);
      const todos = user.todos.splice(idx, 1);
      setUser({ ...user, todos });
    }
  };

  return (
    <Container>
      {user?.todos.map(todo => (
        <Todo
          todo={todo}
          key={todo._id}
          afterDeletion={handleTodoDelete}
          handleError={() => history.push('/login')}
        />
      ))}
    </Container>
  );
};
