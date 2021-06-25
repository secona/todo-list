import * as React from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

const Move = keyframes`
  0% { transform: translate(-100%, 0) }
  100% { transform: translate(calc(7/2 * 100%), 0) }
`;

const Negative = styled.div`
  z-index: 100;
  position: absolute;
  width: calc(100% * 2 / 7);
  height: 100%;
  display: flex;
  animation: ${Move} 2s linear infinite;
  background-color: ${props => props.theme.elevationColor['00dp']};
`;

const Bar = styled.div`
  z-index: 100;
  width: 100%;
  top: 0;
  height: 0.1rem;
  position: fixed;
  overflow: hidden;
  background-color: ${props => props.theme.primary.surface};
`;

export const LinearLoading = () =>
  createPortal(
    <Bar>
      <Negative />
    </Bar>,
    document.getElementById('portal')!
  );
