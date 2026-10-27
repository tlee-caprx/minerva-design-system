import { useState } from 'react'
import { Text, Checkbox, Input, Textarea, Tooltip } from '@judi-health/minerva-ds'

export function TextareaSection() {
  const [required, setRequired] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [invalid, setInvalid] = useState(false)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Textarea
      </Text>

      <div className="flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Playground
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Same shell/states as Input — fixed at 4 rows, no icons, no auto-grow.
        </Text>
        <div className="flex flex-wrap items-center gap-(--inline-4)">
          <Checkbox label="Required" checked={required} onChange={(e) => setRequired(e.target.checked)} />
          <Checkbox label="Tooltip" checked={showTooltip} onChange={(e) => setShowTooltip(e.target.checked)} />
          <Checkbox
            label="Instructions"
            checked={showInstructions}
            readOnly={invalid}
            onChange={(e) => setShowInstructions(e.target.checked)}
          />
          <Checkbox
            label="Invalid"
            checked={invalid}
            onChange={(e) => {
              const next = e.target.checked
              setInvalid(next)
              if (next) setShowInstructions(true)
            }}
          />
        </div>
        <div className="flex flex-wrap items-start gap-(--inline-4)">
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Textarea</Text>
            <Textarea
              label="Label"
              placeholder="Placeholder"
              required={required}
              tooltip={showTooltip ? 'Helpful context goes here' : undefined}
              instructions={showInstructions ? 'Helper text goes here' : undefined}
              invalid={invalid}
            />
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Readonly</Text>
            <Textarea label="Label" defaultValue="Can't be edited" readOnly />
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Disabled</Text>
            <Textarea label="Label" disabled />
          </div>
        </div>
      </div>
    </div>
  )
}
