import type { ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MenuPanelProps {
  /**
   * Optional pinned search bar (e.g. <MenuSearchBar>), rendered above the
   * scrollable list — stays fixed in place, doesn't scroll with the options.
   */
  searchBar?: ReactNode
  /** MenuGroup/MenuItem content — scrolls internally past ~5 items. */
  children: ReactNode
  className?: string
}

// Height of 5 MenuItem rows, derived from real tokens rather than a fixed
// pixel guess — same "derive, don't hardcode" approach as Button's 36px.
const FIVE_ITEMS_HEIGHT = 'calc((var(--inset-3) * 2 + var(--menu-item-line-height)) * 5)'

// ─── Component ────────────────────────────────────────────────────────────────

export function MenuPanel({ searchBar, children, className = '' }: MenuPanelProps) {
  return (
    <div
      // w-full, not shrink-to-fit — fills whatever width its container gives
      // it. Inside Dropdown that's the trigger's own width (see FieldWrapper's
      // panel slot); standalone usage needs an explicit-width wrapper.
      className={`flex flex-col w-full p-(--space-1) rounded-(--radius-sm) bg-(--bg-surface-base) overflow-hidden ${className}`}
      style={{
        border:    'var(--space-1) solid var(--border-surface-inverse)',
        boxShadow: 'var(--shadow-surface-md)',
      }}
    >
      {searchBar}
      <div className="overflow-y-auto" style={{ maxHeight: FIVE_ITEMS_HEIGHT }}>
        {children}
      </div>
    </div>
  )
}
