import type { ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabProps {
  label: string
  selected?: boolean
  onClick?: () => void
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Tab({ label, selected = false, onClick, leftSlot, rightSlot }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className="relative inline-flex items-center px-(--inset-1) py-(--inset-3) bg-(--bg-navigation-item-secondary-idle) cursor-pointer select-none whitespace-nowrap outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--border-navigation-primary-active)"
      style={{ border: 'none', boxShadow: 'inset 0 -2px 0 var(--border-surface-base)' }}
    >
      <span
        className={['px-(--inline-2) py-(--inset-1) rounded-(--radius-sm) transition-colors duration-150', !selected && 'hover:bg-(--bg-navigation-item-secondary-hover)'].filter(Boolean).join(' ')}
      >
        <span className="relative inline-flex items-center gap-(--inline-1)">
          {leftSlot}
          <span
            className="text-(--text-navigation-item-secondary-idle)"
            style={{
              fontSize:   'var(--menu-item-size)',
              lineHeight: 'var(--menu-item-line-height)',
              fontWeight: 'var(--menu-item-weight)',
            }}
          >
            {label}
          </span>
          {rightSlot}
        </span>
      </span>
      {selected && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-(--border-navigation-primary-active)" />}
    </button>
  )
}
