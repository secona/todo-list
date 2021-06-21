import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { FaEnvelope, FaKey, FaArrowRight } from 'react-icons/fa';
import { TextInput } from '../components/TextInput';
import { ContainerCenter } from '../components/ContainerCenter';
import { Button } from '../components/Button';
import { Form } from '../components/Form';
import { ILoginResponse, IErrorResponse } from '../types/response';

interface ILoginValues {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginValues>();
  const history = useHistory();

  React.useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) history.push('/');
  }, []);

  const onSubmit: SubmitHandler<ILoginValues> = value => {
    axios.post<ILoginResponse>('/api/users/login', value).then(
      ({ data }) => {
        localStorage.setItem('login', `${data.id};${data.data}`);
        history.push('/');
      },
      ({ response }: AxiosError<IErrorResponse>) => {
        const message = response?.data.error.message.toLowerCase();
        if (message?.includes('email')) return setError('email', { message });
        if (message?.includes('password'))
          return setError('password', { message });
        alert('An error occurred');
      }
    );
  };

  return (
    <ContainerCenter>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <TextInput
          {...register('email', { required: 'email is a required field' })}
          error={errors.email}
          type='text'
          LeftIcon={FaEnvelope}
          placeholder='Email'
        />
        <TextInput
          {...register('password', {
            required: 'password is a required field',
          })}
          error={errors.password}
          type='password'
          LeftIcon={FaKey}
          placeholder='Password'
        />
        <Button type='submit' RightIcon={FaArrowRight}>
          Login
        </Button>
      </Form>
    </ContainerCenter>
  );
};
