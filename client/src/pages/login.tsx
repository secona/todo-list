import * as React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ILoginResponse } from '../types/response';

interface ILogin {
  email?: string;
  password?: string;
}

export const Login = () => {
  const [login, setLogin] = React.useState<ILogin>();
  const history = useHistory();

  React.useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) history.push('/');
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    console.log(login);
    axios.post<ILoginResponse>('/api/users/login', login).then(
      res => {
        localStorage.setItem('login', `${res.data.id};${res.data.data}`);
        history.push('/');
      },
      () => {
        setLogin({});
        alert('Login unsuccessful');
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={login?.email}
        placeholder='Email'
        onChange={e => setLogin({ ...login, email: e.target.value })}
      />
      <input
        type='password'
        value={login?.password}
        placeholder='Password'
        onChange={e => setLogin({ ...login, password: e.target.value })}
      />
      <input type='submit' value='Submit' />
    </form>
  );
};
