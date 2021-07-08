import * as React from 'react';
import { Portal } from './Portal';

interface TogglerProps<TToggler> {
  toggle: () => void;
  togglerRef: React.RefObject<TToggler>;
}

interface ChildProps extends React.ComponentPropsWithoutRef<'div'> {
  dRef: (el: HTMLDivElement | null) => void;
}

interface Props<TToggler> {
  toggler: (p: TogglerProps<TToggler>) => JSX.Element;
  children: (p: ChildProps) => JSX.Element;
}

function getPosition(
  toggler?: DOMRect,
  dropdown?: DOMRect
): React.CSSProperties {
  if (toggler && dropdown)
    return {
      left:
        toggler.left + dropdown.width > window.innerWidth
          ? toggler.right - dropdown.width
          : toggler.left,
      top:
        toggler.bottom + dropdown.height > window.innerHeight
          ? toggler.top - dropdown.height
          : toggler.bottom,
    };

  return {};
}

export const DropdownMenu = <TToggler extends HTMLElement>(
  props: Props<TToggler>
) => {
  const togglerRef = React.useRef<TToggler>(null);
  const [open, setOpen] = React.useState(false);
  const [dRef, setDRef] = React.useState<HTMLDivElement | null>(null); // dropdown ref
  const toggle = () => setOpen(!open);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!dRef?.contains(e.target as Node)) setOpen(false);
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keyup', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keyup', handleEscKey);
    };
  }, [dRef, setOpen]);

  const onSetDRef = React.useCallback(
    (el: HTMLDivElement | null) => el && setDRef(el),
    [setDRef]
  );

  return (
    <>
      <props.toggler toggle={toggle} togglerRef={togglerRef} />
      {open && (
        <Portal>
          <props.children
            dRef={onSetDRef}
            style={{
              position: 'fixed',
              ...getPosition(
                togglerRef.current?.getBoundingClientRect(),
                dRef?.getBoundingClientRect()
              ),
            }}
          />
        </Portal>
      )}
    </>
  );
};
