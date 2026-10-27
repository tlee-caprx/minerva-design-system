import { Text } from '@judi-health/minerva-ds'
import type { TextVariant } from '@judi-health/minerva-ds'

export function TypographySection() {
  const styles: { label: string; variant: TextVariant }[] = [
    { label: 'Heading XL', variant: 'heading-xl' },
    { label: 'Heading LG', variant: 'heading-lg' },
    { label: 'Heading MD', variant: 'heading-md' },
    { label: 'Heading SM', variant: 'heading-sm' },
    { label: 'Heading XS', variant: 'heading-xs' },
    { label: 'Body LG',    variant: 'body-lg' },
    { label: 'Body MD',    variant: 'body-md' },
    { label: 'Body SM',    variant: 'body-sm' },
    { label: 'Label LG',   variant: 'label-lg' },
    { label: 'Label MD',   variant: 'label-md' },
    { label: 'Label SM',   variant: 'label-sm' },
  ]

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--space-24) text-(--text-surface-base)">
        Typography
      </Text>
      <div className="flex flex-col gap-(--space-12)">
        {styles.map(({ label, variant }) => (
          <div key={label} className="flex items-baseline gap-(--space-24)">
            <Text
              variant="label-md"
              className="shrink-0 w-24 text-(--text-surface-subtle)"
            >
              {label}
            </Text>
            <Text
              as="p"
              variant={variant}
              className="text-(--text-surface-base)"
            >
              The quick brown fox jumps over the lazy dog
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}
