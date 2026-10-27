import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react'
import { Icon, InfoCircleIcon, SortIcon, type SortIconDirection } from '../Icon'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableCellHeaderProps {
  label: string
  /** Info icon after the label, with a Tooltip on hover/focus */
  tooltip?: string
  /** Whole cell becomes a click/keyboard sort trigger */
  sortable?: boolean
  /** Current sort direction — omit for unsorted (both chevrons idle-colored) */
  sortDirection?: SortIconDirection
  /** Called when the header is clicked/activated — cycle unsorted → asc → desc → unsorted yourself */
  onSort?: () => void
  /** Match this to the column's body alignment — center for checkbox/radio/action/tag columns */
  align?: 'left' | 'center'
  className?: string
  /** Used by Table to explicitly place this cell in its grid — not for consumer use */
  style?: CSSProperties
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TableCellHeader({
  label,
  tooltip,
  sortable = false,
  sortDirection,
  onSort,
  align = 'left',
  className = '',
  style,
}: TableCellHeaderProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!sortable) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSort?.()
    }
  }

  const stopPropagation = (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation()

  return (
    // role="columnheader" always (this is a table header cell); sortable
    // interactivity is layered on top via aria-sort + tabIndex + key
    // handling rather than a separate role="button" — a button role can't
    // coexist with columnheader, and it previously left the tooltip
    // trigger below as a focusable element nested inside a button-role
    // container, which assistive tech treats as invalid nesting.
    <div
      role="columnheader"
      tabIndex={sortable ? 0 : undefined}
      aria-sort={sortable ? (sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none') : undefined}
      onClick={sortable ? onSort : undefined}
      onKeyDown={handleKeyDown}
      style={style}
      className={[
        'flex items-center gap-(--inline-1)',
        align === 'center' ? 'justify-center' : '',
        'p-(--inset-5) bg-(--bg-surface-base)',
        sortable ? 'cursor-pointer outline-none hover:bg-(--bg-control-subtle-hover)' : '',
        className,
      ].join(' ')}
    >
      <Text variant="body-md" weight="semibold" className="text-(--text-surface-base) whitespace-nowrap">
        {label}
      </Text>

      {tooltip && (
        <Tooltip content={tooltip}>
          <span tabIndex={0} onClick={stopPropagation}>
            <Icon icon={InfoCircleIcon} size="small" className="text-(--icon-surface-base)" />
          </span>
        </Tooltip>
      )}

      {sortable && <SortIcon direction={sortDirection} width={14} height={14} className="shrink-0" />}
    </div>
  )
}
