import type { ComponentType, SVGProps } from 'react'
import { Icon, LinkOutIcon } from '../Icon'
import { Text } from '../Text'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MetaItemProps {
  /** Optional icon rendered to the left of the label */
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  /** Bold label text — colon is added automatically */
  label: string
  /** Regular value text */
  value: string
  /**
   * When provided, renders the value as a clickable underlined link with a
   * LinkOut icon. Leave routing/navigation to the consumer.
   */
  onClick?: () => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MetaItem({ icon, label, value, onClick, className = '' }: MetaItemProps) {
  // Label and value are one run of text, not two flex columns, so when space
  // runs out the value wraps onto the next line like a sentence instead of
  // each half wrapping inside its own narrow column. The label itself never
  // breaks, and very long values (IDs, URLs) can break anywhere rather than
  // overflowing their container.
  return (
    <div className={`inline-flex items-start gap-(--inline-1) max-w-full ${className}`}>
      {icon && (
        // Line-height tall, so the icon centers on the first line of text.
        <span className="inline-flex items-center shrink-0 h-(--body-md-line-height)">
          <Icon icon={icon} size="small" className="text-(--icon-surface-base)" />
        </span>
      )}
      <Text variant="body-md" className="min-w-0 text-(--text-surface-base) [overflow-wrap:anywhere]">
        <Text variant="body-md" weight="semibold" className="whitespace-nowrap">
          {label}:
        </Text>{' '}
        {onClick ? (
          <button
            type="button"
            onClick={onClick}
            className="inline cursor-pointer bg-transparent p-0 text-left"
            style={{ border: 'none' }}
          >
            <Text variant="body-md" className="text-(--text-action-hyperlink) underline">
              {value}
            </Text>
            {/* nbsp keeps the icon on the same line as the last word */}
            {'\u00A0'}
            <Icon icon={LinkOutIcon} size="small" className="inline-block align-middle text-(--icon-action-hyperlink)" />
          </button>
        ) : (
          value
        )}
      </Text>
    </div>
  )
}
