import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { send } from '../../api/verify';
import { ContainerCenter } from '../../components/ContainerCenter';
import { LinearLoading } from '../../components/LinearLoading';

/** For sending verification email */
export const VerifyIndex = withRouter(props => {
  const [msg, setMsg] = React.useState<string | undefined>();

  React.useEffect(() => {
    send(props.location.search)
      .then(({ data }) => setMsg(data.message))
      .catch(err => alert(err.message));
  }, []);

  if (!msg) return <LinearLoading />;
  return (
    <ContainerCenter>
      <p>{msg}</p>
    </ContainerCenter>
  );
});
