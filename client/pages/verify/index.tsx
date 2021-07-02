import * as React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { VerifyIndex } from './VerifyIndex';
import { VerifyConfirm } from './VerifyConfirm';

export const Verify = withRouter(props => {
  const {
    match: { path },
  } = props;

  return (
    <Switch>
      <Route exact path={path} component={VerifyIndex} />
      <Route path={`${path}/confirm`} component={VerifyConfirm} />
    </Switch>
  );
});
