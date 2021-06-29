import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { FaEnvelope, FaKey, FaUser, FaArrowRight } from 'react-icons/fa';
import {
  register as registerUser,
  FailedResponse,
  RegisterValues,
} from '../../api/user';
import { TextInput } from '../../components/TextInput';
import { ContainerCenter } from '../../components/ContainerCenter';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { LinearLoading } from '../../components/LinearLoading';

const schema: SchemaOf<RegisterValues> = object().shape({
  name: string().required(),
  email: string().email().required(),
  password: string().min(8).required(),
});

export const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const onSubmit: SubmitHandler<RegisterValues> = async value => {
    return registerUser(value)
      .then(() => history.push('/login')) // TODO: ask to verify email
      .catch((err: AxiosError<FailedResponse>) => {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            const validationErrs = err.response.data.error.validationErrors;
            if (validationErrs) {
              return validationErrs.forEach(e => {
                setError(e.param as keyof RegisterValues, { message: e.msg });
              });
            }
            alert('An error occurred');
          }
        }
      });
  };

  return (
    <ContainerCenter>
      {isSubmitting && <LinearLoading />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <TextInput
          {...register('name')}
          disabled={isSubmitting}
          error={errors.name}
          type='text'
          LeftIcon={FaUser}
          placeholder='Name'
        />
        <TextInput
          {...register('email')}
          disabled={isSubmitting}
          error={errors.email}
          type='text'
          LeftIcon={FaEnvelope}
          placeholder='Email'
        />
        <TextInput
          {...register('password')}
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
          children='Register'
        />
      </Form>
    </ContainerCenter>
  );
};
