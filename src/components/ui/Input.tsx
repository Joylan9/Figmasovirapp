import React, { forwardRef } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  showPasswordToggle = false,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const inputType = showPasswordToggle && showPassword ? 'text' : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-primary" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          className={`w-full px-4 py-3.5 rounded-xl bg-surface-card text-primary border transition-all duration-200 min-h-[48px] ${
            error 
              ? 'border-[var(--token-color-error-500)] focus:border-[var(--token-color-error-500)]' 
              : isFocused 
                ? 'border-focus' 
                : 'border-default hover:border-strong'
          } focus:outline-none ${showPasswordToggle ? 'pr-12' : ''} ${className}`}
          style={{
            fontSize: '16px',
            lineHeight: '24px',
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary hover:text-secondary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={0}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div 
          className="flex items-start gap-1.5 mt-2 text-[var(--token-color-error-500)]" 
          style={{ fontSize: '12px', lineHeight: '16px' }}
          id={`${props.id}-error`}
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p 
          className="mt-2 text-tertiary" 
          style={{ fontSize: '12px', lineHeight: '16px' }}
          id={`${props.id}-helper`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
