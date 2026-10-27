import { useState } from 'react'
import { Text, Checkbox, Input, PasswordInput, SearchInput, Tooltip, Icon, DollarIcon, EyeIcon } from '@judi-health/minerva-ds'

export function InputSection() {
  const [required, setRequired] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [showLeftIcon, setShowLeftIcon] = useState(false)
  const [showRightIcon, setShowRightIcon] = useState(false)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Input
      </Text>

      <div className="mb-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Playground
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Toggle states below, or hover/click into a field directly to see hover/focus live. Left
          icon/Right icon only apply to the plain Input — Password and Search own those slots
          internally, so they can't accept them.
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
          <Checkbox label="Left icon" checked={showLeftIcon} onChange={(e) => setShowLeftIcon(e.target.checked)} />
          <Checkbox label="Right icon" checked={showRightIcon} onChange={(e) => setShowRightIcon(e.target.checked)} />
        </div>
        <div className="flex flex-wrap items-start gap-(--inline-4)">
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Input</Text>
            <Input
              label="Label"
              placeholder="Placeholder"
              required={required}
              tooltip={showTooltip ? 'Helpful context goes here' : undefined}
              instructions={showInstructions ? 'Helper text goes here' : undefined}
              invalid={invalid}
              leftIcon={showLeftIcon ? <Icon icon={DollarIcon} size="small" className="text-(--icon-control-default)" /> : undefined}
              rightIcon={showRightIcon ? <Icon icon={EyeIcon} size="regular" className="text-(--icon-action-secondary-idle)" /> : undefined}
            />
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">PasswordInput</Text>
            <PasswordInput
              label="Password"
              placeholder="Placeholder"
              required={required}
              tooltip={showTooltip ? 'Helpful context goes here' : undefined}
              instructions={showInstructions ? 'Helper text goes here' : undefined}
              invalid={invalid}
            />
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">SearchInput</Text>
            <SearchInput
              label="Search"
              placeholder="Placeholder"
              required={required}
              tooltip={showTooltip ? 'Helpful context goes here' : undefined}
              instructions={showInstructions ? 'Helper text goes here' : undefined}
              invalid={invalid}
            />
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Readonly</Text>
            <Input label="Label" defaultValue="Can't be edited" readOnly />
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Disabled</Text>
            <Input label="Label" disabled />
          </div>
        </div>
      </div>
    </div>
  )
}
