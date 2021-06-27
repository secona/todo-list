import * as React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { TextInput } from '../../../components/TextInput';
import { LinearLoading } from '../../../components/LinearLoading';
import { ITodo } from '../../../types/index';
import { INewTodoResponse } from '../../../types/response';

interface Props {
  afterCreation?: (todo: ITodo) => void;
}

interface INewTodo {
  title: string;
}

export const NewTodoForm = ({ afterCreation }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<INewTodo>();
  const history = useHistory();

  const onSubmit: SubmitHandler<INewTodo> = async value => {
    const login = localStorage.getItem('login');
    if (!login) {
      history.push('/login');
      return;
    }

    const [id, token] = login.split(';');
    return axios
      .post<INewTodoResponse>(`/api/users/${id}/todos`, value, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(res => afterCreation?.(res.data.data))
      .catch(err => alert(err.message)) //TODO: handle error
      .finally(reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting && <LinearLoading />}
      <TextInput
        {...register('title', { required: true })}
        disabled={isSubmitting}
        placeholder='New Todo'
      />
    </form>
  );
};
