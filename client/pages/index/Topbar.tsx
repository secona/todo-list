import * as React from 'react';
import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';
import { IUser } from '../../api/user';
import { IconButton } from '../../components/IconButton';
import { DropdownMenu } from '../../components/DropdownMenu';

interface Props {
  user: IUser | undefined;
}

const Wrapper = styled.div`
  top: 0;
  position: fixed;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: ${p => p.theme.elevationColor['02dp']};

  * {
    margin: 0;
  }

  & > :not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Title = styled.p`
  flex-grow: 1;
  flex-shrink: 0;
`;

const Name = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const OptionButton = styled(IconButton)`
  padding: 0;
  background-color: rgba(255, 255, 255, 0);

  &:hover {
    background-color: rgba(255, 255, 255, 4%);
  }

  &:active {
    background-color: rgba(255, 255, 255, 12%);
  }
`;

const DropdownWrapper = styled.div`
  background-color: ${p => p.theme.elevationColor['06dp']};
  padding: 1rem;
  z-index: 10;
`;

export const Topbar = ({ user }: Props) => {
  return (
    <Wrapper>
      <Title>Todo List</Title>
      {user && (
        <>
          <Name>{user.name}</Name>
          <DropdownMenu<HTMLButtonElement>
            toggler={({ toggle, togglerRef }) => (
              <OptionButton onClick={toggle} ref={togglerRef}>
                <FaCog />
              </OptionButton>
            )}
            children={({ dRef, ...props }) => (
              <DropdownWrapper ref={dRef} {...props}>
                Hello
              </DropdownWrapper>
            )}
          />
        </>
      )}
    </Wrapper>
  );
};
