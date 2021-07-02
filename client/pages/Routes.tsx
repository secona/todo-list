import * as React from 'react';
import { Route } from 'react-router-dom';
import { Index } from './index';
import { Login } from './login';
import { Register } from './register';
import { Verify } from './verify';

export const Routes = () => (
  <>
    <Route path='/verify' component={Verify} />
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
    <Route exact path='/' component={Index} />
  </>
);
