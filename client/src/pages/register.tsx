import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEnvelope, FaKey, FaUser, FaArrowRight } from 'react-icons/fa';
import { TextInput } from '../components/TextInput';
import { ContainerCenter } from '../components/ContainerCenter';
import { Button } from '../components/Button';
import { IRegisterResponse, IValidationErrorResponse } from '../types/response';

interface IRegister {
  name?: string;
  email?: string;
  password?: string;
}

export const Register = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IRegister>();

  const onSubmit: SubmitHandler<IRegister> = async value => {
    axios.post<IRegisterResponse>('/api/users/register', value).then(
      () => {
        localStorage.removeItem('login'); // clear login
        history.push('/login');
      },
      (err: AxiosError<IValidationErrorResponse>) => {
        const errors = err.response?.data.error;
        // TODO: handle validation errors
        errors?.forEach(error => {
          if (['name', 'email', 'password'].includes(error.param))
            setError(error.param as keyof IRegister, {
              type: 'validate',
              message: error.msg,
            });
        });
      }
    );
  };

  return (
    <ContainerCenter>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <TextInput
          {...register('name', { required: true })}
          LeftIcon={FaUser}
          placeholder='Name'
        />
        <TextInput
          {...register('email', { required: true })}
          LeftIcon={FaEnvelope}
          placeholder='Email'
        />
        <TextInput
          {...register('password', { required: true, minLength: 8 })}
          type='password'
          LeftIcon={FaKey}
          placeholder='Password'
        />
        <Button type='submit' RightIcon={FaArrowRight}>
          Register
        </Button>
        {/* TODO: implement validation feedback */}
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </form>
    </ContainerCenter>
  );
};
