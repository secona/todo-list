import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Register } from './pages/register';
import { Index } from './pages/index';
import { Login } from './pages/login';

const App = () => {
  return (
    <>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Index} />
      </Switch>
    </>
  );
};

export default App;
