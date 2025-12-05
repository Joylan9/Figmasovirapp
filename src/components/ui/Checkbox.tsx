import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  label: string;
  onChange?: () => void;
  animated?: boolean;
}

export default function Checkbox({ checked, label, onChange, animated = false }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group min-h-[44px]">
      <div
        className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
          checked 
            ? 'bg-gradient-to-r from-[var(--token-color-primary-500)] to-[var(--token-color-primary-600)] border-transparent' 
            : 'border-default bg-surface-card group-hover:border-strong'
        } ${animated && checked ? 'animate-[bounce_0.3s_ease-in-out]' : ''}`}
        style={{
          minWidth: '20px',
          minHeight: '20px',
        }}
      >
        {checked && (
          <Check 
            className="w-3.5 h-3.5 text-white" 
            strokeWidth={3}
          />
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        aria-checked={checked}
      />
      <span className="text-secondary" style={{ fontSize: '14px', lineHeight: '20px' }}>
        {label}
      </span>
    </label>
  );
}
