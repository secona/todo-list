import * as React from 'react';
import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaKey, FaUser, FaArrowRight } from 'react-icons/fa';
import { TextInput } from '../components/TextInput';
import { ContainerCenter } from '../components/ContainerCenter';
import { Button } from '../components/Button';
import { Form } from '../components/Form';

interface IRegisterValues {
  name: string;
  email: string;
  password: string;
}

const schema: SchemaOf<IRegisterValues> = object().shape({
  name: string().required(),
  email: string().email().required(),
  password: string().min(8).required(),
});

// TODO: validation feedback
export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterValues>({
    resolver: yupResolver(schema),
  });

  return (
    <ContainerCenter>
      <Form onSubmit={handleSubmit(v => console.log(v))}>
        <h1>Register</h1>
        <TextInput
          {...register('name')}
          error={errors.name}
          type='text'
          LeftIcon={FaUser}
          placeholder='Name'
        />
        <TextInput
          {...register('email')}
          error={errors.email}
          type='text'
          LeftIcon={FaEnvelope}
          placeholder='Email'
        />
        <TextInput
          {...register('password')}
          error={errors.password}
          type='password'
          LeftIcon={FaKey}
          placeholder='Password'
        />
        <Button type='submit' RightIcon={FaArrowRight}>
          Register
        </Button>
      </Form>
    </ContainerCenter>
  );
};
