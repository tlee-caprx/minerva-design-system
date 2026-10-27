import { Text } from '@judi-health/minerva-ds'

export function SpacingSection() {
  const tokens: { label: string; token: string }[] = [
    { label: 'space-1',  token: '--space-1' },
    { label: 'space-2',  token: '--space-2' },
    { label: 'space-4',  token: '--space-4' },
    { label: 'space-6',  token: '--space-6' },
    { label: 'space-8',  token: '--space-8' },
    { label: 'space-9',  token: '--space-9' },
    { label: 'space-10', token: '--space-10' },
    { label: 'space-11', token: '--space-11' },
    { label: 'space-12', token: '--space-12' },
    { label: 'space-16', token: '--space-16' },
    { label: 'space-20', token: '--space-20' },
    { label: 'space-24', token: '--space-24' },
    { label: 'space-30', token: '--space-30' },
    { label: 'space-32', token: '--space-32' },
    { label: 'space-36', token: '--space-36' },
    { label: 'space-40', token: '--space-40' },
  ]

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--space-24) text-(--text-surface-base)">
        Spacing
      </Text>
      <div className="flex flex-col gap-(--space-8)">
        {tokens.map(({ label, token }) => (
          <div key={token} className="flex items-center gap-(--space-16)">
            <Text
              variant="label-md"
              className="shrink-0 w-[72px] text-(--text-surface-subtle)"
            >
              {label}
            </Text>
            <div
              className="bg-(--bg-action-primary-idle) h-4 min-w-[2px] rounded-(--radius-xs)"
              style={{ width: `var(${token})` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
