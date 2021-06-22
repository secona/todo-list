import styled from 'styled-components';

export const Form = styled.form`
  background-color: rgba(255, 255, 255, 5%);
  padding: 3rem;
  border-radius: 0.5rem;

  & > *:not(:last-child) {
    margin-bottom: 0.3rem;
  }
`;
