import * as React from 'react';
import { Route } from 'react-router-dom';
import { Index } from './index';
import { Login } from './login';
import { Register } from './register';

export const Routes = () => (
  <>
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
    <Route path='/' component={Index} />
  </>
);
