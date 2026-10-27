import {
  cloneElement, isValidElement, useEffect, useRef, useState,
  type CSSProperties, type KeyboardEvent, type ReactElement, type ReactNode,
} from 'react'
import type { TableCellProps } from './TableCell'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableProps {
  /** Number of equal-width columns, or an explicit grid-template-columns value for custom widths */
  columns: number | string
  /** Header row — one TableCellHeader per column, in column order */
  header: ReactNode[]
  /** Body rows — each inner array is one row's TableCell elements, in column order. `odd`/`hoverable` are injected automatically. */
  rows: ReactNode[][]
  /** Pins the first column so it stays visible when the table scrolls horizontally — an actual per-table choice, unlike the last column below */
  stickyFirstColumn?: boolean
  /** When provided, rows become click targets (pointer cursor + hover) */
  onRowClick?: (rowIndex: number) => void
  /** Pagination rendered above the table, separated by a 1px gridline */
  paginationTop?: ReactNode
  /** Pagination rendered below the table, separated by a 1px gridline */
  paginationBottom?: ReactNode
  className?: string
}

// ─── Sticky column classes ──────────────────────────────────────────────────────

const STICKY_FIRST_BASE = 'sticky left-0 z-10'
const STICKY_LAST_BASE = 'sticky right-0 z-10'

// Outer (not inset) shadows — they cast simply and unambiguously in the
// stated direction, unlike inset shadows where the visible edge is the
// opposite of the offset sign. A sticky-left column needs its shadow
// falling to its right (over the content scrolling underneath); sticky-right
// needs it falling left. Only shown while there's actually more content
// hidden on that side — not at rest, and not once scrolled all the way.
const SHADOW_RIGHT = 'shadow-[var(--shadow-table-outer-right)]'
const SHADOW_LEFT = 'shadow-[var(--shadow-table-outer-left)]'

// The trailing-edge border is painted on every real sticky cell directly —
// not on the shadow overlay. A solid, unblurred border composes perfectly
// edge-to-edge between stacked cells (each cell owns exactly its own 1px),
// so unlike the blurred shadow it never needed the single-overlay trick to
// avoid seams. Keeping it on the overlay instead was the bug: relying on a
// separate synthetic layer for something the real cells can just render
// themselves is more fragile, not less.
const BORDER_RIGHT: CSSProperties = { borderRight: 'var(--space-1) solid var(--border-surface-base)' }
const BORDER_LEFT: CSSProperties = { borderLeft: 'var(--space-1) solid var(--border-surface-base)' }

function withClass(el: ReactElement<{ className?: string }>, extra: string) {
  const existing = el.props.className ?? ''
  return [existing, extra].filter(Boolean).join(' ')
}

// ─── Component ────────────────────────────────────────────────────────────────

