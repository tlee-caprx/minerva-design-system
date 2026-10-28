import {
  Children, createContext, useContext, useEffect, useRef, useState,
  type CSSProperties, type HTMLAttributes, type KeyboardEvent, type ReactNode,
} from 'react'

// Structure follows shadcn/ui's Table (MIT): thin wrappers around real
// <table> elements. Styling is Minerva's; the selector-based parts (striping,
// pinned columns, scroll shadows) live in src/styles/table.css.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableProps {
  /** TableHeader and TableBody */
  children: ReactNode
  /** Pins the first column so it stays visible when the table scrolls horizontally. A last column of type="action" cells is always pinned. */
  stickyFirstColumn?: boolean
  /** Pagination rendered above the table, separated by a 1px gridline */
  paginationTop?: ReactNode
  /** Pagination rendered below the table, separated by a 1px gridline */
  paginationBottom?: ReactNode
  className?: string
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode
  /** Makes the row a click target: pointer cursor, hover fill, Enter/Space to activate. Clicks on link, action, checkbox and radio cells don't trigger it. */
  onClick?: () => void
  /** Full-width area shown under the row while `expanded` is true */
  detail?: ReactNode
  /** Shows `detail` under the row */
  expanded?: boolean
}

// ─── Context ──────────────────────────────────────────────────────────────────

// Rows in a <thead> skip click/expand behavior; rows in a <tbody> get it.
const SectionContext = createContext<'head' | 'body'>('body')

// ─── Table ────────────────────────────────────────────────────────────────────

export function Table({
  children,
  stickyFirstColumn = false,
  paginationTop,
  paginationBottom,
  className = '',
}: TableProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const [scrolledStart, setScrolledStart] = useState(false)
  const [scrolledEnd, setScrolledEnd] = useState(false)
  const [visibleWidth, setVisibleWidth] = useState<number>()

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setScrolledStart(el.scrollLeft > 0)
    // 1px tolerance for sub-pixel rounding at the end of scroll.
    setScrolledEnd(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
    setVisibleWidth(el.clientWidth)
  }

  useEffect(() => {
    const scrollEl = scrollRef.current
    const tableEl = tableRef.current
    if (!scrollEl || !tableEl) return
    updateScrollState()
    // The scroll box (e.g. a sidebar collapsing) and the table's content
    // width (e.g. a row expanding) change independently, so watch both.
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(scrollEl)
    observer.observe(tableEl)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`minerva-table-frame flex flex-col max-w-full rounded-(--radius-sm) overflow-hidden ${className}`}
      style={{ border: 'var(--space-1) solid var(--border-surface-base)' }}
    >
      {paginationTop}
      {paginationTop && <div className="h-(--space-1) bg-(--border-surface-base)" />}

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="w-full overflow-x-auto"
        // Detail rows pin their content to this width so it stays in view
        // while the columns scroll sideways.
        style={visibleWidth ? ({ '--table-visible-width': `${visibleWidth}px` } as CSSProperties) : undefined}
      >
        <table
          ref={tableRef}
          className="minerva-table"
          data-sticky-first={stickyFirstColumn || undefined}
          data-scrolled-start={scrolledStart || undefined}
          data-scrolled-end={scrolledEnd || undefined}
        >
          {children}
        </table>
      </div>

      {paginationBottom && <div className="h-(--space-1) bg-(--border-surface-base)" />}
      {paginationBottom}
    </div>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────

export function TableHeader({ children, ...rest }: TableHeaderProps) {
  return (
    <SectionContext.Provider value="head">
      <thead {...rest}>{children}</thead>
    </SectionContext.Provider>
  )
}

export function TableBody({ children, ...rest }: TableBodyProps) {
  return (
    <SectionContext.Provider value="body">
      <tbody {...rest}>{children}</tbody>
    </SectionContext.Provider>
  )
}

// ─── Row ──────────────────────────────────────────────────────────────────────

export function TableRow({ children, onClick, detail, expanded = false, className = '', onKeyDown, ...rest }: TableRowProps) {
  const section = useContext(SectionContext)
  const clickable = section === 'body' && !!onClick

  const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
    onKeyDown?.(e)
    // Only when the row itself is focused, not a button or input inside it.
    if (!clickable || e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <>
      <tr
        {...rest}
        data-row=""
        data-clickable={clickable || undefined}
        aria-expanded={section === 'body' && detail !== undefined ? expanded : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? onClick : undefined}
        onKeyDown={handleKeyDown}
        className={[
          clickable ? 'cursor-pointer outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--border-control-default-focus)' : '',
          className,
        ].join(' ')}
      >
        {children}
      </tr>

      {section === 'body' && expanded && detail !== undefined && (
        <tr data-detail="">
          <td colSpan={Children.toArray(children).length} className="p-0">
            <div className="sticky left-0 w-(--table-visible-width) p-(--inset-5)">{detail}</div>
          </td>
        </tr>
      )}
    </>
  )
}
