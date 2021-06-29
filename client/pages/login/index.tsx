import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { FaEnvelope, FaKey, FaArrowRight } from 'react-icons/fa';
import { login, FailedResponse, LoginValues } from '../../api/user';
import { TextInput } from '../../components/TextInput';
import { ContainerCenter } from '../../components/ContainerCenter';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { LinearLoading } from '../../components/LinearLoading';

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>();
  const history = useHistory();

  React.useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) history.push('/');
  }, []);

  const onSubmit: SubmitHandler<LoginValues> = async value => {
    return login(value)
      .then(({ data: { data } }) => {
        localStorage.setItem('login', `${data.id};${data.token}`);
        history.push('/');
      })
      .catch((err: AxiosError<FailedResponse> | Error) => {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            const message = err.response.data.error.message.toLowerCase();
            if (message.includes('email'))
              return setError('email', { message });
            if (message.includes('password'))
              return setError('password', { message });
            alert('An error occurred');
          } else console.log(err);
        }
      });
  };

  return (
    <ContainerCenter>
      {isSubmitting && <LinearLoading />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <TextInput
          {...register('email', { required: 'email is a required field' })}
          disabled={isSubmitting}
          error={errors.email}
          type='text'
          LeftIcon={FaEnvelope}
          placeholder='Email'
        />
        <TextInput
          {...register('password', {
            required: 'password is a required field',
          })}
          disabled={isSubmitting}
          error={errors.password}
          type='password'
          LeftIcon={FaKey}
          placeholder='Password'
        />
        <Button
          type='submit'
          RightIcon={FaArrowRight}
          disabled={isSubmitting}
          children='Login'
        />
      </Form>
    </ContainerCenter>
  );
};
