import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const Move = keyframes`
  0% { transform: translate(-100%, 0) }
  100% { transform: translate(calc(7/2 * 100%), 0) }
`;

const Negative = styled.div`
  position: absolute;
  width: calc(100% * 2 / 7);
  height: 100%;
  display: flex;
  animation: ${Move} 2s linear infinite;
  background-color: ${props => props.theme.elevationColor['00dp']};
`;

const Bar = styled.div`
  width: 100%;
  top: 0;
  height: 0.1rem;
  position: fixed;
  overflow: hidden;
  background-color: ${props => props.theme.primary.surface};
`;

export const LinearLoading = () => (
  <Bar>
    <Negative />
  </Bar>
);
