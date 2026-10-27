import { useId, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react'
import { Icon, ChevronRightIcon, ChevronDownIcon, CheckMarkIcon } from '../Icon'
import { Text } from '../Text'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CollapseStyle = 'default' | 'underline' | 'blank' | 'underline-flush' | 'blank-flush' | 'unpadded'
export type CollapseTrigger = 'chevron' | 'checkbox'

export interface CollapseProps {
  /** Container treatment — stroke, radius, and horizontal padding */
  style?: CollapseStyle
  /** Chevron rotates/swaps on click; checkbox is a visual-only state indicator
   *  (not a real input — the whole header is the single click/focus target) */
  trigger?: CollapseTrigger
  title: ReactNode
  /** Right-aligned header content, e.g. buttons — clicks here don't toggle */
  actions?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
  className?: string
}

// ─── Style → stroke / radius / padding ─────────────────────────────────────────

type BorderTreatment = 'full' | 'bottom' | 'none'

interface StyleConfig {
  border: BorderTreatment
  headerPadding: string
  bodyPadding: string
}

const STYLE_CONFIG: Record<CollapseStyle, StyleConfig> = {
  'default': {
    border:        'full',
    headerPadding: 'px-(--inset-7) py-(--inset-6)',
    bodyPadding:   'px-(--inset-7) py-(--inset-6)',
  },
  'underline': {
    border:        'bottom',
    headerPadding: 'px-(--inset-7) py-(--inset-6)',
    bodyPadding:   'px-(--inset-7) py-(--inset-6)',
  },
  'blank': {
    border:        'none',
    headerPadding: 'px-(--inset-7) py-(--inset-6)',
    bodyPadding:   'px-(--inset-7) py-(--inset-6)',
  },
  'underline-flush': {
    border:        'bottom',
    headerPadding: 'py-(--inset-6)',
    bodyPadding:   'py-(--inset-6)',
  },
  'blank-flush': {
    border:        'none',
    headerPadding: 'py-(--inset-6)',
    bodyPadding:   'py-(--inset-6)',
  },
  'unpadded': {
    border:        'none',
    headerPadding: '',
    bodyPadding:   'py-(--inset-6)',
  },
}

// The bottom-only stroke lives on the outer wrapper, not on header/body
// individually — since the wrapper's height grows when the body appears,
// the border already sits wherever the current bottom edge is, with no
// conditional logic needed for collapsed vs. expanded.
const BORDER_TREATMENTS: Record<BorderTreatment, CSSProperties> = {
  full:   { border: 'var(--space-1) solid var(--border-surface-base)' },
  bottom: { borderBottom: 'var(--space-1) solid var(--border-surface-base)' },
  none:   {},
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Collapse({
  style = 'default',
  trigger = 'chevron',
  title,
  actions,
  defaultOpen = false,
  children,
  className = '',
}: CollapseProps) {
  const [open, setOpen] = useState(defaultOpen)
  const bodyId = useId()
  const config = STYLE_CONFIG[style]

  const toggle = () => setOpen((o) => !o)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  const stopPropagation = (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation()

  return (
    <div
      className={`flex flex-col bg-(--bg-surface-base) ${config.border === 'full' ? 'rounded-(--radius-sm)' : ''} ${className}`}
      style={BORDER_TREATMENTS[config.border]}
    >
      {/* Not a real <button> — it needs to contain real <button> children in
          `actions` without violating HTML's no-nested-interactive-elements
          rule, so it's a div with the equivalent ARIA/keyboard behavior. */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={[
          'flex items-center justify-between gap-(--inline-4)',
          'cursor-pointer outline-none',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-(--border-control-default-focus)',
          config.headerPadding,
        ].join(' ')}
        style={style === 'default' && open ? { borderBottom: 'var(--space-1) solid var(--border-surface-base)' } : undefined}
      >
        <span className="flex items-center gap-(--inline-2) min-w-0">
          {trigger === 'chevron' ? (
            <Icon
              icon={open ? ChevronDownIcon : ChevronRightIcon}
              size="regular"
              className="text-(--icon-action-base-idle) shrink-0"
            />
          ) : (
            <span
              aria-hidden="true"
              className={[
                'inline-flex items-center justify-center shrink-0',
                'w-(--space-18) h-(--space-18) rounded-(--radius-sm)',
                open
                  ? 'bg-(--bg-control-selected-idle)'
                  : 'bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]',
              ].join(' ')}
            >
              {open && <Icon icon={CheckMarkIcon} size="small" className="text-(--icon-control-selected-idle)" />}
            </span>
          )}
          <Text variant="body-md" weight="semibold" className="text-(--text-action-base-idle) truncate">
            {title}
          </Text>
        </span>

        {actions && (
          <span onClick={stopPropagation} className="flex items-center gap-(--inline-3) shrink-0">
            {actions}
          </span>
        )}
      </div>

      {open && (
        <div id={bodyId} className={config.bodyPadding}>
          {children}
        </div>
      )}
    </div>
  )
}
