import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Icon } from '../../ui/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SideNavItemProps {
  label: string
  /** Optional leading icon. Required when using compact mode. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  /** Provide href for anchor-based navigation. Omit to use onClick state-based navigation. */
  href?: string
  /** Used when href is omitted — switches the active section without routing */
  onClick?: () => void
  /** Highlights the item as active */
  active?: boolean
  /** Optional lozenge rendered on the far right */
  lozenge?: ReactNode
  /** Renders as an icon-only navigation item while retaining an accessible label. */
  compact?: boolean
  className?: string
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const itemTypography = {
  fontSize:   'var(--menu-item-lg-size)',
  lineHeight: 'var(--menu-item-lg-line-height)',
  fontWeight: 'var(--menu-item-lg-weight)',
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SideNavItem({
  label,
  href,
  onClick,
  active = false,
  lozenge,
  icon,
  compact = false,
  className = '',
}: SideNavItemProps) {
  const stateClasses = active
    ? 'bg-(--bg-navigation-item-primary-active) text-(--text-navigation-item-primary-active)'
    : 'bg-(--bg-navigation-item-primary-idle) hover:bg-(--bg-navigation-item-primary-hover) text-(--text-navigation-item-primary-idle) hover:text-(--text-navigation-item-primary-hover)'

  const sharedClass = [
    'flex items-center w-full no-underline rounded-(--radius-sm) cursor-pointer border-0',
    compact
      ? 'justify-center p-(--inset-3)'
      : 'justify-between py-(--inset-3) px-(--inset-2) text-left',
    stateClasses,
    className,
  ].filter(Boolean).join(' ')

  const content = compact ? (
    <>
      {icon && <Icon icon={icon} size="regular" className="shrink-0" />}
      <span className="sr-only">{label}</span>
    </>
  ) : (
    <>
      <span className="flex min-w-0 items-center gap-(--inline-2)">
        {icon && <Icon icon={icon} size="regular" className="shrink-0" />}
        <span>{label}</span>
      </span>
      {lozenge && <span className="shrink-0">{lozenge}</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} className={sharedClass} style={itemTypography} aria-current={active ? 'page' : undefined}>
        {content}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={sharedClass}
      style={itemTypography}
      aria-label={compact ? label : undefined}
      aria-pressed={compact ? active : undefined}
    >
      {content}
    </button>
  )
}
