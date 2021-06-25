import * as React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Popup } from '../../../components/Popup';
import { Form } from '../../../components/Form';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { LinearLoading } from '../../../components/LinearLoading';
import { ITodo } from '../../../types/index';
import { INewTodoResponse } from '../../../types/response';

interface Props {
  afterCreation?: (todo: ITodo) => void;
  onClickOutside?: () => void;
}

interface INewTodo {
  title: string;
  description?: string;
}

export const NewTodoForm = ({ afterCreation, onClickOutside }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<INewTodo>();
  const history = useHistory();
  const ref = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    const handleClick = (ev: MouseEvent) => {
      if (!(ref.current as any).contains(ev.target))
        onClickOutside?.();
    };

    const handleKeyUp = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClickOutside?.();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [ref.current]);

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
      .catch(err => alert(err.message)); //TODO: handle error
  };

  return (
    <Popup>
      {isSubmitting && <LinearLoading />}
      <Form ref={ref} onSubmit={handleSubmit(onSubmit)}>
        <h1>New Todo</h1>
        <TextInput
          {...register('title', { required: 'title is a required field' })}
          disabled={isSubmitting}
          error={errors.title}
          placeholder='Title'
        />
        <TextInput
          {...register('description')}
          disabled={isSubmitting}
          error={errors.description}
          placeholder='Description'
        />
        <Button type='submit' disabled={isSubmitting}>
          Create
        </Button>
      </Form>
    </Popup>
  );
};
