import * as React from 'react';
import styled from 'styled-components';
import { ContainerCenter } from './ContainerCenter';

export interface PopupProps extends React.ComponentPropsWithoutRef<'div'> {
  close?: () => void;
}

const BackgroundTint = styled(ContainerCenter)`
  position: fixed;
  z-index: 10;
  background-color: ${p => p.theme.elevationColor['00dp'] + 'df'};
  top: 0;
  left: 0;
`;

export const Popup = ({ close, ...props }: PopupProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close?.();
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close?.();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keyup', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keyup', handleEsc);
    };
  }, [close]);

  return (
    <BackgroundTint>
      <div {...props} ref={ref} />
    </BackgroundTint>
  );
};
