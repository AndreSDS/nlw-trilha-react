import { ButtonHTMLAttributes } from "react";

import './button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({isOutlined = false, ...rest}: ButtonProps) {

  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...rest} />
  );
}
