import { Icon, ChevronStartIcon, ChevronLeftIcon, ChevronRightIcon, ChevronEndIcon } from '../Icon'
import { Text } from '../Text'
import { Button } from '../Button'
import { ButtonGroup } from '../ButtonGroup'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps {
  /** 1-indexed */
  currentPage: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

// Renders nothing when everything already fits on one page — no controls
// needed, so consumers don't have to remember to conditionally hide this
// themselves for modules under the page-size limit.
export function Pagination({ currentPage, pageSize, totalItems, onPageChange, className = '' }: PaginationProps) {
  if (totalItems <= pageSize) return null

  const totalPages = Math.ceil(totalItems / pageSize)
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)
  const isFirst = currentPage <= 1
  const isLast = currentPage >= totalPages

  return (
    <div className={`flex items-center justify-between p-(--inset-6) bg-(--bg-surface-base) ${className}`}>
      <Text variant="body-md" className="text-(--text-surface-base)">
        Showing {start}-{end} of {totalItems}
      </Text>
      <ButtonGroup>
        <Button variant="secondary" iconOnly disabled={isFirst} onClick={() => onPageChange(1)} aria-label="First page">
          <Icon icon={ChevronStartIcon} size="regular" />
        </Button>
        <Button variant="secondary" iconOnly disabled={isFirst} onClick={() => onPageChange(currentPage - 1)} aria-label="Previous page">
          <Icon icon={ChevronLeftIcon} size="regular" />
        </Button>
        <Button variant="secondary" iconOnly disabled={isLast} onClick={() => onPageChange(currentPage + 1)} aria-label="Next page">
          <Icon icon={ChevronRightIcon} size="regular" />
        </Button>
        <Button variant="secondary" iconOnly disabled={isLast} onClick={() => onPageChange(totalPages)} aria-label="Last page">
          <Icon icon={ChevronEndIcon} size="regular" />
        </Button>
      </ButtonGroup>
    </div>
  )
}
