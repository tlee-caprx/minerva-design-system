import { Children, isValidElement, type ReactNode } from 'react'
import type { ButtonProps } from '../Button'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ButtonGroupProps {
  /**
   * Pass buttons in left-to-right visual order.
   *
   * Right-aligned group (e.g. action bar, dialog footer):
   *   tertiary → secondary → primary  (primary is rightmost / most prominent)
   *
   * Left-aligned group (e.g. toolbar, inline actions):
   *   primary → secondary → tertiary  (primary is leftmost / most prominent)
   *
   * The group itself is layout-neutral — use className or a parent flex
   * container with justify-end / justify-start to control alignment.
   */
  children: ReactNode
  className?: string
  /** Capture-phase click handler — fires before any child button's own handler */
  onClickCapture?: React.MouseEventHandler<HTMLDivElement>
}

// ─── Component ────────────────────────────────────────────────────────────────

// Gap is 8px by default, widening to 16px only when every button in the
// group is tertiary — tertiary buttons have no visible boundary, so they
// need more breathing room to read as separate targets.
export function ButtonGroup({ children, className = '', onClickCapture }: ButtonGroupProps) {
  const items = Children.toArray(children)
  const allTertiary = items.length > 0 && items.every(
    (child) => isValidElement<ButtonProps>(child) && child.props.variant === 'tertiary'
  )

  return (
    <div
      onClickCapture={onClickCapture}
      className={`flex items-center ${allTertiary ? 'gap-(--inline-4)' : 'gap-(--inline-2)'} ${className}`}
    >
      {children}
    </div>
  )
}
