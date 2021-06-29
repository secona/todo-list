import * as React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { newTodo, TodoValues, ITodo } from '../../../api/todo';
import { TextInput } from '../../../components/TextInput';
import { LinearLoading } from '../../../components/LinearLoading';

interface Props {
  afterCreation?: (todo: ITodo) => void;
}

export const NewTodoForm = ({ afterCreation }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TodoValues>();
  const history = useHistory();

  const onSubmit: SubmitHandler<TodoValues> = async value => {
    return newTodo(value)
      .then(res => afterCreation?.(res.data.data.todo!))
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
