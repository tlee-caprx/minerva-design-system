import { useState } from 'react'
import { Text, Radio } from '@judi-health/minerva-ds'

export function RadioSection() {
  const [selected, setSelected] = useState<'yes' | 'no' | null>('yes')

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Radio
      </Text>
      <div className="flex flex-col gap-(--stack-5)">
        <div className="flex flex-col gap-(--stack-3)">
          <Text variant="label-lg" className="text-(--text-surface-subtle)">
            Interactive group
          </Text>
          <div className="flex items-center gap-(--inline-4)">
            <Radio name="radio-demo" label="Yes" checked={selected === 'yes'} onChange={() => setSelected('yes')} />
            <Radio name="radio-demo" label="No" checked={selected === 'no'} onChange={() => setSelected('no')} />
          </div>
        </div>

        <div className="flex flex-col gap-(--stack-3)">
          <Text variant="label-lg" className="text-(--text-surface-subtle)">
            States
          </Text>
          <div className="flex flex-col gap-(--stack-2)">
            <Radio label="Unselected" />
            <Radio label="Selected" checked onChange={() => {}} />
            <Radio label="Read-only" readOnly />
            <Radio label="Read-only selected" checked readOnly onChange={() => {}} />
            <Radio label="Disabled" disabled />
            <Radio label="Disabled selected" checked disabled onChange={() => {}} />
          </div>
        </div>

        <div className="flex flex-col gap-(--stack-3)">
          <Text variant="label-lg" className="text-(--text-surface-subtle)">
            Padded
          </Text>
          <Radio label="Radio option" padding />
        </div>
      </div>
    </div>
  )
}
