import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Register } from './pages/register';
import { Index } from './pages/index';
import { Login } from './pages/login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Index} />
      </Switch>
    </Router>
  );
};

export default App;
