import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { confirm } from '../../api/verify';
import { ContainerCenter } from '../../components/ContainerCenter';

export const VerifyConfirm = withRouter(props => {
  const [msg, setMsg] = React.useState<string | undefined>();

  React.useEffect(() => {
    confirm(props.location.search)
      .then(({ data }) => setMsg(data.message))
      .catch(err => alert(err.message));
  }, []);

  return (
    <ContainerCenter>
      <p>{msg}</p>
    </ContainerCenter>
  );
});
