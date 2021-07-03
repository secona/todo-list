import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { send, VerifyResponse } from '../../api/verify';
import { ContainerCenter } from '../../components/ContainerCenter';
import { LinearLoading } from '../../components/LinearLoading';
import { Card } from '../../components/Card';

/** For sending verification email */
export const VerifyIndex = withRouter(props => {
  const [res, setRes] = React.useState<VerifyResponse | undefined>();

  React.useEffect(() => {
    send(props.location.search)
      .then(({ data }) => setRes(data))
      .catch(err => alert(err.message));
  }, []);

  if (!res) return <LinearLoading />;
  return (
    <ContainerCenter>
      <Card style={{ textAlign: 'center' }}>
        {res.success ? (
          <>
            <h1>Check your inbox!</h1>
            <p>
              We've sent a verification link to your email address! Click the
              link to continue.
            </p>
          </>
        ) : (
          <>
            <h1>Oops! Something went wrong.</h1>
            <p>{res.message}</p>
          </>
        )}
      </Card>
    </ContainerCenter>
  );
});
