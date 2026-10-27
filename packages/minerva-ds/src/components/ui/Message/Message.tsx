import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Icon, InfoCircleIcon, XCircleIcon, WarningCircleIcon, CheckCircleIcon } from '../Icon'
import { Text } from '../Text'

// ─── Types ────────────────────────────────────────────────────────────────────

export type MessageVariant = 'informational' | 'error' | 'warning' | 'success'

export interface MessageProps {
  variant: MessageVariant
  /** Replaces the variant's default status icon, e.g. use AIIcon for an AI-generated notice. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  /** Applies the existing default Judi AI gradient while retaining the variant's semantic border and icon color. */
  ai?: boolean
  /** Optional bold header above the body text */
  header?: ReactNode
  /** Body text */
  children: ReactNode
  /** Optional action — pass a <Button variant="tertiary" unpadded> */
  action?: ReactNode
  className?: string
}

// ─── Variant → icon / fill / stroke / icon color ───────────────────────────────

const ICONS: Record<MessageVariant, ComponentType<SVGProps<SVGSVGElement>>> = {
  informational: InfoCircleIcon,
  error:         XCircleIcon,
  warning:       WarningCircleIcon,
  success:       CheckCircleIcon,
}

interface VariantStyle {
  bg: string
  border: string
  icon: string
}

const VARIANT_STYLES: Record<MessageVariant, VariantStyle> = {
  informational: {
    bg:     'bg-(--bg-feedback-informational-inverse)',
    border: 'var(--border-feedback-informational-muted)',
    icon:   'text-(--icon-feedback-informational-base)',
  },
  error: {
    bg:     'bg-(--bg-feedback-error-inverse)',
    border: 'var(--border-feedback-error-muted)',
    icon:   'text-(--icon-feedback-error-base)',
  },
  warning: {
    bg:     'bg-(--bg-feedback-warning-inverse)',
    border: 'var(--border-feedback-warning-muted)',
    icon:   'text-(--icon-feedback-warning-base)',
  },
  success: {
    bg:     'bg-(--bg-feedback-success-inverse)',
    border: 'var(--border-feedback-success-muted)',
    icon:   'text-(--icon-feedback-success-base)',
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Message({ variant, icon: iconOverride, ai = false, header, children, action, className = '' }: MessageProps) {
  const styles = VARIANT_STYLES[variant]
  const MessageIcon = iconOverride ?? ICONS[variant]

  return (
    <div
      className={`flex items-start gap-(--inline-2) p-(--inset-6) rounded-(--radius-sm) ${styles.bg} ${className}`}
      style={{
        border: `var(--space-1) solid ${styles.border}`,
        backgroundImage: ai ? 'var(--gradient-ai-default)' : undefined,
      }}
    >
      <Icon icon={MessageIcon} size="regular" className={`shrink-0 ${styles.icon}`} />

      <div className="flex-1 min-w-0 flex flex-col gap-(--stack-2)">
        {header && (
          <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
            {header}
          </Text>
        )}
        <Text variant="body-md" className="text-(--text-surface-subtle)">
          {children}
        </Text>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
