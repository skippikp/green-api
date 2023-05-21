import React, { FC, PropsWithChildren } from 'react';
import './Button.scss';

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export const Button: FC<PropsWithChildren<Props>> = ({onClick, disabled, children}) => {
  return (
    <button disabled={disabled} onClick={onClick} className={"btn"}>
      {children}
    </button>
  )
}

export default Button