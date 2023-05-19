import { MouseEventHandler, ReactNode } from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  className?:string;
  variant?: 'primary' | 'secondary' | 'outline' | 'clean' ;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export const Button = ({ className, variant = 'primary', children, onClick }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className ? className : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};
