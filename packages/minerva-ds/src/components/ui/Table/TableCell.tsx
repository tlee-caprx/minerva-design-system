import { useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode, type TdHTMLAttributes } from 'react'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TableCellType = 'text' | 'link' | 'date' | 'number' | 'money' | 'checkbox' | 'radio' | 'action' | 'tag' | 'expand'

const LEFT_ALIGNED_TYPES: readonly TableCellType[] = ['text', 'link', 'date', 'number', 'money']

// Only these get the built-in <Text> treatment automatically — `link` is
// deliberately excluded even though it's left-aligned like the others,
// because its children is expected to already be a styled Button
// variant="link" (or similar), not raw text that needs wrapping.
const AUTO_TEXT_TYPES: readonly TableCellType[] = ['text', 'date', 'number', 'money']

// Cells holding their own control stop click propagation, so using the
// control (a link, a menu button, a selection checkbox, the expand chevron)
// never also fires the row's onClick.
const INTERACTIVE_TYPES: readonly TableCellType[] = ['link', 'action', 'checkbox', 'radio', 'expand']

interface TableCellCommonProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'color' | 'children'> {
  children: ReactNode
}

interface TableCellTextProps extends TableCellCommonProps {
  type: 'text' | 'link' | 'date' | 'number' | 'money'
  /** Second line underneath, which makes the row taller — always text-surface-base regardless of `color` */
  subtext?: ReactNode
  /**
   * Overrides the default text-surface-base color — pass a CSS color value,
   * e.g. `'var(--text-feedback-error-base)'`. Only applies to `text`/`date`/
   * `number`/`money` (the types with built-in Text styling) — for `link`,
   * color comes from whatever you pass as children.
   */
  color?: string
  /**
   * Caps the cell's width; longer text is cut off with "…" and shows in full
   * in a Tooltip on hover. Any CSS length, e.g. `'calc(var(--space-40) * 6)'`.
   */
  maxWidth?: string
}

interface TableCellOtherProps extends TableCellCommonProps {
  type: 'checkbox' | 'radio' | 'action' | 'tag' | 'expand'
}

export type TableCellProps = TableCellTextProps | TableCellOtherProps

// ─── Truncation ───────────────────────────────────────────────────────────────

// True while any line inside `ref` is cut off, so the tooltip only appears
// when there's actually hidden text to show.
function useIsTruncated(enabled: boolean) {
  const ref = useRef<HTMLSpanElement>(null)
  const [truncated, setTruncated] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    const check = () => {
      const lines = Array.from(el.querySelectorAll<HTMLElement>('[data-truncate]'))
      setTruncated(lines.some((line) => line.scrollWidth > line.clientWidth))
    }
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    return () => observer.disconnect()
  })

  return [ref, truncated] as const
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TableCell(props: TableCellProps) {
  // Widened to every prop so the text-only ones can be pulled out of `rest`
  // (they'd otherwise land on the <td>). The union still type-checks callers.
  const { type, children, subtext, color, maxWidth, className = '', style, onClick, ...rest } =
    props as TableCellTextProps & { type: TableCellType }

  const isLeftAligned = LEFT_ALIGNED_TYPES.includes(type)
  const isAutoText = AUTO_TEXT_TYPES.includes(type)
  const isInteractive = INTERACTIVE_TYPES.includes(type)
  const truncate = maxWidth !== undefined
  const [measureRef, truncated] = useIsTruncated(truncate)

  const handleClick = (e: MouseEvent<HTMLTableCellElement>) => {
    if (isInteractive) e.stopPropagation()
    onClick?.(e)
  }

  const lineClass = truncate ? 'block truncate' : 'whitespace-nowrap'

  const lines = (
    <>
      {isAutoText ? (
        <Text variant="body-md" data-truncate={truncate || undefined} className={lineClass} style={{ color: color ?? 'var(--text-surface-base)' }}>
          {children}
        </Text>
      ) : (
        children
      )}
      {subtext && (
        <Text variant="body-sm" data-truncate={truncate || undefined} className={`text-(--text-surface-base) ${lineClass}`}>
          {subtext}
        </Text>
      )}
    </>
  )

  return (
    <td
      {...rest}
      data-type={type}
      onClick={handleClick}
      style={style}
      className={`py-(--inset-3) px-(--inset-5) align-middle ${className}`}
    >
      <div
        className={`flex flex-col justify-center ${isLeftAligned ? 'items-start' : 'items-center'}`}
        style={truncate ? { maxWidth } : undefined}
      >
        {truncate ? (
          <Tooltip
            disabled={!truncated}
            content={subtext ? <>{children}<br />{subtext}</> : children}
          >
            <span ref={measureRef} className="block min-w-0">{lines}</span>
          </Tooltip>
        ) : (
          lines
        )}
      </div>
    </td>
  )
}
