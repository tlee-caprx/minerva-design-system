import type { KeyboardEvent, MouseEvent, ReactNode, ThHTMLAttributes } from 'react'
import { Icon, InfoCircleIcon, SortIcon, type SortIconDirection } from '../Icon'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableHeadProps extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align' | 'children'> {
  /** Column label, or a control such as a select-all Checkbox */
  children?: ReactNode
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
  /** This column absorbs the table's leftover width. Mark at most one column; without it the table hugs its content. */
  grow?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TableHead({
  children,
  tooltip,
  sortable = false,
  sortDirection,
  onSort,
  align = 'left',
  grow = false,
  className = '',
  style,
  ...rest
}: TableHeadProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTableCellElement>) => {
    if (!sortable || e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSort?.()
    }
  }

  const stopPropagation = (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation()

  return (
    // The th itself is the sort trigger (aria-sort + tabIndex + keys) rather
    // than a nested button: the tooltip trigger below is focusable too, and
    // a focusable element inside a button is invalid nesting.
    <th
      {...rest}
      scope="col"
      data-grow={grow || undefined}
      tabIndex={sortable ? 0 : undefined}
      aria-sort={sortable ? (sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none') : undefined}
      onClick={sortable ? onSort : undefined}
      onKeyDown={handleKeyDown}
      style={style}
      className={[
        'p-(--inset-5) align-middle font-[inherit]',
        sortable ? 'cursor-pointer outline-none hover:bg-(--bg-control-subtle-hover) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--border-control-default-focus)' : '',
        className,
      ].join(' ')}
    >
      <div className={`flex items-center gap-(--inline-1) ${align === 'center' ? 'justify-center' : ''}`}>
        {/* Plain labels get header typography; anything else (e.g. a
            select-all Checkbox) renders as-is. */}
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text variant="body-md" weight="semibold" className="text-(--text-surface-base) whitespace-nowrap">
            {children}
          </Text>
        ) : (
          children
        )}

        {tooltip && (
          <Tooltip content={tooltip}>
            <span tabIndex={0} onClick={stopPropagation}>
              <Icon icon={InfoCircleIcon} size="small" className="text-(--icon-surface-base)" />
            </span>
          </Tooltip>
        )}

        {sortable && <SortIcon direction={sortDirection} width={14} height={14} className="shrink-0" />}
      </div>
    </th>
  )
}
