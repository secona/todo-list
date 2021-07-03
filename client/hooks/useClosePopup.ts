import { useRef, useEffect } from 'react';

export function useClosePopup<T extends HTMLElement>(cb: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) cb();
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cb();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keyup', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keyup', handleEscKey);
    };
  }, [cb]);

  return ref;
}
