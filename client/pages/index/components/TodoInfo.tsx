import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { patchTodo, ITodo } from '../../../api/todo';
import { useClosePopup } from '../../../hooks/useClosePopup';
import { LinearLoading } from '../../../components/LinearLoading';
import { TextInput } from '../../../components/TextInput';
import { TextArea } from '../../../components/TextArea';
import { Button } from '../../../components/Button';

interface Props {
  todo: ITodo;
  closePopup: () => void;
  redirectTo: (to: string) => void;
  updateTodo: (todo: ITodo) => void;
}

interface TodoValues {
  title: string;
  description?: string;
}

const Backdrop = styled.div`
  background-color: ${p => p.theme.elevationColor['00dp'] + 'df'};
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
`;

const Container = styled.div`
  background-color: ${p => p.theme.elevationColor['01dp']};
  position: absolute;
  bottom: 0;
  min-width: 100vw;
  min-height: 60vh;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 2rem;
`;

export const TodoInfo = ({
  todo,
  closePopup,
  redirectTo,
  updateTodo,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TodoValues>({
    defaultValues: { ...todo },
  });
  const ref = useClosePopup<HTMLDivElement>(closePopup);

  const onSubmit: SubmitHandler<TodoValues> = async value => {
    return patchTodo(todo._id, value)
      .then(({ data: { data } }) => {
        updateTodo(data.todo!);
        closePopup();
      })
      .catch(err => alert(err.message));
  };

  return (
    <Backdrop>
      {isSubmitting && <LinearLoading />}
      <Container ref={ref}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register('title', { required: true })}
            placeholder='Title'
            error={errors.title}
            disabled={isSubmitting}
          />
          <TextArea
            {...register('description')}
            rows={10}
            placeholder='Description'
            disabled={isSubmitting}
          />
          <Button type='submit' disabled={isSubmitting}>
            Save &amp; Exit
          </Button>
        </form>
      </Container>
    </Backdrop>
  );
};