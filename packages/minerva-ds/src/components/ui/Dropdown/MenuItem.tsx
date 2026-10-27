import type { ButtonHTMLAttributes } from 'react'
import { Icon, CheckMarkIcon } from '../Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  label: string
  /**
   * Shows a checkmark on the far right, colored to match the label. Ignored
   * when `checkbox` is true — the checkbox itself becomes the selection
   * indicator instead, so showing both would be redundant.
   */
  selected?: boolean
  /** Switches idle/hover colors to the destructive (red) set */
  destructive?: boolean
  /**
   * Shows a checkbox-style indicator on the left instead of the right-side
   * checkmark, for multi-select menus. This is visual only, not a real
   * nested <input> — MenuItem is a <button>, and HTML doesn't allow
   * interactive form controls inside a button. The whole row stays the
   * single click/focus target; the box just reflects `selected`.
   */
  checkbox?: boolean
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MenuItem({
  label,
  selected = false,
  destructive = false,
  checkbox = false,
  disabled = false,
  className = '',
  ...props
}: MenuItemProps) {
  // Text color is set once on the button itself, not duplicated onto the
  // checkmark — CheckMarkIcon uses fill="currentColor", so it automatically
  // matches the label color via CSS inheritance, guaranteeing "same color
  // as the text" rather than needing to keep two color values in sync.
  const textColorClass = disabled
    ? 'text-(--text-control-value-disabled)'
    : destructive
    ? 'text-(--text-control-destructive-idle)'
    : 'text-(--text-control-subtle-idle)'

  // Pressed uses the same fill as hover — no distinct pressed treatment.
  const interactionClass = disabled
    ? ''
    : destructive
    ? 'hover:bg-(--bg-control-subtle-destructive-hover) active:bg-(--bg-control-subtle-destructive-hover)'
    : 'hover:bg-(--bg-control-subtle-hover) active:bg-(--bg-control-subtle-hover)'

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'w-full flex items-center justify-between gap-(--inline-2)',
        'py-(--inset-3) px-(--inset-5)',
        'bg-(--bg-surface-base)',
        'border-0 outline-none text-left',
        textColorClass,
        disabled ? 'cursor-not-allowed' : `cursor-pointer ${interactionClass}`,
        className,
      ].filter(Boolean).join(' ')}
      style={{
        fontSize:   'var(--menu-item-size)',
        lineHeight: 'var(--menu-item-line-height)',
        fontWeight: 'var(--menu-item-weight)',
      }}
      {...props}
    >
      <span className="inline-flex items-center gap-(--inline-2) min-w-0">
        {checkbox && (
          <span
            aria-hidden="true"
            className={[
              'inline-flex items-center justify-center shrink-0',
              'w-(--space-18) h-(--space-18) rounded-(--radius-sm)',
              disabled
                ? 'bg-(--bg-control-default-disabled)'
                : selected
                ? 'bg-(--bg-control-selected-idle)'
                : 'bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]',
            ].join(' ')}
          >
            {selected && !disabled && (
              <Icon icon={CheckMarkIcon} size="small" className="text-(--icon-control-selected-idle)" />
            )}
          </span>
        )}
        <span className="truncate">{label}</span>
      </span>
      {!checkbox && selected && <Icon icon={CheckMarkIcon} size="small" />}
    </button>
  )
}
