import { Text } from '@judi-health/minerva-ds'

export function ColorsSection() {
  const groups: {
    label: string
    swatches: { label: string; token: string; border?: boolean }[]
  }[] = [
    {
      label: 'Background — Action',
      swatches: [
        { label: 'primary-idle',    token: '--bg-action-primary-idle' },
        { label: 'primary-hover',   token: '--bg-action-primary-hover' },
        { label: 'primary-pressed', token: '--bg-action-primary-pressed' },
        { label: 'primary-critical-idle',    token: '--bg-action-primary-critical-idle' },
        { label: 'primary-critical-hover',   token: '--bg-action-primary-critical-hover' },
        { label: 'secondary-idle',  token: '--bg-action-secondary-idle', border: true },
        { label: 'inverse-idle',    token: '--bg-action-inverse-idle', border: true },
        { label: 'neutral-idle',    token: '--bg-action-neutral-idle', border: true },
      ],
    },
    {
      label: 'Background — Feedback',
      swatches: [
        { label: 'success-base',          token: '--bg-feedback-success-base' },
        { label: 'success-muted',         token: '--bg-feedback-success-muted' },
        { label: 'success-inverse',       token: '--bg-feedback-success-inverse', border: true },
        { label: 'warning-base',          token: '--bg-feedback-warning-base' },
        { label: 'warning-inverse',       token: '--bg-feedback-warning-inverse', border: true },
        { label: 'error-base',            token: '--bg-feedback-error-base' },
        { label: 'error-muted',           token: '--bg-feedback-error-muted' },
        { label: 'error-inverse',         token: '--bg-feedback-error-inverse', border: true },
        { label: 'info-base',             token: '--bg-feedback-informational-base' },
        { label: 'info-inverse',          token: '--bg-feedback-informational-inverse', border: true },
      ],
    },
    {
      label: 'Background — Surface',
      swatches: [
        { label: 'surface-base',    token: '--bg-surface-base', border: true },
        { label: 'surface-subtle',  token: '--bg-surface-subtle', border: true },
        { label: 'surface-muted',   token: '--bg-surface-muted', border: true },
        { label: 'surface-inverse', token: '--bg-surface-inverse' },
        { label: 'accent-primary',  token: '--bg-surface-accent-primary' },
        { label: 'accent-secondary', token: '--bg-surface-accent-secondary' },
        { label: 'accent-tertiary', token: '--bg-surface-accent-tertiary' },
      ],
    },
    {
      label: 'Border — Action',
      swatches: [
        { label: 'secondary-idle',    token: '--border-action-secondary-idle', border: true },
        { label: 'secondary-hover',   token: '--border-action-secondary-hover', border: true },
        { label: 'secondary-pressed', token: '--border-action-secondary-pressed', border: true },
        { label: 'critical-idle',     token: '--border-action-secondary-critical-idle', border: true },
      ],
    },
    {
      label: 'Border — Surface',
      swatches: [
        { label: 'surface-base',    token: '--border-surface-base', border: true },
        { label: 'surface-subtle',  token: '--border-surface-subtle', border: true },
        { label: 'surface-inverse', token: '--border-surface-inverse' },
      ],
    },
    {
      label: 'Text — Action',
      swatches: [
        { label: 'primary-idle',          token: '--text-action-primary-idle', border: true },
        { label: 'secondary-idle',        token: '--text-action-secondary-idle', border: true },
        { label: 'inverse-idle',          token: '--text-action-inverse-idle', border: true },
        { label: 'hyperlink',             token: '--text-action-hyperlink', border: true },
        { label: 'base-idle',             token: '--text-action-base-idle', border: true },
        { label: 'base-disabled',         token: '--text-action-base-disabled', border: true },
      ],
    },
    {
      label: 'Text — Surface',
      swatches: [
        { label: 'surface-base',    token: '--text-surface-base', border: true },
        { label: 'surface-subtle',  token: '--text-surface-subtle', border: true },
        { label: 'surface-inverse', token: '--text-surface-inverse', border: true },
      ],
    },
  ]

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--space-24) text-(--text-surface-base)">
        Colors
      </Text>
      <div className="flex flex-col gap-(--space-32)">
        {groups.map(({ label, swatches }) => (
          <div key={label}>
            <Text as="h3" variant="label-lg" className="mb-(--space-16) text-(--text-surface-subtle)">
              {label}
            </Text>
            <div className="flex flex-wrap gap-(--space-12)">
              {swatches.map(({ label: swatchLabel, token, border }) => (
                <div key={swatchLabel} className="flex flex-col items-center gap-(--space-6)">
                  <div
                    className="w-12 h-12 rounded-(--radius-sm)"
                    style={{
                      background: `var(${token})`,
                      border:     border ? '1px solid var(--border-surface-base)' : undefined,
                    }}
                  />
                  <Text
                    variant="label-sm"
                    className="text-(--text-surface-subtle) text-center max-w-16"
                  >
                    {swatchLabel}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
