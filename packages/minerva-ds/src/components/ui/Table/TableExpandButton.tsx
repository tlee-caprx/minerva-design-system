import { Button } from '../Button'
import { ChevronDownIcon, ChevronRightIcon, Icon } from '../Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableExpandButtonProps {
  /** Match the row's `expanded` */
  expanded: boolean
  /** Toggle the row's `expanded` state */
  onClick: () => void
  /** Accessible label, e.g. "Show details for case 100385" */
  'aria-label'?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

// Chevron toggle for an expandable TableRow. Put it in a TableCell with
// type="expand" so clicking it doesn't also fire the row's onClick.
export function TableExpandButton({ expanded, onClick, 'aria-label': ariaLabel }: TableExpandButtonProps) {
  return (
    <Button
      variant="tertiary"
      iconOnly
      aria-expanded={expanded}
      aria-label={ariaLabel ?? (expanded ? 'Hide details' : 'Show details')}
      onClick={onClick}
    >
      <Icon icon={expanded ? ChevronDownIcon : ChevronRightIcon} size="small" />
    </Button>
  )
}
