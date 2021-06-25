import * as React from 'react';
import styled from 'styled-components';
import { ContainerCenter } from './ContainerCenter';

export const Popup = styled(ContainerCenter)`
  position: fixed;
  z-index: 10;
  background-color: ${p => p.theme.elevationColor['00dp'] + 'df'};
  top: 0;
  left: 0;
`;
