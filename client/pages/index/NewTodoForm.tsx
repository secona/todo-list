import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { newTodo, TodoValues, ITodo } from '../../api/todo';
import { useTodo } from './TodoContext';
import { TextInput } from '../../components/TextInput';
import { LinearLoading } from '../../components/LinearLoading';

export const NewTodoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<TodoValues>();
  const history = useHistory();
  const { create } = useTodo();

  const onSubmit: SubmitHandler<TodoValues> = async value => {
    try {
      const { data, status } = await newTodo(value);
      if (data.success) {
        return create(data.data.todo);
      }

      if (status === 422) {
        return data.error.details?.forEach(e => {
          setError(e.name, { message: e.msg });
        });
      }

      history.push('/login');
    } catch (e) {
      if (e.message === 'ERR_STORED_CREDENTIALS') {
        localStorage.removeItem('login');
        history.push('/login');
      } else alert(e.message);
    } finally {
      reset();
    }
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
