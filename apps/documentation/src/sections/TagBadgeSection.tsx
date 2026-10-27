import { Tag, Badge, Text } from '@judi-health/minerva-ds'
import type { TagVariant } from '@judi-health/minerva-ds'

export function TagBadgeSection() {
  const TAG_VARIANTS: { label: string; variant: TagVariant; description: string }[] = [
    { label: 'Info',               variant: 'info',               description: 'Default neutral state' },
    { label: 'Info High Contrast', variant: 'info-high-contrast', description: 'Emphasized neutral' },
    { label: 'Success',            variant: 'success',            description: 'Approved / active / complete' },
    { label: 'Warning',            variant: 'warning',            description: 'Needs attention' },
    { label: 'Error',              variant: 'error',              description: 'Failed / rejected / blocked' },
    { label: 'System',             variant: 'system',             description: 'System-generated status' },
    { label: 'System Alt',         variant: 'system-alt',         description: 'System alt emphasis' },
  ]

  return (
    <div className="min-h-full flex flex-col gap-(--stack-5)">

      {/* ── Tag ── */}
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Tag
        </Text>
        <Text as="p" variant="body-md" className="mb-(--space-24) text-(--text-surface-subtle)">
          Read-only labels. Text only — no interactive elements. Use to communicate status or category.
        </Text>

        {/* All variants */}
        <Text as="h3" variant="label-lg" className="mb-(--space-16) text-(--text-surface-subtle)">
          Variants
        </Text>
        <div className="flex flex-col gap-(--stack-3)">
          {TAG_VARIANTS.map(({ label, variant, description }) => (
            <div key={variant} className="flex items-center gap-(--inline-4)">
              <div className="shrink-0 w-[160px]">
                <Tag variant={variant}>{label}</Tag>
              </div>
              <Text variant="label-md" className="shrink-0 w-[180px] text-(--text-surface-subtle)">
                {variant}
              </Text>
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                {description}
              </Text>
            </div>
          ))}
        </div>

        {/* In context */}
        <Text as="h3" variant="label-lg" className="mt-(--space-32) mb-(--space-16) text-(--text-surface-subtle)">
          In context
        </Text>
        <div className="flex flex-wrap gap-(--inline-2)">
          <Tag variant="success">Approved</Tag>
          <Tag variant="warning">Pending Review</Tag>
          <Tag variant="error">Rejected</Tag>
          <Tag variant="info">Draft</Tag>
          <Tag variant="system">Auto-assigned</Tag>
          <Tag variant="info-high-contrast">Priority</Tag>
          <Tag variant="system-alt">Escalated</Tag>
        </div>
      </div>

      {/* ── Badge ── */}
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Badge
        </Text>
        <Text as="p" variant="body-md" className="mb-(--space-24) text-(--text-surface-subtle)">
          Interactive labels. Identical to the Info tag in colour but supports an optional dismiss (×) button. Use for user-applied filters or removable selections.
        </Text>

        <Text as="h3" variant="label-lg" className="mb-(--space-16) text-(--text-surface-subtle)">
          Variants
        </Text>
        <div className="flex flex-col gap-(--stack-3)">
          <div className="flex items-center gap-(--inline-4)">
            <div className="shrink-0 w-[160px]">
              <Badge>Label</Badge>
            </div>
            <Text variant="label-md" className="shrink-0 w-[180px] text-(--text-surface-subtle)">
              without onClose
            </Text>
            <Text variant="body-md" className="text-(--text-surface-subtle)">
              Static — no dismiss button rendered
            </Text>
          </div>
          <div className="flex items-center gap-(--inline-4)">
            <div className="shrink-0 w-[160px]">
              <Badge onClose={() => {}}>Label</Badge>
            </div>
            <Text variant="label-md" className="shrink-0 w-[180px] text-(--text-surface-subtle)">
              with onClose
            </Text>
            <Text variant="body-md" className="text-(--text-surface-subtle)">
              Renders × dismiss button, calls onClose on click
            </Text>
          </div>
        </div>

        {/* In context */}
        <Text as="h3" variant="label-lg" className="mt-(--space-32) mb-(--space-16) text-(--text-surface-subtle)">
          In context — active filters
        </Text>
        <div className="flex flex-wrap gap-(--inline-2)">
          <Badge onClose={() => {}}>Status: Active</Badge>
          <Badge onClose={() => {}}>Assigned: Chad Ontario</Badge>
          <Badge onClose={() => {}}>Due: This week</Badge>
          <Badge onClose={() => {}}>Type: Claim</Badge>
        </div>
      </div>

    </div>
  )
}
