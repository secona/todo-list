import * as React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { IGetUserResponse } from '../types/response';

export const Index = () => {
  const history = useHistory();
  const [user, setUser] = React.useState<IGetUserResponse>();

  React.useEffect(() => {
    const login = localStorage.getItem('login');
    if (!login) return history.push('/login');

    const [id, token] = login!.split(';');
    const authorization = `Bearer ${token}`;

    axios
      .get<IGetUserResponse>(`/api/users/${id}?complete=true`, {
        headers: { authorization },
      })
      .then(res => {
        if (res.status === 200) setUser(res.data);
        else history.push('/login');
      })
      .catch(err => alert(err.message));
  }, [setUser]);

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={() => {
          localStorage.removeItem('login');
          history.push('/login');
        }}
      >
        Logout
      </button>
    </>
  );
};
