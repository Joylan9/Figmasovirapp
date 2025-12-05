import React from 'react';
import { Check } from 'lucide-react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 active:scale-95 min-h-[44px]"
      style={{
        backgroundColor: selected ? 'var(--token-color-chip-selected)' : 'var(--token-color-chip-bg)',
        color: selected ? 'var(--token-color-chip-selected-text)' : 'var(--token-color-chip-text)',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: 500,
        border: selected ? '2px solid var(--token-color-primary-500)' : '2px solid transparent',
        boxShadow: selected ? '0 0 0 4px rgba(77, 156, 255, 0.1)' : 'none',
      }}
      aria-pressed={selected}
      aria-label={`${selected ? 'Selected' : 'Select'} ${label}`}
    >
      {selected && <Check className="w-4 h-4" />}
      {label}
    </button>
  );
}
