import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FaEnvelope, FaKey, FaArrowRight } from 'react-icons/fa';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { ILoginResponse } from '../types/response';

interface ILogin {
  email?: string;
  password?: string;
}

const StyledForm = styled.form`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
    <StyledForm onSubmit={handleSubmit}>
      <h1>Login</h1>
      <TextInput
        type='text'
        value={login?.email}
        LeftIcon={FaEnvelope}
        placeholder='Email'
        onChange={e => setLogin({ ...login, email: e.target.value })}
      />
      <TextInput
        type='password'
        value={login?.password}
        LeftIcon={FaKey}
        placeholder='Password'
        onChange={e => setLogin({ ...login, password: e.target.value })}
      />
      <Button type='submit' RightIcon={FaArrowRight}>
        Login
      </Button>
    </StyledForm>
  );
};
