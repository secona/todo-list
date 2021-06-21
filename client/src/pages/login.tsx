import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { FaEnvelope, FaKey, FaArrowRight } from 'react-icons/fa';
import { TextInput } from '../components/TextInput';
import { ContainerCenter } from '../components/ContainerCenter';
import { Button } from '../components/Button';
import { Form } from '../components/Form';

interface ILoginValues {
  email: string;
  password: string;
}

// TODO: integrate axios
export const Login = () => {
  const { register, handleSubmit } = useForm<ILoginValues>();
  const history = useHistory();

  React.useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) history.push('/');
  }, []);

  return (
    <ContainerCenter>
      <Form onSubmit={handleSubmit(v => console.log(v))}>
        <h1>Login</h1>
        <TextInput
          {...register('email', { required: true })}
          type='text'
          LeftIcon={FaEnvelope}
          placeholder='Email'
        />
        <TextInput
          {...register('password', { required: true })}
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
