import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type IButton = {
  className?: string;
  children: ReactNode;
  size?: 'small' | 'normal' | 'big';
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'size' | 'children'
>;

// Omit Button attr 的 className & size & children

export function Button({
  className,
  children,
  size = 'normal',
  ...props
}: IButton) {
  return (
    <button className={clsx(className, styles.root, styles[size])} {...props}>
      {children}
    </button>
  );
}

export default Button;
