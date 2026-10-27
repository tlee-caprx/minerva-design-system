import { Button, Text, AddIcon, ArrowRightIcon, DeleteIcon, StarFilledIcon } from '@judi-health/minerva-ds'
import { DemoRow } from './DemoRow'

export function ButtonSection() {
  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Button
      </Text>

      {/* Primary */}
      <div className="mb-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Primary
        </Text>
        <DemoRow label="Default">
          <Button variant="primary">Label</Button>
          <Button variant="primary" leftIcon={AddIcon}>Left icon</Button>
          <Button variant="primary" rightIcon={ArrowRightIcon}>Right icon</Button>
          <Button variant="primary" leftIcon={AddIcon} rightIcon={ArrowRightIcon}>Both icons</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" loading rightIcon={ArrowRightIcon}>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" iconOnly><AddIcon /></Button>
          <Button variant="primary" iconOnly loading><StarFilledIcon /></Button>
        </DemoRow>
        <DemoRow label="Destructive">
          <Button variant="primary" destructive>Delete</Button>
          <Button variant="primary" destructive leftIcon={DeleteIcon}>Delete item</Button>
          <Button variant="primary" destructive loading>Deleting</Button>
          <Button variant="primary" destructive disabled>Disabled</Button>
          <Button variant="primary" destructive iconOnly><DeleteIcon /></Button>
        </DemoRow>
      </div>

      {/* Secondary */}
      <div className="mb-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Secondary
        </Text>
        <DemoRow label="Default">
          <Button variant="secondary">Label</Button>
          <Button variant="secondary" leftIcon={AddIcon}>Left icon</Button>
          <Button variant="secondary" rightIcon={ArrowRightIcon}>Right icon</Button>
          <Button variant="secondary" loading>Loading</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="secondary" iconOnly><StarFilledIcon /></Button>
        </DemoRow>
        <DemoRow label="Destructive">
          <Button variant="secondary" destructive>Delete</Button>
          <Button variant="secondary" destructive leftIcon={DeleteIcon}>Delete item</Button>
          <Button variant="secondary" destructive loading>Deleting</Button>
          <Button variant="secondary" destructive disabled>Disabled</Button>
          <Button variant="secondary" destructive iconOnly><DeleteIcon /></Button>
        </DemoRow>
      </div>

      {/* Tertiary */}
      <div className="mb-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Tertiary
        </Text>
        <DemoRow label="Default">
          <Button variant="tertiary">Label</Button>
          <Button variant="tertiary" leftIcon={AddIcon}>Left icon</Button>
          <Button variant="tertiary" rightIcon={ArrowRightIcon}>Right icon</Button>
          <Button variant="tertiary" loading>Loading</Button>
          <Button variant="tertiary" disabled>Disabled</Button>
          <Button variant="tertiary" iconOnly><StarFilledIcon /></Button>
        </DemoRow>
        <DemoRow label="Destructive">
          <Button variant="tertiary" destructive>Delete</Button>
          <Button variant="tertiary" destructive leftIcon={DeleteIcon}>Delete item</Button>
          <Button variant="tertiary" destructive loading>Deleting</Button>
          <Button variant="tertiary" destructive disabled>Disabled</Button>
          <Button variant="tertiary" destructive iconOnly><DeleteIcon /></Button>
        </DemoRow>
      </div>

      {/* Inverse */}
      <div className="flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Inverse
        </Text>
        <div className="p-(--inset-7) bg-(--bg-surface-inverse) rounded-(--radius-md)">
          <DemoRow label="Default">
            <Button variant="inverse">Label</Button>
            <Button variant="inverse" leftIcon={AddIcon}>Left icon</Button>
            <Button variant="inverse" rightIcon={ArrowRightIcon}>Right icon</Button>
            <Button variant="inverse" loading>Loading</Button>
            <Button variant="inverse" disabled>Disabled</Button>
            <Button variant="inverse" iconOnly><StarFilledIcon /></Button>
          </DemoRow>
        </div>
      </div>

      {/* Link */}
      <div className="mt-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Link
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Same colors as Tertiary, but zero padding in both directions — sits flush inline with
          surrounding text (e.g. "View in Document" next to a citation's metadata) rather than
          reserving Tertiary's touch-target height.
        </Text>
        <DemoRow label="Default">
          <Button variant="link">Label</Button>
          <Button variant="link" leftIcon={AddIcon}>Left icon</Button>
          <Button variant="link" rightIcon={ArrowRightIcon}>Right icon</Button>
          <Button variant="link" loading>Loading</Button>
          <Button variant="link" disabled>Disabled</Button>
        </DemoRow>
        <DemoRow label="Destructive">
          <Button variant="link" destructive>Delete</Button>
          <Button variant="link" destructive leftIcon={DeleteIcon}>Delete item</Button>
          <Button variant="link" destructive loading>Deleting</Button>
          <Button variant="link" destructive disabled>Disabled</Button>
        </DemoRow>
      </div>
    </div>
  )
}
