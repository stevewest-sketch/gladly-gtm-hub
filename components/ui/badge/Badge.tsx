import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-[#F3F3F3] text-[#0D0D0D]',
    success: 'bg-[#009B00] text-white',
    warning: 'bg-[#F97316] text-white',
    error: 'bg-[#DC2626] text-white',
    info: 'bg-[#3B82F6] text-white',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[12px] leading-[16px]',
    md: 'px-3 py-1 text-[13px] leading-[20px]',
    lg: 'px-4 py-1.5 text-[15px] leading-[24px]',
  };

  return (
    <span
      className={`inline-block rounded font-semibold ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
