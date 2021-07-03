import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${props => props.theme.elevationColor['01dp']};
  min-width: 20rem;
  padding: 3rem;
  border-radius: 0.5rem;

  & > *:not(:last-child) {
    margin-bottom: 0.3rem;
  }
`;
