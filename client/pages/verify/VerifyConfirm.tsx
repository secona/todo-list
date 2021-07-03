import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { confirm, VerifyResponse } from '../../api/verify';
import { ContainerCenter } from '../../components/ContainerCenter';
import { LinearLoading } from '../../components/LinearLoading';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export const VerifyConfirm = withRouter(props => {
  const [res, setRes] = React.useState<VerifyResponse | undefined>();

  React.useEffect(() => {
    confirm(props.location.search)
      .then(({ data }) => setRes(data))
      .catch(err => alert(err.message));
  }, []);

  if (!res) return <LinearLoading />;
  return (
    <ContainerCenter>
      <Card style={{ textAlign: 'center' }}>
        {res.success ? (
          <>
            <h1>Hurray!</h1>
            <p>
              You've successfully {res.message}. The only thing left to do is
              login!
            </p>
            <Button onClick={() => props.history.push('/login')}>
              I want to login!
            </Button>
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
