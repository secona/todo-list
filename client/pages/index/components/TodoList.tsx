import styled from 'styled-components';

export const TodoList = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 0.2rem;
  }
`;
