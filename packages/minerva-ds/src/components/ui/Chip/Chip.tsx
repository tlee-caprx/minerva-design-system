import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Text } from '../Text'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode
  /** Toggled/active state */
  selected?: boolean
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Chip({ children, selected = false, className = '', ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={[
        'inline-flex items-center justify-center shrink-0',
        'py-(--inset-1) px-(--inset-5)',
        'rounded-(--radius-full)',
        'cursor-pointer transition-colors duration-150',
        'outline-none focus-visible:outline focus-visible:outline-2',
        'focus-visible:outline-offset-2 focus-visible:outline-(--border-control-default-focus)',
        selected
          ? [
              'bg-(--bg-control-inverse-idle)',
              'hover:bg-(--bg-control-inverse-hover)',
              'text-(--text-surface-inverse)',
            ].join(' ')
          : [
              'bg-(--bg-surface-base)',
              'text-(--text-surface-subtle)',
              'shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]',
              'hover:bg-(--bg-surface-subtle)',
              'hover:text-(--text-surface-base)',
              'hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-emphasis)]',
            ].join(' '),
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <Text as="span" variant="body-sm">
        {children}
      </Text>
    </button>
  )
}
