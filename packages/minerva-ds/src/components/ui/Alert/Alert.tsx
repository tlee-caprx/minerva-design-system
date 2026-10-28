import type { ComponentType, ReactNode, SVGProps } from 'react'
import { CheckCircleIcon, Icon, InfoCircleIcon, WarningCircleIcon, XCircleIcon, XCloseIcon } from '../Icon'
import { Text } from '../Text'

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertType = 'success' | 'warning' | 'error' | 'general'

/** Figma calls this property "Style"; `style` is taken by React, so it's `variant` here. */
export type AlertVariant = 'banner' | 'toast'

export interface AlertProps {
  type: AlertType
  variant: AlertVariant
  /** The message. Plain text only */
  children: ReactNode
  /** Banner only: called when the × is clicked */
  onClose?: () => void
  className?: string
}

// ─── Type → icon / colors ─────────────────────────────────────────────────────

interface TypeStyle {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  bg: string
  text: string
  iconColor: string
}

// `general` uses the informational feedback tokens. The muted backgrounds
// already carry the design's 85% opacity.
const TYPE_STYLES: Record<AlertType, TypeStyle> = {
  success: {
    icon:      CheckCircleIcon,
    bg:        'bg-(--bg-feedback-success-muted)',
    text:      'text-(--text-feedback-success-inverse)',
    iconColor: 'text-(--icon-feedback-success-inverse)',
  },
  warning: {
    icon:      WarningCircleIcon,
    bg:        'bg-(--bg-feedback-warning-muted)',
    text:      'text-(--text-feedback-warning-inverse)',
    iconColor: 'text-(--icon-feedback-warning-inverse)',
  },
  error: {
    icon:      XCircleIcon,
    bg:        'bg-(--bg-feedback-error-muted)',
    text:      'text-(--text-feedback-error-inverse)',
    iconColor: 'text-(--icon-feedback-error-inverse)',
  },
  general: {
    icon:      InfoCircleIcon,
    bg:        'bg-(--bg-feedback-informational-muted)',
    text:      'text-(--text-feedback-informational-inverse)',
    iconColor: 'text-(--icon-feedback-informational-inverse)',
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

// The visual alone. To show one over the page, call showAlert(); AppLayout
// renders the AlertViewport that places and times it.
export function Alert({ type, variant, children, onClose, className = '' }: AlertProps) {
  const styles = TYPE_STYLES[type]
  const isBanner = variant === 'banner'

  const content = (
    <div className={`flex items-center justify-center gap-(--inline-2) min-w-0 ${isBanner ? 'flex-1' : ''}`}>
      <Icon icon={styles.icon} size="regular" className={`shrink-0 ${styles.iconColor}`} />
      <Text variant={isBanner ? 'banner-text' : 'toast-text'} className={`min-w-0 text-center ${styles.text}`}>
        {children}
      </Text>
    </div>
  )

  // Errors and warnings interrupt screen readers; success and general wait.
  const role = type === 'error' || type === 'warning' ? 'alert' : 'status'

  if (!isBanner) {
    return (
      <div
        role={role}
        className={`inline-flex items-center justify-center max-w-full py-(--inset-3) px-(--inset-7) rounded-(--radius-sm) ${styles.bg} ${className}`}
      >
        {content}
      </div>
    )
  }

  return (
    <div
      role={role}
      className={`flex items-center w-full py-(--inset-5) px-(--space-30) gap-(--inline-4) ${styles.bg} ${className}`}
    >
      {content}
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="inline-flex shrink-0 items-center justify-center cursor-pointer bg-transparent p-0 rounded-(--radius-sm) text-(--icon-action-dismiss-inverse-idle) hover:text-(--icon-action-dismiss-inverse-hover) active:text-(--icon-action-dismiss-inverse-pressed) focus-visible:outline-2 focus-visible:outline-(--icon-action-dismiss-inverse-idle)"
      >
        <Icon icon={XCloseIcon} size="regular" />
      </button>
    </div>
  )
}
