import * as React from 'react';
import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  LeftIcon?: IconType;
  RightIcon?: IconType;
}

interface WrapperProps {
  withLeftIcon?: boolean;
  withRightIcon?: boolean;
}

const WrapperLabel = styled.label<WrapperProps>`
  position: relative;
  margin-bottom: 0.2rem;

  & > svg {
    position: absolute;
    top: 0.5rem;

    &.input-lefticon {
      left: 0.5rem;
    }

    &.input-righticon {
      right: 0.5rem;
    }
  }

  & > input {
    border: none;
    border-radius: 0.3rem;
    background-color: #37474f;
    color: white;
    padding: 0.4rem;
    outline: none;

    ${props => props.withLeftIcon && 'padding-left: 2rem;'};
    ${props => props.withRightIcon && 'padding-right: 2rem;'};

    &:focus {
      box-shadow: 0 0 0 0.1rem #00b0ff;
    }
  }
`;

export const TextInput = ({ LeftIcon, RightIcon, ...rest }: Props) => {
  return (
    <WrapperLabel withLeftIcon={!!LeftIcon} withRightIcon={!!RightIcon}>
      <input {...rest} />
      {LeftIcon && <LeftIcon size={16} className='input-lefticon' />}
      {RightIcon && <RightIcon size={16} className='input-righticon' />}
    </WrapperLabel>
  );
};
