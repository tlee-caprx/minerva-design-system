import { forwardRef, useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon, XCloseIcon } from '../Icon'
import { Text } from '../Text'
import { ButtonGroup } from '../ButtonGroup'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ModalContentProps {
  onClose: () => void
  title: ReactNode
  /** Body content — usually text, but can be anything */
  children: ReactNode
  /** Tertiary button on the far left of the footer */
  leftAction?: ReactNode
  /** Secondary/Primary buttons on the right — wrapped in a ButtonGroup */
  rightActions?: ReactNode
  className?: string
}

export interface ModalProps extends ModalContentProps {
  open: boolean
}

// ─── Content — the dialog box itself, no portal/backdrop/focus handling ───────

// Exported separately so docs/previews can show the actual modal UI sitting
// statically on the page (e.g. next to its trigger button) without it being
// a real fixed-position, backdrop-covered overlay. `Modal` below is the real
// interactive component — this is its visual content only.
export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(function ModalContent(
  { onClose, title, children, leftAction, rightActions, className = '' },
  ref
) {
  const titleId = useId()

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className={`flex flex-col gap-(--stack-5) w-[528px] p-(--inset-7) rounded-(--radius-sm) bg-(--bg-surface-base) outline-none ${className}`}
      style={{ boxShadow: 'var(--shadow-surface-lg)' }}
    >
      <div className="flex items-center justify-between gap-(--inline-4)">
        <Text id={titleId} as="h2" variant="heading-xs" className="text-(--text-surface-base)">
          {title}
        </Text>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="shrink-0 inline-flex items-center justify-center cursor-pointer bg-transparent p-0"
          style={{ border: 'none' }}
        >
          <Icon icon={XCloseIcon} size="regular" className="text-(--icon-action-dismiss-idle)" />
        </button>
      </div>

      <div className="text-(--text-surface-base)">{children}</div>

      {(leftAction || rightActions) && (
        <div className="flex items-center justify-between gap-(--inline-4)">
          <div>{leftAction}</div>
          {rightActions && <ButtonGroup>{rightActions}</ButtonGroup>}
        </div>
      )}
    </div>
  )
})

// ─── Modal — portal + backdrop + focus handling ────────────────────────────────

// Renders through a portal to document.body, not inline — a modal's backdrop
// has to reliably cover the full viewport regardless of where it's triggered
// from, which no amount of CSS positioning can guarantee from inside a
// scrollable/clipped ancestor (see the Tooltip overflow-clipping issue).
export function Modal({ open, onClose, ...contentProps }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <ModalContent ref={dialogRef} onClose={onClose} {...contentProps} />
      </div>
    </div>,
    document.body
  )
}
