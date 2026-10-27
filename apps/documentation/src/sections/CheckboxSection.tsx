import { Text, Checkbox } from '@judi-health/minerva-ds'

export function CheckboxSection() {
  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Checkbox
      </Text>

      {/* States */}
      <div className="mb-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          States
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Idle and Selected are interactive — hover or click to see the hover treatments live.
        </Text>
        <div className="flex flex-col gap-(--stack-3)">
          <Checkbox label="Idle" />
          <Checkbox label="Selected" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
        </div>
      </div>

      {/* Disabled */}
      <div className="mb-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Disabled
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          No checked-disabled state — the mark never shows here regardless of value.
        </Text>
        <div className="flex flex-col gap-(--stack-3)">
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled" disabled defaultChecked />
        </div>
      </div>

      {/* Readonly */}
      <div className="mb-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Readonly
        </Text>
        <div className="flex flex-col gap-(--stack-3)">
          <Checkbox label="Readonly" readOnly />
          <Checkbox label="Readonly — checked" readOnly defaultChecked />
          <Checkbox label="Readonly — indeterminate" readOnly indeterminate />
        </div>
      </div>

      {/* Error */}
      <div className="mb-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Error
        </Text>
        <div className="flex flex-col gap-(--stack-3)">
          <Checkbox label="Error" error />
          <Checkbox label="Error — custom message" error errorMessage="You must accept the terms" />
        </div>
      </div>

      {/* Padding */}
      <div className="flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Padding
        </Text>
        <div className="flex flex-col gap-(--stack-3)">
          <Checkbox label="Unpadded" />
          <div className="bg-(--bg-surface-subtle)">
            <Checkbox label="Padded" padding />
          </div>
        </div>
      </div>
    </div>
  )
}
