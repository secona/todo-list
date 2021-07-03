import * as React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { patchTodo, ITodo } from '../../api/todo';
import { useTodo } from './TodoContext';
import { useClosePopup } from '../../hooks/useClosePopup';
import { LinearLoading } from '../../components/LinearLoading';
import { TextInput } from '../../components/TextInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';

interface Props {
  openedTodo: [ITodo, React.Dispatch<React.SetStateAction<ITodo | null>>];
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
  openedTodo: [openedTodo, setOpenedTodo],
}: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TodoValues>({ defaultValues: openedTodo });
  const close = () => setOpenedTodo(null);
  const ref = useClosePopup<HTMLDivElement>(close);
  const { update, delete: deleteTodo } = useTodo();
  const history = useHistory();

  const onSubmit: SubmitHandler<TodoValues> = async value => {
    try {
      const { data, status } = await patchTodo(openedTodo._id, value);
      if (data.success) {
        update(data.data.todo);
        return close();
      }

      switch (status) {
        case 404:
          if (data.message === 'todo not found') {
            deleteTodo(openedTodo);
            return close();
          }
        case 422:
          return data.error.details?.forEach(e => {
            setError(e.name, { message: e.msg });
          });
        default:
          localStorage.removeItem('login');
          history.push('/login');
      }
    } catch (e) {
      if (e.message === 'ERR_STORED_CREDENTIALS') {
        localStorage.removeItem('login');
        history.push('/login');
      } else alert(e.message);
    }
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
