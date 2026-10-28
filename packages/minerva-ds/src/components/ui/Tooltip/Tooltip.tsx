import { useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Text } from '../Text'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipBeak = 'top' | 'bottom' | 'left' | 'right' | 'none'

export interface TooltipBubbleProps {
  content: ReactNode
  /**
   * Which edge the beak protrudes from — this also drives placement (the
   * tooltip sits on the opposite side of the trigger from the beak).
   * `'none'` skips the beak but keeps `'bottom'`'s placement (above the
   * trigger), the most common default.
   */
  beak?: TooltipBeak
  id?: string
  className?: string
}

export interface TooltipProps {
  content: ReactNode
  beak?: TooltipBeak
  /** Skips showing the tooltip, e.g. while truncated text still fits */
  disabled?: boolean
  children: ReactNode
  className?: string
}

// ─── Beak → beak position (bubble-relative, used by both Tooltip and the static TooltipBubble) ──

// Small rotated square, centered on and half-overlapping the relevant edge —
// standard CSS tooltip-arrow technique. Same fill as the tooltip box so it
// reads as one continuous shape.
const BEAK_CLASSES: Record<Exclude<TooltipBeak, 'none'>, string> = {
  top:    'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  left:   'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
  right:  'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
}

// ─── Bubble — the box + beak + text itself, unpositioned ───────────────────────

// Exported separately so docs/previews can show the actual tooltip UI sitting
// statically on the page (e.g. all beak variants at once) without it being
// absolutely positioned against a trigger. `Tooltip` below is the real
// interactive component — this is its visual content only.
export function TooltipBubble({ content, beak = 'bottom', id, className = '' }: TooltipBubbleProps) {
  return (
    <span
      role="tooltip"
      id={id}
      className={[
        'relative inline-block w-max max-w-[240px]',
        'px-(--inset-5) py-(--inset-3)',
        'rounded-(--radius-sm) bg-(--bg-surface-inverse)',
        className,
      ].join(' ')}
    >
      {beak !== 'none' && (
        <span
          aria-hidden="true"
          className={`absolute w-(--space-8) h-(--space-8) rotate-45 bg-(--bg-surface-inverse) ${BEAK_CLASSES[beak]}`}
        />
      )}
      <Text as="span" variant="body-sm" className="relative text-(--text-surface-inverse)">
        {content}
      </Text>
    </span>
  )
}

// ─── Tooltip — hover/focus trigger + positioning ───────────────────────────────

// 8px — matches --stack-2/--inline-2. Needed as a real number here (not a CSS
// var) because position is computed from getBoundingClientRect() in JS, not
// expressed as Tailwind classes.
const GAP_PX = 8

export function Tooltip({ content, beak = 'bottom', disabled = false, children, className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState<CSSProperties | null>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tooltipId = useId()

  // Rendered through a portal to document.body rather than positioned
  // relative to the trigger in place — an ancestor between the trigger and
  // the page root only has to have `overflow: hidden`/`overflow: auto`
  // (a scrollable table, a card with rounded corners) for an in-place
  // absolutely-positioned bubble to get clipped. Portaling escapes that
  // entirely, same reasoning as Modal.
  const show = () => {
    if (disabled) return
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) return

    const style: CSSProperties = { position: 'fixed' }
    switch (beak) {
      case 'top':
        style.top = rect.bottom + GAP_PX
        style.left = rect.left + rect.width / 2
        style.transform = 'translateX(-50%)'
        break
      case 'left':
        style.top = rect.top + rect.height / 2
        style.left = rect.right + GAP_PX
        style.transform = 'translateY(-50%)'
        break
      case 'right':
        style.top = rect.top + rect.height / 2
        style.left = rect.left - GAP_PX
        style.transform = 'translate(-100%, -50%)'
        break
      case 'bottom':
      case 'none':
      default:
        style.top = rect.top - GAP_PX
        style.left = rect.left + rect.width / 2
        style.transform = 'translate(-50%, -100%)'
        break
    }
    setCoords(style)
    setVisible(true)
  }

  const hide = () => setVisible(false)

  return (
    <span
      ref={triggerRef}
      // max-w-full + min-w-0 let the trigger shrink inside a width-limited
      // parent, so truncated text (e.g. a Table cell with maxWidth) can
      // ellipsize instead of overflowing.
      className="inline-flex max-w-full"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span className="min-w-0" aria-describedby={visible ? tooltipId : undefined}>{children}</span>

      {visible &&
        !disabled &&
        coords &&
        createPortal(
          // Arbitrary max z-index (beyond Tailwind's z-50 ceiling, which the
          // sidebar/header also use) — a tooltip must always paint above
          // everything else on the page, no matter what.
          <span style={{ ...coords, zIndex: 9999 }}>
            <TooltipBubble content={content} beak={beak} id={tooltipId} className={className} />
          </span>,
          document.body
        )}
    </span>
  )
}
