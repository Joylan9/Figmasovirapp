import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'lg',
  icon,
  fullWidth = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-3 transition-all duration-[160ms] font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.96]';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[var(--token-color-primary-500)] to-[var(--token-color-primary-600)] text-white hover:shadow-[var(--token-shadow-button-hover)]',
    secondary: 'bg-surface-elevated text-primary border border-default hover:bg-surface-card',
    outline: 'bg-transparent text-primary border border-default hover:bg-surface-card',
    ghost: 'bg-transparent text-secondary hover:bg-surface-card',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 rounded-lg min-h-[36px]',
    md: 'px-5 py-3 rounded-xl min-h-[44px]',
    lg: 'px-6 py-4 rounded-[16px] min-h-[56px]',
  };

  const shadowStyle = variant === 'primary' ? {
    boxShadow: 'var(--token-shadow-button-primary)',
  } : {};

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={shadowStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