// Gridlines are a gap-and-bleed-through trick, not literal per-cell borders:
// the grid container's own background (border-surface-base) shows through a
// 1px gap between every cell, giving perfectly uniform lines everywhere
// without the double-border problem adjacent bordered cells would cause.
export function Table({
  columns,
  header,
  rows,
  stickyFirstColumn = false,
  onRowClick,
  paginationTop,
  paginationBottom,
  className = '',
}: TableProps) {
  const gridTemplateColumns = typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns
  const columnCount = header.length
  const lastColIndex = columnCount - 1
  // +2: one line for the header row, one for the 1-indexed-to-line-count offset.
  const lastRowLine = rows.length + 2

  if (import.meta.env.DEV) {
    if (typeof columns === 'number' && columns !== header.length) {
      console.warn(`Table: columns=${columns} but header has ${header.length} cell(s) — every cell is explicitly grid-placed by column index, so a mismatch leaves columns without a header or headers off the grid.`)
    }
    rows.forEach((rowCells, rowIndex) => {
      if (rowCells.length !== columnCount) {
        console.warn(`Table: row ${rowIndex} has ${rowCells.length} cell(s) but the header defines ${columnCount} — cells are placed by index, so this row will be misaligned.`)
      }
    })
  }

  // Not a prop — an action-typed last column is always sticky once the table
  // scrolls, it's not a per-table preference the way the first column is.
  // Checked against the first row since a column's type is expected to be
  // consistent all the way down.
  const firstRowLastCell = rows[0]?.[lastColIndex]
  const stickyLastColumn =
    isValidElement<TableCellProps>(firstRowLastCell) && firstRowLastCell.props.type === 'action'

  const scrollRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    // 1px tolerance for sub-pixel rounding at the end of scroll.
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    const scrollEl = scrollRef.current
    const gridEl = gridRef.current
    if (!scrollEl || !gridEl) return
    updateScrollState()
    // Two separate elements matter here: the scroll container's own box can
    // change size (e.g. a sidebar collapsing) independently of the inner
    // grid's content-driven width (e.g. a cell's text growing), and either
    // one can change canScrollLeft/Right without the other moving. A plain
    // `window.resize` listener catches neither case unless it happens to
    // coincide with an actual window resize.
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(scrollEl)
    observer.observe(gridEl)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, header.length, rows.length])

  // Combine rather than early-return: with a single column, index 0 and
  // lastColIndex are the same cell, so a sticky-first and an auto-detected
  // sticky-last can both be true at once. Returning on the first match would
  // silently drop the other side's treatment instead of applying both.
  const stickyClassFor = (index: number) => {
    const classes: string[] = []
    if (stickyFirstColumn && index === 0) classes.push(STICKY_FIRST_BASE)
    if (stickyLastColumn && index === lastColIndex) classes.push(STICKY_LAST_BASE)
    return classes.join(' ')
  }

  const stickyBorderFor = (index: number): CSSProperties | undefined => {
    let border: CSSProperties | undefined
    if (stickyFirstColumn && index === 0) border = { ...border, ...BORDER_RIGHT }
    if (stickyLastColumn && index === lastColIndex) border = { ...border, ...BORDER_LEFT }
    return border
  }

  return (
    <div
      className={`flex flex-col w-full rounded-(--radius-sm) overflow-hidden ${className}`}
      style={{ border: 'var(--space-1) solid var(--border-surface-base)' }}
    >
      {paginationTop}
      {paginationTop && <div className="h-(--space-1) bg-(--border-surface-base)" />}

      {/* Horizontal scroll for when the columns' natural widths exceed the
          container. w-full so the table always fills its parent even when
          content is narrower — flexible columns (e.g. minmax(_, 1fr) in the
          columns string) absorb any extra width. */}
      <div ref={scrollRef} onScroll={updateScrollState} className="w-full overflow-x-auto">
        {/* Every cell (header, body, and the two shadow overlays) gets an
            EXPLICIT grid-column/grid-row rather than relying on auto-flow.
            The shadow overlays intentionally span every row in one column —
            mixing that explicit placement with auto-flowed siblings makes
            the browser route the auto-flowed cells around the "occupied"
            column entirely (a real CSS Grid gotcha), scrambling the whole
            layout. Explicit placement for everything sidesteps it, since
            explicitly-placed items are allowed to intentionally overlap. */}
        <div ref={gridRef} role="table" className="grid gap-(--space-1) bg-(--border-surface-base)" style={{ gridTemplateColumns }}>
          {/* Shadow-only now — the gridline moved to a real border painted on
              each sticky cell below (see BORDER_RIGHT/BORDER_LEFT), since
              that composes correctly without needing this overlay. */}
          {stickyFirstColumn && (
            <div
              aria-hidden="true"
              className={`sticky left-0 z-20 pointer-events-none ${canScrollLeft ? SHADOW_RIGHT : ''}`}
              style={{ gridColumn: '1 / 2', gridRow: `1 / ${lastRowLine}` }}
            />
          )}
          {stickyLastColumn && (
            <div
              aria-hidden="true"
              className={`sticky right-0 z-20 pointer-events-none ${canScrollRight ? SHADOW_LEFT : ''}`}
              style={{ gridColumn: `${columnCount} / ${columnCount + 1}`, gridRow: `1 / ${lastRowLine}` }}
            />
          )}

          {/* display:contents wrapper for role="row" grouping — same trick
              the body rows use below — while every header cell keeps its
              own explicit grid placement. */}
          <div role="row" className="contents">
            {header.map((cell, index) => {
              const gridPlacement: CSSProperties = { gridColumn: `${index + 1} / ${index + 2}`, gridRow: '1 / 2' }
              // Non-element children (e.g. a bare string) can't be cloned
              // with placement/key props, but they still need both — a
              // missing key triggers a React warning, and a missing
              // gridColumn/gridRow throws the cell into CSS Grid's
              // auto-flow, which (per the comment above) scrambles the
              // whole layout by routing around the explicitly-placed cells.
              if (!isValidElement<{ className?: string; style?: CSSProperties }>(cell)) {
                return <div key={index} style={gridPlacement}>{cell}</div>
              }
              const sticky = stickyClassFor(index)
              return cloneElement(cell, {
                key: index,
                className: sticky ? withClass(cell, sticky) : cell.props.className,
                style: {
                  ...cell.props.style,
                  ...stickyBorderFor(index),
                  ...gridPlacement,
                },
              })
            })}
          </div>

          {rows.map((rowCells, rowIndex) => {
            // rowIndex 0 is the first body row, which is always "odd" — the
            // header doesn't participate in the alternation. Body rows start
            // at grid row line 2 (line 1 is the header row).
            const odd = rowIndex % 2 === 0
            const gridRow = `${rowIndex + 2} / ${rowIndex + 3}`
            const handleRowKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
              if (!onRowClick) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onRowClick(rowIndex)
              }
            }
            return (
              // display:contents keeps these cells as direct grid items (so
              // the column template still applies to them) while still
              // giving the row a real DOM node to hang the click handler and
              // `group` hover scope on. role="row" survives display:contents
              // in modern browsers, but a display:contents element generates
              // no box, so it can never itself receive focus — that's why
              // keyboard activation below is wired to the first real cell
              // instead of this wrapper.
              <div
                key={rowIndex}
                role="row"
                className={`contents group ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={onRowClick ? () => onRowClick(rowIndex) : undefined}
              >
                {rowCells.map((cell, cellIndex) => {
                  const gridPlacement: CSSProperties = { gridColumn: `${cellIndex + 1} / ${cellIndex + 2}`, gridRow }
                  if (!isValidElement<TableCellProps>(cell)) {
                    return <div key={cellIndex} style={gridPlacement}>{cell}</div>
                  }
                  const sticky = stickyClassFor(cellIndex)
                  const isRowActivationCell = !!onRowClick && cellIndex === 0
                  return cloneElement(cell, {
                    key: cellIndex,
                    odd,
                    hoverable: !!onRowClick,
                    tabIndex: isRowActivationCell ? 0 : undefined,
                    onKeyDown: isRowActivationCell ? handleRowKeyDown : undefined,
                    className: sticky ? withClass(cell, sticky) : cell.props.className,
                    style: {
                      ...cell.props.style,
                      ...stickyBorderFor(cellIndex),
                      ...gridPlacement,
                    },
                  })
                })}
              </div>
            )
          })}
        </div>
      </div>

      {paginationBottom && <div className="h-(--space-1) bg-(--border-surface-base)" />}
      {paginationBottom}
    </div>
  )
}
