// /components/buttons/CustomButton.tsx
'use client';

import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { ReactNode } from 'react';

interface CustomButtonProps extends Omit<AntButtonProps, 'type'> {
  type?: 'primary' | 'secondary';
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function CustomButton({
  type = 'primary',
  icon,
  children,
  className = '',
  disabled = false,
  onClick,
  ...rest
}: CustomButtonProps) {
  const buttonClass = type === 'primary' ? 'button-save' : 'button-cancel';

  return (
    <AntButton
      type={type === 'primary' ? 'primary' : 'default'}
      icon={icon}
      className={`${buttonClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </AntButton>
  );
}