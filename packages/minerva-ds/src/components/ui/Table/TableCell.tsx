import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react'
import { Text } from '../Text'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TableCellType = 'text' | 'link' | 'date' | 'number' | 'money' | 'checkbox' | 'radio' | 'action' | 'tag'

const LEFT_ALIGNED_TYPES: readonly TableCellType[] = ['text', 'link', 'date', 'number', 'money']

// Only these get the built-in <Text> treatment automatically — `link` is
// deliberately excluded even though it's left-aligned like the others,
// because its children is expected to already be a styled Button
// variant="link" (or similar), not raw text that needs wrapping.
const AUTO_TEXT_TYPES: readonly TableCellType[] = ['text', 'date', 'number', 'money']

// Cell types holding a genuinely separate action (a link, an edit/delete
// button) stop click propagation so they don't also fire the row's onClick.
// checkbox/radio are deliberately NOT here — selecting a row and clicking the
// row are the same action, never two competing ones, so the click should
// bubble straight through to onRowClick, which owns the actual toggle.
const INTERACTIVE_TYPES: readonly TableCellType[] = ['link', 'action']

interface TableCellCommonProps {
  /** Alternates the fill by row position — pass the row's own odd/even state */
  odd?: boolean
  /**
   * Whether this cell's row is a click target — only then does it react to
   * the row's hover (bg-surface-muted). The row wrapper needs the `group`
   * class for this to take effect.
   */
  hoverable?: boolean
  children: ReactNode
  className?: string
  /** Used by Table to explicitly place this cell in its grid — not for consumer use */
  style?: CSSProperties
  /**
   * Used by Table to make the first cell of a clickable row a keyboard
   * activation target for `onRowClick` — not for consumer use. (The row
   * wrapper itself is `display: contents` and can't receive focus, so the
   * activation point has to live on a real cell instead.)
   */
  tabIndex?: number
  /** Used by Table alongside `tabIndex` above — not for consumer use */
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
}

interface TableCellTextProps extends TableCellCommonProps {
  type: 'text' | 'link' | 'date' | 'number' | 'money'
  /** Second line underneath, only valid for text/link/date/number/money — always text-surface-base regardless of `color` */
  subtext?: ReactNode
  /**
   * Overrides the default text-surface-base color — pass a CSS color value,
   * e.g. `'var(--text-feedback-error-base)'`. Only applies to `text`/`date`/
   * `number`/`money` (the types with built-in Text styling) — for `link`,
   * color comes from whatever you pass as children.
   */
  color?: string
}

interface TableCellOtherProps extends TableCellCommonProps {
  type: 'checkbox' | 'radio' | 'action' | 'tag'
}

export type TableCellProps = TableCellTextProps | TableCellOtherProps

// ─── Component ────────────────────────────────────────────────────────────────

export function TableCell(props: TableCellProps) {
  const { type, odd = false, hoverable = false, children, className = '', style, tabIndex, onKeyDown } = props
  const subtext = 'subtext' in props ? props.subtext : undefined
  const color = 'color' in props ? props.color : undefined
  const isLeftAligned = LEFT_ALIGNED_TYPES.includes(type)
  const isAutoText = AUTO_TEXT_TYPES.includes(type)
  const isInteractive = INTERACTIVE_TYPES.includes(type)
  const stopPropagation = isInteractive ? (e: MouseEvent) => e.stopPropagation() : undefined

  const content = (
    <>
      {isAutoText ? (
        <Text variant="body-md" className="whitespace-nowrap" style={{ color: color ?? 'var(--text-surface-base)' }}>
          {children}
        </Text>
      ) : (
        children
      )}
      {subtext && (
        <Text variant="body-sm" className="text-(--text-surface-base) whitespace-nowrap">
          {subtext}
        </Text>
      )}
    </>
  )

  return (
    <div
      role="cell"
      style={style}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      className={[
        'flex flex-col justify-center',
        isLeftAligned ? 'items-start' : 'items-center',
        'py-(--inset-3) px-(--inset-5)',
        odd ? 'bg-(--bg-surface-subtle)' : 'bg-(--bg-surface-base)',
        hoverable ? 'group-hover:bg-(--bg-surface-muted)' : '',
        className,
      ].join(' ')}
    >
      {isInteractive ? <span onClick={stopPropagation} className="contents">{content}</span> : content}
    </div>
  )
}
