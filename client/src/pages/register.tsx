import * as React from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { FaEnvelope, FaKey, FaUser, FaArrowRight } from 'react-icons/fa';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { IRegisterResponse, IErrorResponse } from '../types/response';

interface IRegister {
  name?: string;
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

export const Register = () => {
  const history = useHistory();
  const [value, setValue] = React.useState<IRegister>();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    axios.post<IRegisterResponse>('/api/users/register', value).then(
      () => {
        localStorage.removeItem('login'); // clear login
        history.push('/login');
      },
      (err: AxiosError<IErrorResponse>) => {
        alert(err.message);
        setValue(undefined);
      }
    );
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h1>Register</h1>
      <TextInput
        type='text'
        value={value?.name}
        LeftIcon={FaUser}
        placeholder='Name'
        onChange={e => setValue({ ...value, name: e.target.value })}
      />
      <TextInput
        type='text'
        value={value?.email}
        LeftIcon={FaEnvelope}
        placeholder='Email'
        onChange={e => setValue({ ...value, email: e.target.value })}
      />
      <TextInput
        type='password'
        value={value?.password}
        LeftIcon={FaKey}
        placeholder='Password'
        onChange={e => setValue({ ...value, password: e.target.value })}
      />
      <Button type='submit' RightIcon={FaArrowRight}>
        Register
      </Button>
    </StyledForm>
  );
};
