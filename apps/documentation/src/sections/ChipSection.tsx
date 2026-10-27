import { useState } from 'react'
import { Text, Chip } from '@judi-health/minerva-ds'

export function ChipSection() {
  const [selected, setSelected] = useState(false)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Chip
      </Text>

      <div className="flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          States
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Click to toggle Selected — hover either one to see the hover treatments live.
        </Text>
        <div className="flex items-center gap-(--inline-2)">
          <Chip>Idle</Chip>
          <Chip selected={selected} onClick={() => setSelected((s) => !s)}>
            {selected ? 'Selected' : 'Click me'}
          </Chip>
        </div>
      </div>
    </div>
  )
}
