import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FaWrench, FaSignOutAlt } from 'react-icons/fa';
import { MenuProps } from '../../components/DropdownMenu';
import { Button } from '../../components/Button';

interface Props extends MenuProps {
  email: string;
}

const Wrapper = styled.div`
  background-color: ${p => p.theme.elevationColor['06dp']};
  z-index: 10;
  display: flex;
  flex-direction: column;
  border-radius: 0.3rem;

  & > p {
    font-size: smaller;
    margin: 0;
  }

  & > :not(:last-child) {
    margin-bottom: 0.2rem;
  }
`;

export const OptionsDropdown = ({ email, dRef, ...props }: Props) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('login');
    history.push('/login');
  };

  return (
    <Wrapper ref={dRef} {...props}>
      <Button
        color='transparent'
        onClick={() => history.push('/settings')}
        LeftIcon={FaWrench}
      >
        Settings
      </Button>
      <Button color='transparent' onClick={logout} LeftIcon={FaSignOutAlt}>
        Log out
      </Button>
    </Wrapper>
  );
};
