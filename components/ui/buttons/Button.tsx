import React from 'react';
import { tailwindClasses } from '@/lib/theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = tailwindClasses.button.base;
  const variantClasses = tailwindClasses.button[variant];
  const sizeClasses = tailwindClasses.button.size[size];

  const combinedClassName = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  // If href is provided, render as link
  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
