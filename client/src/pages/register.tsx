import * as React from 'react';
import { useHistory } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { IRegisterResponse, IErrorResponse } from '../types/response';

interface IRegister {
  name?: string;
  email?: string;
  password?: string;
}

export const Register = () => {
  const history = useHistory();
  const [submitting, setSubmitting] = React.useState(false);
  const [value, setValue] = React.useState<IRegister>();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setSubmitting(true);
    axios.post<IRegisterResponse>('/api/users/register', value).then(
      () => {
        localStorage.removeItem('login'); // clear login
        history.push('/login');
      },
      (err: AxiosError<IErrorResponse>) => {
        alert(err.message);
        setValue(undefined);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={value?.name}
        placeholder='Name'
        onChange={e => setValue({ ...value, name: e.target.value })}
      />
      <input
        type='text'
        value={value?.email}
        placeholder='Email'
        onChange={e => setValue({ ...value, email: e.target.value })}
      />
      <input
        type='password'
        value={value?.password}
        placeholder='Password'
        onChange={e => setValue({ ...value, password: e.target.value })}
      />
      <input type='submit' value='Register' />
      {submitting && <p>Submitting</p>}
    </form>
  );
};
