import * as React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  elementId?: string;
}

export const Portal: React.FC<Props> = props =>
  createPortal(
    props.children,
    document.getElementById(props.elementId || 'portal')!
  );
