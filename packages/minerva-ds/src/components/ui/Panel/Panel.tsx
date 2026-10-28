import type { HTMLAttributes, ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type PanelVariant = 'default' | 'nested'

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** `default` is a white card with a stroke and small shadow; `nested` is a subtle-fill card with no stroke, for panels inside panels */
  variant?: PanelVariant
  /** A TabSet rendered flush on top of the panel body, with no gap between them */
  tabs?: ReactNode
  children?: ReactNode
}

// ─── Variant → classes ────────────────────────────────────────────────────────

// The stroke is an ::after overlay, not a border: it sits inside the panel's
// edge like Figma's "inside" stroke (no layout space taken), and it paints
// above children, so a TabSet's own background can't cover it.
const STROKE = [
  'after:content-[""] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none',
  'after:shadow-[inset_0_0_0_var(--space-1)_var(--border-surface-base)]',
].join(' ')

const VARIANT_CLASSES: Record<PanelVariant, string> = {
  default: `bg-(--bg-surface-base) shadow-(--shadow-surface-sm) ${STROKE}`,
  nested:  'bg-(--bg-surface-subtle) shadow-(--shadow-surface-sm)',
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Panel({ variant = 'default', tabs, children, className = '', ...rest }: PanelProps) {
  const shell = `relative rounded-(--radius-sm) ${VARIANT_CLASSES[variant]}`

  if (tabs) {
    // The whole tabbed panel is rounded and clipped; the body under the tabs
    // has square corners so it meets the TabSet with no gap.
    return (
      <div {...rest} className={`${shell} flex flex-col overflow-hidden ${className}`}>
        {tabs}
        <div className="p-(--inset-7)">{children}</div>
      </div>
    )
  }

  return (
    <div {...rest} className={`${shell} p-(--inset-7) ${className}`}>
      {children}
    </div>
  )
}
