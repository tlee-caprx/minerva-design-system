import { ButtonGroup, Text } from '@judi-health/minerva-ds'

export function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-(--stack-2)">
      <Text variant="label-md" className="text-(--text-surface-subtle)">
        {label}
      </Text>
      <ButtonGroup className="flex-wrap">
        {children}
      </ButtonGroup>
    </div>
  )
}
