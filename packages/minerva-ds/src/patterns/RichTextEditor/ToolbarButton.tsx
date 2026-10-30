import type { ComponentType, SVGProps } from 'react'
import { Icon } from '../../components/ui/Icon'
import { Tooltip } from '../../components/ui/Tooltip'

interface ToolbarButtonProps {
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  active?: boolean
  onClick: () => void
  /** `sm` (4px) in the toolbar, `md` (8px) in the link panel, per the design */
  padding?: 'sm' | 'md'
}

// Icon button used by the toolbar and the link panel.
export function ToolbarButton({ label, icon, active = false, onClick, padding = 'sm' }: ToolbarButtonProps) {
  return (
    <Tooltip content={label}>
      <button
        type="button"
        aria-label={label}
        aria-pressed={active}
        // Keeps the selection in the editor so the command applies to it.
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
        className={[
          'inline-flex shrink-0 items-center justify-center cursor-pointer rounded-(--radius-sm)',
          padding === 'sm' ? 'p-(--inset-1)' : 'p-(--inset-3)',
          'text-(--icon-action-neutral-idle) hover:text-(--icon-action-neutral-hover)',
          active
            ? 'bg-(--bg-action-neutral-press)'
            : 'bg-(--bg-action-neutral-idle) hover:bg-(--bg-action-neutral-hover) active:bg-(--bg-action-neutral-press)',
          'focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)',
        ].join(' ')}
      >
        <Icon icon={icon} size="regular" />
      </button>
    </Tooltip>
  )
}
