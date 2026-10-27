import { Text } from '@judi-health/minerva-ds'

export function RadiusSection() {
  const tokens: { label: string; token: string }[] = [
    { label: 'none', token: '--radius-none' },
    { label: 'soft', token: '--radius-soft' },
    { label: 'xs',   token: '--radius-xs' },
    { label: 'sm',   token: '--radius-sm' },
    { label: 'md',   token: '--radius-md' },
    { label: 'lg',   token: '--radius-lg' },
    { label: 'xl',   token: '--radius-xl' },
    { label: '2xl',  token: '--radius-2xl' },
    { label: 'full', token: '--radius-full' },
  ]

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--space-24) text-(--text-surface-base)">
        Border Radius
      </Text>
      <div className="flex flex-wrap gap-(--space-24)">
        {tokens.map(({ label, token }) => (
          <div key={token} className="flex flex-col items-center gap-(--space-12)">
            <div
              className="bg-(--bg-action-primary-idle) w-16 h-16"
              style={{ borderRadius: `var(${token})` }}
            />
            <div className="flex flex-col items-center gap-(--space-4)">
              <Text variant="label-lg" className="text-(--text-surface-base)">
                {label}
              </Text>
              <Text variant="label-md" className="text-(--text-surface-subtle)">
                {token}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
