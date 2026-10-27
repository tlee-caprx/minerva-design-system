import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { AddIcon, AIIcon, ArrowRightIcon, DeleteIcon, StarFilledIcon, ChevronDownIcon } from '../components/ui/Icon'
import { AppLayout } from '../components/layout/AppLayout'
import { SideNavItem, SideNavGroup } from '../components/navigation/SideNav'
import { ButtonGroup } from '../components/ui/ButtonGroup'
import { Lozenge } from '../components/ui/Lozenge'
import { MetaItem } from '../components/ui/MetaItem'
import { Steps } from '../components/ui/Steps'
import { KeyCaseDetails } from '../components/ui/KeyCaseDetails'
import { Tag } from '../components/ui/Tag'
import type { TagVariant } from '../components/ui/Tag'
import { Badge } from '../components/ui/Badge'
import { Text } from '../components/ui/Text'
import type { TextVariant } from '../components/ui/Text'
import { ClockIcon } from '../components/ui/Icon'
import { Tab, TabSet } from '../components/ui/TabSet'
import { Checkbox } from '../components/ui/Checkbox'
import { Radio } from '../components/ui/Radio'
import { Notification } from '../components/ui/Notification'
import { DocumentViewer } from '../components/ui/DocumentViewer'
import { Chip } from '../components/ui/Chip'
import { Input, PasswordInput, SearchInput, Textarea } from '../components/ui/Input'
import { Dropdown, MenuGroup, MenuItem, MenuSearchBar, MenuPanel, MultiSelectDropdown } from '../components/ui/Dropdown'
import { AIRecommendationCard } from '../components/ui/AIRecommendationCard'
import { ClinicalCriteriaTab } from '../components/ui/ClinicalCriteriaTab'
import { Collapse } from '../components/ui/Collapse'
import type { CollapseStyle } from '../components/ui/Collapse'
import { Tooltip, TooltipBubble } from '../components/ui/Tooltip'
import type { TooltipBeak } from '../components/ui/Tooltip'
import { Message } from '../components/ui/Message'
import type { MessageVariant } from '../components/ui/Message'
import { Modal, ModalContent } from '../components/ui/Modal'
import { Table, TableCell, TableCellHeader, Pagination } from '../components/ui/Table'
import { Icon, DollarIcon, EyeIcon, InfoCircleIcon, EditIcon, LockIcon, DocumentIcon } from '../components/ui/Icon'
import { ModuleLanding } from './pages/ModuleLanding'
import { TapPage } from './pages/TapPage'
import { JudiAssistantDocumentation } from './pages/JudiAssistantDocumentation'

document.documentElement.setAttribute('data-theme', 'minerva')

type Theme = 'minerva' | 'evolution'
type AppPage = 'modules' | 'documentation' | 'tap'
type Section = 'Typography' | 'Colors' | 'Spacing' | 'Radius' | 'Button' | 'Checkbox' | 'Radio' | 'Notification' | 'Document Viewer' | 'Chip' | 'Input' | 'Textarea' | 'Dropdown' | 'AI Card' | 'Judi Assistant' | 'Prior Auth Tabs' | 'Collapse' | 'Tooltip' | 'Message' | 'Modal' | 'Table' | 'Tag & Badge' | 'Tabs' | 'Stepper' | 'Key Case Details' | 'Shell'

const NAV_GROUPS: { label: string; sections: Section[] }[] = [
  { label: 'Foundations', sections: ['Typography', 'Colors', 'Spacing', 'Radius'] },
  { label: 'Actions', sections: ['Button', 'Chip'] },
  { label: 'Form Controls', sections: ['Checkbox', 'Radio', 'Input', 'Textarea', 'Dropdown'] },
  { label: 'Content & Feedback', sections: ['AI Card', 'Judi Assistant', 'Notification', 'Document Viewer', 'Collapse', 'Tooltip', 'Message', 'Modal', 'Tag & Badge'] },
  { label: 'Navigation & Data', sections: ['Prior Auth Tabs', 'Tabs', 'Stepper', 'Key Case Details', 'Table', 'Shell'] },
]

// ─── Typography ───────────────────────────────────────────────────────────────

function TypographySection() {
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

// ─── Colors ───────────────────────────────────────────────────────────────────

function ColorsSection() {
  const groups: {
    label: string
    swatches: { label: string; token: string; border?: boolean }[]
  }[] = [
    {
      label: 'Background — Action',
      swatches: [
        { label: 'primary-idle',    token: '--bg-action-primary-idle' },
        { label: 'primary-hover',   token: '--bg-action-primary-hover' },
        { label: 'primary-pressed', token: '--bg-action-primary-pressed' },
        { label: 'primary-critical-idle',    token: '--bg-action-primary-critical-idle' },
        { label: 'primary-critical-hover',   token: '--bg-action-primary-critical-hover' },
        { label: 'secondary-idle',  token: '--bg-action-secondary-idle', border: true },
        { label: 'inverse-idle',    token: '--bg-action-inverse-idle', border: true },
        { label: 'neutral-idle',    token: '--bg-action-neutral-idle', border: true },
      ],
    },
    {
      label: 'Background — Feedback',
      swatches: [
        { label: 'success-base',          token: '--bg-feedback-success-base' },
        { label: 'success-muted',         token: '--bg-feedback-success-muted' },
        { label: 'success-inverse',       token: '--bg-feedback-success-inverse', border: true },
        { label: 'warning-base',          token: '--bg-feedback-warning-base' },
        { label: 'warning-inverse',       token: '--bg-feedback-warning-inverse', border: true },
        { label: 'error-base',            token: '--bg-feedback-error-base' },
        { label: 'error-muted',           token: '--bg-feedback-error-muted' },
        { label: 'error-inverse',         token: '--bg-feedback-error-inverse', border: true },
        { label: 'info-base',             token: '--bg-feedback-informational-base' },
        { label: 'info-inverse',          token: '--bg-feedback-informational-inverse', border: true },
      ],
    },
    {
      label: 'Background — Surface',
      swatches: [
        { label: 'surface-base',    token: '--bg-surface-base', border: true },
        { label: 'surface-subtle',  token: '--bg-surface-subtle', border: true },
        { label: 'surface-muted',   token: '--bg-surface-muted', border: true },
        { label: 'surface-inverse', token: '--bg-surface-inverse' },
        { label: 'accent-primary',  token: '--bg-surface-accent-primary' },
        { label: 'accent-secondary', token: '--bg-surface-accent-secondary' },
        { label: 'accent-tertiary', token: '--bg-surface-accent-tertiary' },
      ],
    },
    {
      label: 'Border — Action',
      swatches: [
        { label: 'secondary-idle',    token: '--border-action-secondary-idle', border: true },
        { label: 'secondary-hover',   token: '--border-action-secondary-hover', border: true },
        { label: 'secondary-pressed', token: '--border-action-secondary-pressed', border: true },
        { label: 'critical-idle',     token: '--border-action-secondary-critical-idle', border: true },
      ],
    },
    {
      label: 'Border — Surface',
      swatches: [
        { label: 'surface-base',    token: '--border-surface-base', border: true },
        { label: 'surface-subtle',  token: '--border-surface-subtle', border: true },
        { label: 'surface-inverse', token: '--border-surface-inverse' },
      ],
    },
    {
      label: 'Text — Action',
      swatches: [
        { label: 'primary-idle',          token: '--text-action-primary-idle', border: true },
        { label: 'secondary-idle',        token: '--text-action-secondary-idle', border: true },
        { label: 'inverse-idle',          token: '--text-action-inverse-idle', border: true },
        { label: 'hyperlink',             token: '--text-action-hyperlink', border: true },
        { label: 'base-idle',             token: '--text-action-base-idle', border: true },
        { label: 'base-disabled',         token: '--text-action-base-disabled', border: true },
      ],
    },
    {
      label: 'Text — Surface',
      swatches: [
        { label: 'surface-base',    token: '--text-surface-base', border: true },
        { label: 'surface-subtle',  token: '--text-surface-subtle', border: true },
        { label: 'surface-inverse', token: '--text-surface-inverse', border: true },
      ],
    },
  ]

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--space-24) text-(--text-surface-base)">
        Colors
      </Text>
      <div className="flex flex-col gap-(--space-32)">
        {groups.map(({ label, swatches }) => (
          <div key={label}>
            <Text as="h3" variant="label-lg" className="mb-(--space-16) text-(--text-surface-subtle)">
              {label}
            </Text>
            <div className="flex flex-wrap gap-(--space-12)">
              {swatches.map(({ label: swatchLabel, token, border }) => (
                <div key={swatchLabel} className="flex flex-col items-center gap-(--space-6)">
                  <div
                    className="w-12 h-12 rounded-(--radius-sm)"
                    style={{
                      background: `var(${token})`,
                      border:     border ? '1px solid var(--border-surface-base)' : undefined,
                    }}
                  />
                  <Text
                    variant="label-sm"
                    className="text-(--text-surface-subtle) text-center max-w-16"
                  >
                    {swatchLabel}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

function SpacingSection() {
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

// ─── Button ───────────────────────────────────────────────────────────────────

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
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

function ButtonSection() {
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

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function CheckboxSection() {
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

// ─── Chip ─────────────────────────────────────────────────────────────────────

function RadioSection() {
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

// ─── Notification ────────────────────────────────────────────────────────────

function NotificationSection() {
  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Notification
      </Text>
      <div className="bg-(--bg-surface-subtle) p-(--inset-7)">
        <Notification>
          <div className="flex flex-col gap-(--stack-2) px-(--inset-3) py-(--inset-6)">
            <div className="flex flex-col gap-(--stack-1)">
              <div className="flex items-center gap-(--inline-1)">
                <Text variant="body-sm" weight="semibold" className="text-(--text-surface-base)">
                  01/01/2026 02:41PM EST
                </Text>
                <span aria-label="Unread" className="h-(--space-8) w-(--space-8) rounded-(--radius-full) bg-(--bg-action-primary-idle)" />
              </div>
              <Tag variant="system" className="self-start">Judi AI</Tag>
            </div>
            <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
              Judi AI has completed work on Case #123456
            </Text>
            <Text variant="body-md" className="text-(--text-surface-base)">
              Work on Case #123456 is done and the case locked back to you. Please review and take a look at the changes.
            </Text>
            <div className="flex items-center gap-(--inline-2)">
              <Button variant="link">Mark As Read</Button>
              <Button variant="link">Open</Button>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  )
}

// ─── Document Viewer ─────────────────────────────────────────────────────────

function DocumentViewerSection() {
  return (
    <div className="min-h-full flex flex-col gap-(--stack-5)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Document Viewer
        </Text>
        <Text as="p" variant="body-md" className="text-(--text-surface-subtle)">
          A Judi wrapper around EmbedPDF’s ready-made viewer UI. It defaults to light mode and can be used in a utility panel, modal, or full-page document experience.
        </Text>
      </div>
      <DocumentViewer
        src="https://snippet.embedpdf.com/ebook.pdf"
        config={{ tabBar: 'never' }}
        className="h-[640px]"
      />
    </div>
  )
}

function ChipSection() {
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

// ─── Input ────────────────────────────────────────────────────────────────────

function InputSection() {
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

// ─── Textarea ─────────────────────────────────────────────────────────────────

function TextareaSection() {
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

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function DropdownSection() {
  const [required, setRequired] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Dropdown
      </Text>

      <div className="flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Playground
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Click the trigger to open it, then click an option — single-select closes automatically
          and updates the value, since none of these items have a checkbox.
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
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Dropdown</Text>
            <Dropdown
              label="Label"
              placeholder="Choose an option"
              value={selectedValue}
              onSelect={setSelectedValue}
              onClear={() => setSelectedValue(undefined)}
              required={required}
              tooltip={showTooltip ? 'Helpful context goes here' : undefined}
              instructions={showInstructions ? 'Helper text goes here' : undefined}
              invalid={invalid}
              searchBar={<MenuSearchBar placeholder="Search options" />}
            >
              <MenuGroup label="Section label" />
              <MenuItem label="Selected option" />
              <MenuItem label="Another option" />
              <MenuItem label="Delete option" destructive />
            </Dropdown>
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Readonly</Text>
            <Dropdown label="Label" value="Can't be changed" readOnly />
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Disabled</Text>
            <Dropdown label="Label" placeholder="Choose an option" disabled />
          </div>
        </div>
      </div>

      <div className="mt-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Multi-select
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          MenuItems get `checkbox` forced on — clicking doesn't close the menu. Selections show as
          badges below (click × to remove one), with Clear All once anything's selected.
        </Text>
        <div className="w-[280px]">
          <MultiSelectDropdown
            label="Label"
            placeholder="Choose options"
            required={required}
            tooltip={showTooltip ? 'Helpful context goes here' : undefined}
            instructions={showInstructions ? 'Helper text goes here' : undefined}
            invalid={invalid}
          >
            <MenuItem label="Option A" />
            <MenuItem label="Option B" />
            <MenuItem label="Option C" />
            <MenuItem label="Option D" />
            <MenuItem label="Option E" />
            <MenuItem label="Option F" />
            <MenuItem label="Option G" />
            <MenuItem label="Option H" />
          </MultiSelectDropdown>
        </div>
      </div>

      <div className="mt-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Menu (MenuGroup / MenuItem)
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          The building blocks for the options panel — MenuPanel fills whatever width its container
          gives it (matches the trigger automatically inside a real Dropdown); these standalone
          demos wrap it in a fixed 200px box. Hover/click the rows below to see real hover and
          pressed states.
        </Text>
        <div className="w-[200px]">
          <MenuPanel searchBar={<MenuSearchBar placeholder="Search options" />}>
            <MenuGroup label="Section label" />
            <MenuItem label="Idle option" />
            <MenuItem label="Selected option" selected />
            <MenuItem label="Delete option" destructive />
            <MenuItem label="Delete option (selected)" destructive selected />
            <MenuItem label="Disabled option" disabled />
          </MenuPanel>
        </div>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Multi-select variant — checkbox is visual only (see the component's own doc comment for why), the row is still the single click target.
        </Text>
        <div className="w-[200px]">
          <MenuPanel>
            <MenuItem label="Unselected option" checkbox />
            <MenuItem label="Selected option" checkbox selected />
            <MenuItem label="Disabled option" checkbox disabled />
          </MenuPanel>
        </div>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          8 options, no search bar — scrolls after 5.
        </Text>
        <div className="w-[200px]">
          <MenuPanel>
            {Array.from({ length: 8 }, (_, i) => (
              <MenuItem key={i} label={`Option ${i + 1}`} />
            ))}
          </MenuPanel>
        </div>
      </div>
    </div>
  )
}

// ─── AI Card ──────────────────────────────────────────────────────────────────

function AICardSection() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [questionResolution, setQuestionResolution] = useState<'review' | 'kept' | 'updated'>('review')
  const [outreachState, setOutreachState] = useState<'needs-information' | 'draft-ready' | 'waiting-on-prescriber'>('needs-information')
  const [loadingAction, setLoadingAction] = useState<
    'case-start' | 'case-attach' | 'answer-updated' | 'draft-generating' | 'fax-sending' | null
  >(null)
  const runDemoAction = (action: NonNullable<typeof loadingAction>, onComplete?: () => void) => {
    setLoadingAction(action)
    window.setTimeout(() => {
      setLoadingAction(null)
      onComplete?.()
    }, 2000)
  }
  const loadingText = {
    'case-start': 'Starting New Case…',
    'case-attach': 'Attaching to Case 123456…',
    'answer-updated': 'Judi AI is updating to its answer…',
    'draft-generating': 'Judi AI is generating outbound communication…',
    'fax-sending': 'Sending fax outreach…',
  } as const
  const cindyCitations = [
    {
      excerpt: 'Prior authorization request for Wegovy (semaglutide) tablets for chronic weight management.',
      docType: 'Prior Authorization Request',
      pages: [1],
      timestamp: '08/25/2026 10:14 AM EST',
    },
    {
      excerpt: 'Office visit documents a baseline BMI of 28.6 kg/m² and a diagnosis of hypertension.',
      docType: 'Office Visit Note',
      pages: [2],
      timestamp: '08/25/2026 10:16 AM EST',
    },
  ].map((citation) => ({
    ...citation,
    onViewInDocument: () => setSelectedSource(`${citation.docType}, page ${citation.pages.join(', ')}`),
  }))
  const caseMatchCitations = [cindyCitations[0]]
  const clinicalCitations = [cindyCitations[1]]

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        AI Card
      </Text>
      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        Separate workflow examples that share the same card treatment. All member and clinical details below are fictional demo data.
      </Text>

      <div className="flex flex-col gap-(--stack-5) w-[672px] p-(--inset-7) bg-(--bg-surface-base) rounded-(--radius-md)">
        <div className="flex flex-col gap-(--stack-3)">
          <Text variant="label-lg" className="text-(--text-surface-subtle)">
            Case match recommendation
          </Text>
          <AIRecommendationCard
            variant="recommendation"
            summary={[
              { text: 'Member name Cindy Walter and requested drug Wegovy (semaglutide) tablets match an existing open prior authorization case, PA-104278, submitted on August 25, 2026.', citations: [1] },
            ]}
            actions={
              <>
                <Button variant="tertiary" onClick={() => runDemoAction('case-start')}>Start New Case</Button>
                <Button variant="secondary" onClick={() => runDemoAction('case-attach')}>Attach To Case 123456</Button>
              </>
            }
            citations={caseMatchCitations}
            loading={loadingAction === 'case-start' || loadingAction === 'case-attach'}
            loadingText={loadingAction ? loadingText[loadingAction] : undefined}
          />
        </div>

        <div className="flex flex-col gap-(--stack-4)">
          <Text variant="label-lg" className="text-(--text-surface-subtle)">
            Questionnaire answer assistance
          </Text>
        <div className="flex flex-col gap-(--stack-1)">
          <Text variant="label-md" className="text-(--text-surface-subtle)">
            Demo question
          </Text>
          <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
            At Wegovy initiation, does Cindy Walter have a baseline BMI of 27.0–29.9 kg/m² and at least one documented weight-related comorbidity?
          </Text>
          <Text variant="body-sm" className="text-(--text-surface-subtle)">
            Optional current answer: Yes
          </Text>
        </div>
        <AIRecommendationCard
          variant="agrees"
          summary={[
            { text: 'The current answer, Yes, matches the submitted documentation.' },
            { text: ' Cindy Walter’s baseline BMI is 28.6 kg/m² and hypertension is documented.', citations: [1] },
          ]}
          citations={clinicalCitations}
        />
        {questionResolution === 'review' && (
          <AIRecommendationCard
            key="question-review"
            variant="disagrees"
            summary={[
              { text: 'Judi AI recommends Yes.' },
              { text: ' The submitted records document a baseline BMI of 28.6 kg/m² and hypertension.', citations: [1] },
              { text: ' The current response is No.' },
            ]}
            comparison={{ recommended: 'Yes', current: 'No' }}
            actions={
              <>
                <Button variant="tertiary" onClick={() => setQuestionResolution('kept')}>Keep Answer</Button>
                <Button variant="secondary" onClick={() => runDemoAction('answer-updated', () => setQuestionResolution('updated'))}>Update To Judi AI Answer</Button>
              </>
            }
            citations={clinicalCitations}
            loading={loadingAction === 'answer-updated'}
            loadingText={loadingAction ? loadingText[loadingAction] : undefined}
          />
        )}
        <AIRecommendationCard
          variant="answered"
          summary={[
            { text: 'Yes.' },
            { text: ' At initiation, Cindy Walter has a documented BMI of 28.6 kg/m² and hypertension, satisfying this demo criterion.', citations: [1] },
          ]}
          citations={clinicalCitations}
        />

        {questionResolution === 'kept' && (
          <AIRecommendationCard
            key="question-kept"
            variant="answer-kept"
            summary={[
              { text: 'The current answer remains No.' },
              { text: ' Judi AI found documentation supporting Yes, but the reviewer kept the original response.', citations: [1] },
            ]}
            citations={clinicalCitations}
          />
        )}
        {questionResolution === 'updated' && (
          <AIRecommendationCard
            key="question-updated"
            variant="ai-answer-updated"
            defaultCollapsed
            summary={[
              { text: 'The answer was updated to Yes.' },
              { text: ' Cindy Walter’s documented baseline BMI and hypertension support that response.', citations: [1] },
            ]}
            citations={clinicalCitations}
          />
        )}
        </div>

        <div className="flex flex-col gap-(--stack-3)">
          <Text variant="label-lg" className="text-(--text-surface-subtle)">
            Missing information outreach
          </Text>

        {outreachState === 'needs-information' && (
          <AIRecommendationCard
            key="needs-information"
            variant="not-enough-information"
            summary={[
              { text: 'Judi AI found the Wegovy tablet request', citations: [1] },
              { text: ' but could not locate a dated baseline BMI or documentation of a qualifying weight-related condition.' },
            ]}
            citations={caseMatchCitations}
            actions={<Button variant="secondary" onClick={() => runDemoAction('draft-generating', () => setOutreachState('draft-ready'))}>Generate Outbound Communication</Button>}
            loading={loadingAction === 'draft-generating'}
            loadingText={loadingAction ? loadingText[loadingAction] : undefined}
          />
        )}

        {/* Draft generated, awaiting explicit send */}
        {outreachState === 'draft-ready' && (
          <AIRecommendationCard
            key="draft-ready"
            variant="outbound-draft-ready"
            summary="A fax draft requesting Cindy Walter’s baseline BMI and relevant clinical documentation is ready for review."
            prescriber={{ name: 'Dr. Sarah Mitchell, MD', fax: '555-234-5678', sentAt: 'Generated 11/24/26 at 02:14PM' }}
            actions={
              <>
                <Button variant="tertiary" onClick={() => setOutreachState('needs-information')}>Discard</Button>
                <Button variant="secondary" onClick={() => runDemoAction('fax-sending', () => setOutreachState('waiting-on-prescriber'))}>Send via Fax</Button>
              </>
            }
            loading={loadingAction === 'fax-sending'}
            loadingText={loadingAction ? loadingText[loadingAction] : undefined}
          />
        )}
        {outreachState === 'waiting-on-prescriber' && (
          <AIRecommendationCard
            key="waiting-on-prescriber"
            variant="waiting-on-prescriber"
            summary="The request for missing clinical documentation was sent to the prescriber. Judi AI is awaiting a response before recommending an answer."
            prescriber={{ name: 'Dr. Sarah Mitchell, MD', fax: '555-234-5678', sentAt: '11/24/26 at 02:14PM' }}
            actions={<Button variant="secondary">View Outbound Communication</Button>}
          />
        )}
        </div>
        {selectedSource && (
          <Text variant="body-sm" className="text-(--text-surface-subtle)">
            Selected source: {selectedSource}
          </Text>
        )}
      </div>
    </div>
  )
}

// ─── Prior Auth Tabs ─────────────────────────────────────────────────────────

function ClinicalCriteriaTabSection() {
  const [questionOneAnswer, setQuestionOneAnswer] = useState<'yes' | 'no' | null>(null)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Prior Auth Tabs
      </Text>
      <ClinicalCriteriaTab
        criteria={[
          {
            id: 'acute-migraine-initial',
            title: 'Acute Migraine Agents Initial Review',
            content: (
              <div className="flex flex-col gap-(--stack-4)">
                <Button variant="tertiary" className="self-start">
                  Supporting Criteria Document
                </Button>
                <div className="flex flex-col gap-(--stack-4)">
                  <div className="flex items-start justify-between gap-(--inline-4)">
                    <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
                      1. Does the patient have cancer chemotherapy-related nausea and vomiting?
                    </Text>
                    <div className="flex shrink-0 items-center gap-(--inline-2)">
                      <Tag variant="system">New</Tag>
                      <Tag variant="info">Internal</Tag>
                    </div>
                  </div>
                  <div className="flex items-center gap-(--inline-4)">
                    <Radio
                      name="question-one"
                      label="Yes"
                      checked={questionOneAnswer === 'yes'}
                      onChange={() => setQuestionOneAnswer('yes')}
                    />
                    <Radio
                      name="question-one"
                      label="No"
                      checked={questionOneAnswer === 'no'}
                      onChange={() => setQuestionOneAnswer('no')}
                    />
                  </div>
                  <Button variant="tertiary" leftIcon={AddIcon} className="self-start">
                    Remaining Questions
                  </Button>
                </div>
              </div>
            ),
          },
          {
            id: 'antidepressants-renewal',
            title: 'Antidepressants Renewal',
            content: <Text variant="body-md" className="text-(--text-surface-subtle)">Clinical review criteria content.</Text>,
          },
          {
            id: 'elmiron-initial',
            title: 'Elmiron Initial Review',
            content: <Text variant="body-md" className="text-(--text-surface-subtle)">Clinical review criteria content.</Text>,
          },
          {
            id: 'biologic-immunomodulators-initial',
            title: 'Biologic Immunomodulators Initial Review',
            content: <Text variant="body-md" className="text-(--text-surface-subtle)">Clinical review criteria content.</Text>,
          },
        ]}
      />
    </div>
  )
}

// ─── Collapse ─────────────────────────────────────────────────────────────────

const COLLAPSE_STYLES: CollapseStyle[] = ['default', 'underline', 'blank', 'underline-flush', 'blank-flush', 'unpadded']

function CollapseSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Collapse
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        Two independent props: `style` (stroke/radius/padding treatment) and `trigger`
        (chevron vs. checkbox). Header is one clickable/keyboard-operable trigger —
        actions on the right stop propagation so they don't toggle it.
      </Text>

      <div className="flex flex-col gap-(--stack-5) max-w-[560px]">
        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            Style variants (chevron trigger)
          </Text>
          <div className="flex flex-col gap-(--stack-4)">
            {COLLAPSE_STYLES.map((style) => (
              <Collapse key={style} style={style} title={`${style} — click to expand`} defaultOpen={style === 'default'}>
                <Text variant="body-md" className="text-(--text-surface-subtle)">
                  This is the body content for the "{style}" style. It can contain any
                  content — text, buttons, forms, whatever the consumer needs.
                </Text>
              </Collapse>
            ))}
          </div>
        </div>

        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            Checkbox trigger
          </Text>
          <div className="flex flex-col gap-(--stack-4)">
            <Collapse style="default" trigger="checkbox" title="Default, checkbox trigger" defaultOpen>
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                The checkbox is a visual-only state indicator — the whole header is
                still the single click/keyboard target, same as the chevron variant.
              </Text>
            </Collapse>
            <Collapse style="unpadded" trigger="checkbox" title="Unpadded, checkbox trigger">
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                Unpadded body content — 16px top/bottom, no left/right padding.
              </Text>
            </Collapse>
          </div>
        </div>

        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            With header actions
          </Text>
          <Collapse
            style="default"
            title="Section with actions"
            actions={
              <Button variant="tertiary" onClick={() => setModalOpen(true)}>
                Action
              </Button>
            }
          >
            <Text variant="body-md" className="text-(--text-surface-subtle)">
              Clicking "Action" above does not toggle this section open/closed — it
              stops propagation before it reaches the header's click handler. It opens
              the Modal component instead.
            </Text>
          </Collapse>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Modal title"
          leftAction={<Button variant="tertiary" onClick={() => setModalOpen(false)}>Tertiary</Button>}
          rightActions={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Secondary</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>Primary</Button>
            </>
          }
        >
          <Text variant="body-md" className="text-(--text-surface-base)">
            This modal was opened from the "Action" button inside the Collapse demo above.
          </Text>
        </Modal>
      </div>
    </div>
  )
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

const TOOLTIP_BEAKS: TooltipBeak[] = ['top', 'bottom', 'left', 'right', 'none']

function TooltipSection() {
  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Tooltip
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        Wraps any trigger element. Shows on hover and focus (keyboard accessible),
        with `role="tooltip"` + `aria-describedby` wired up. `beak` controls which
        edge the arrow protrudes from — the tooltip sits on the opposite side.
      </Text>

      <div className="flex flex-wrap gap-(--layout-3) mb-(--layout-3)">
        {TOOLTIP_BEAKS.map((beak) => (
          <div key={beak} className="flex flex-col items-start gap-(--stack-3) p-(--inset-6)">
            <Text variant="label-md" className="text-(--text-surface-subtle)">
              beak: {beak}
            </Text>
            <TooltipBubble content={`This is a tooltip with beak="${beak}".`} beak={beak} />
          </div>
        ))}
      </div>

      <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
        Interactive (hover or focus the icon)
      </Text>
      <div className="flex flex-wrap items-center gap-(--layout-3)">
        {TOOLTIP_BEAKS.map((beak) => (
          <div key={beak} className="inline-flex items-center gap-(--inline-1)">
            <Text variant="body-md" className="text-(--text-surface-base)">
              {beak}
            </Text>
            <Tooltip
              content="This is a tooltip with a bit more text in it, to check wrapping behavior at the max width."
              beak={beak}
            >
              <span tabIndex={0}>
                <Icon icon={InfoCircleIcon} size="small" className="text-(--icon-surface-base)" />
              </span>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Message ──────────────────────────────────────────────────────────────────

const MESSAGE_VARIANTS: MessageVariant[] = ['informational', 'error', 'warning', 'success']

function MessageSection() {
  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Message
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        Icon, content (optional header + body), optional action — 8px between each. Pass a custom icon when the message needs a contextual visual, such as Judi AI.
        Pass a `Button variant="tertiary" unpadded` for the action so it sits flush
        at exactly the text's line-height.
      </Text>

      <div className="flex flex-col gap-(--stack-4) max-w-[560px]">
        {MESSAGE_VARIANTS.map((variant) => (
          <Message
            key={variant}
            variant={variant}
            header={`${variant.charAt(0).toUpperCase()}${variant.slice(1)} message`}
            action={
              <Button variant="tertiary" unpadded>
                Action
              </Button>
            }
          >
            This is the body text for a {variant} message — it explains the context
            or next step in a bit more detail than the header alone.
          </Message>
        ))}

        <Message
          variant="informational"
          icon={AIIcon}
          ai
          header="AI message"
          action={<Button variant="tertiary" unpadded>Action</Button>}
        >
          An AI-specific message can reuse the informational treatment with the Judi AI icon.
        </Message>

        <Message variant="informational">
          Messages work without a header too — just icon, body text, and optional action.
        </Message>
      </div>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ModalSection() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Modal
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        528px wide, renders through a portal to the document body with a 40%-black
        backdrop. Closes on the X button, backdrop click, or Escape.
      </Text>

      <div className="flex flex-col items-start gap-(--layout-3)">
        <ModalContent
          onClose={() => {}}
          title="Delete case?"
          leftAction={<Button variant="tertiary">Learn more</Button>}
          rightActions={
            <>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary" destructive>Delete</Button>
            </>
          }
        >
          <Text variant="body-md" className="text-(--text-surface-base)">
            This will permanently delete Case #123456 and all associated documents.
            This action cannot be undone.
          </Text>
        </ModalContent>

        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete case?"
        leftAction={<Button variant="tertiary" onClick={() => setOpen(false)}>Learn more</Button>}
        rightActions={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" destructive onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <Text variant="body-md" className="text-(--text-surface-base)">
          This will permanently delete Case #123456 and all associated documents.
          This action cannot be undone.
        </Text>
      </Modal>
    </div>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────

interface DemoTableRow {
  id: number
  name: string
  memberId: string
  status: 'Approved' | 'Pending' | 'Denied'
  amount: string
  date: string
}

const TABLE_STATUS_VARIANT: Record<DemoTableRow['status'], TagVariant> = {
  Approved: 'success',
  Pending: 'warning',
  Denied: 'error',
}

const DEMO_TABLE_ROWS: DemoTableRow[] = [
  { id: 1,  name: 'Walter White',    memberId: '1234567', status: 'Approved', amount: '$1,240.00', date: '01/23/2025' },
  { id: 2,  name: 'Skyler White',    memberId: '2345671', status: 'Pending',  amount: '$860.50',   date: '01/24/2025' },
  { id: 3,  name: 'Jesse Pinkman',   memberId: '3456712', status: 'Denied',   amount: '$430.00',   date: '01/22/2025' },
  { id: 4,  name: 'Hank Schrader',   memberId: '4567123', status: 'Approved', amount: '$2,100.75', date: '01/20/2025' },
  { id: 5,  name: 'Marie Schrader',  memberId: '5671234', status: 'Pending',  amount: '$975.20',   date: '01/25/2025' },
  { id: 6,  name: 'Saul Goodman',    memberId: '6712345', status: 'Approved', amount: '$1,560.00', date: '01/19/2025' },
  { id: 7,  name: 'Mike Ehrmantraut',memberId: '7123456', status: 'Denied',   amount: '$310.40',   date: '01/18/2025' },
  { id: 8,  name: 'Gustavo Fring',   memberId: '8234567', status: 'Approved', amount: '$3,420.00', date: '01/17/2025' },
  { id: 9,  name: 'Lydia Rodarte',   memberId: '9345678', status: 'Pending',  amount: '$690.10',   date: '01/26/2025' },
  { id: 10, name: 'Todd Alquist',    memberId: '1045678', status: 'Approved', amount: '$540.00',   date: '01/16/2025' },
  { id: 11, name: 'Steven Gomez',    memberId: '1145678', status: 'Denied',   amount: '$275.60',   date: '01/15/2025' },
  { id: 12, name: 'Combo Ortega',    memberId: '1245678', status: 'Approved', amount: '$820.00',   date: '01/14/2025' },
  { id: 13, name: 'Andrea Cantillo', memberId: '1345678', status: 'Pending',  amount: '$1,050.30', date: '01/27/2025' },
  { id: 14, name: 'Jane Margolis',   memberId: '1445678', status: 'Approved', amount: '$960.00',   date: '01/13/2025' },
  { id: 15, name: 'Badger Mayhew',   memberId: '1545678', status: 'Denied',   amount: '$190.00',   date: '01/12/2025' },
  { id: 16, name: 'Skinny Pete',     memberId: '1645678', status: 'Approved', amount: '$610.25',   date: '01/11/2025' },
  { id: 17, name: 'Huell Babineaux', memberId: '1745678', status: 'Pending',  amount: '$1,320.00', date: '01/28/2025' },
  { id: 18, name: 'Kuby Norris',     memberId: '1845678', status: 'Approved', amount: '$450.00',   date: '01/10/2025' },
  { id: 19, name: 'Ted Beneke',      memberId: '1945678', status: 'Denied',   amount: '$780.90',   date: '01/09/2025' },
  { id: 20, name: 'Gale Boetticher', memberId: '1054678', status: 'Approved', amount: '$2,340.00', date: '01/08/2025' },
  { id: 21, name: 'Chris Mara',      memberId: '1154678', status: 'Pending',  amount: '$530.00',   date: '01/29/2025' },
  { id: 22, name: 'Victor Vega',     memberId: '1254678', status: 'Approved', amount: '$675.40',   date: '01/07/2025' },
  { id: 23, name: 'Tyrus Kitt',      memberId: '1354678', status: 'Denied',   amount: '$220.00',   date: '01/06/2025' },
]

interface RealisticTableRow {
  caseId: string
  timeRemaining: string
  urgent: boolean
  member: string
  drug: string
  drugSubtext: string
  reviewLevel: 'Initial' | 'Renewal' | 'Reconsideration'
  serviceStatus: string
  lob: 'Commercial' | 'Medicare' | 'Exchange'
  status: 'In Progress' | 'Completed' | 'Closed'
  statusSubtext: string
  lockedBy?: string
  hasNewDocument?: boolean
}

const REALISTIC_STATUS_COLOR: Record<RealisticTableRow['status'], string> = {
  'In Progress': 'var(--text-feedback-informational-base)',
  'Completed':   'var(--text-feedback-success-base)',
  'Closed':      'var(--text-surface-base)',
}

const REALISTIC_TABLE_ROWS: RealisticTableRow[] = [
  {
    caseId: '100385', timeRemaining: 'Urgent: 48 hours, 11 minutes', urgent: true,
    member: 'Walter White', drug: 'Phentermine HCI 15MG Capsule', drugSubtext: 'Qty:2 | Days:28',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Skyler White',
  },
  {
    caseId: '100386', timeRemaining: '10 days, 23 hours', urgent: false,
    member: 'Jesse Pinkman', drug: 'Dupixent 300 MG/2ML', drugSubtext: 'Qty:1 | Days:28',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'Completed', statusSubtext: '01/26/2026 09:46 PM EST', hasNewDocument: true,
  },
  {
    caseId: '100387', timeRemaining: '6 days, 4 hours', urgent: false,
    member: 'Hank Schrader', drug: 'Humira Pen 40MG/0.4ML', drugSubtext: 'Qty:2 | Days:28',
    reviewLevel: 'Reconsideration', serviceStatus: 'Pending Documents', lob: 'Exchange',
    status: 'Closed', statusSubtext: '01/18/2026 11:02 AM EST',
  },
  {
    caseId: '100388', timeRemaining: 'Urgent: 3 hours, 42 minutes', urgent: true,
    member: 'Marie Schrader', drug: 'Ozempic 2MG/3ML Pen', drugSubtext: 'Qty:1 | Days:28',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Saul Goodman', hasNewDocument: true,
  },
  {
    caseId: '100389', timeRemaining: '13 days, 6 hours', urgent: false,
    member: 'Gustavo Fring', drug: 'Eliquis 5MG Tablet', drugSubtext: 'Qty:60 | Days:30',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100390', timeRemaining: '2 days, 15 hours', urgent: false,
    member: 'Mike Ehrmantraut', drug: 'Xarelto 20MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Documents', lob: 'Exchange',
    status: 'Closed', statusSubtext: '01/15/2026 03:12 PM EST',
  },
  {
    caseId: '100391', timeRemaining: 'Urgent: 22 hours, 5 minutes', urgent: true,
    member: 'Lydia Rodarte', drug: 'Trulicity 1.5MG/0.5ML Pen', drugSubtext: 'Qty:4 | Days:28',
    reviewLevel: 'Reconsideration', serviceStatus: 'Pending Review', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Todd Alquist',
  },
  {
    caseId: '100392', timeRemaining: '9 days, 1 hour', urgent: false,
    member: 'Saul Goodman', drug: 'Lyrica 75MG Capsule', drugSubtext: 'Qty:60 | Days:30',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'Completed', statusSubtext: '01/24/2026 10:20 AM EST', hasNewDocument: true,
  },
  {
    caseId: '100393', timeRemaining: '5 days, 19 hours', urgent: false,
    member: 'Andrea Cantillo', drug: 'Jardiance 25MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Exchange',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100394', timeRemaining: 'Urgent: 6 hours, 50 minutes', urgent: true,
    member: 'Jane Margolis', drug: 'Enbrel 50MG/ML Pen', drugSubtext: 'Qty:4 | Days:28',
    reviewLevel: 'Reconsideration', serviceStatus: 'Pending Documents', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Kuby Norris', hasNewDocument: true,
  },
  {
    caseId: '100395', timeRemaining: '16 days, 2 hours', urgent: false,
    member: 'Ted Beneke', drug: 'Symbicort 160/4.5 Inhaler', drugSubtext: 'Qty:1 | Days:30',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'Closed', statusSubtext: '01/10/2026 08:37 AM EST',
  },
  {
    caseId: '100396', timeRemaining: '1 day, 4 hours', urgent: false,
    member: 'Gale Boetticher', drug: 'Farxiga 10MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Exchange',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100397', timeRemaining: '11 days, 20 hours', urgent: false,
    member: 'Huell Babineaux', drug: 'Repatha 140MG/ML Pen', drugSubtext: 'Qty:2 | Days:28',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Commercial',
    status: 'Completed', statusSubtext: '01/22/2026 02:55 PM EST',
  },
  {
    caseId: '100398', timeRemaining: '4 days, 8 hours', urgent: false,
    member: 'Kuby Norris', drug: 'Januvia 100MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Exchange',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100399', timeRemaining: '7 days, 12 hours', urgent: false,
    member: 'Ted Beneke', drug: 'Ozempic 1MG/3ML Pen', drugSubtext: 'Qty:1 | Days:28',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100400', timeRemaining: 'Urgent: 1 hour, 15 minutes', urgent: true,
    member: 'Gale Boetticher', drug: 'Biktarvy 50/200/25MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Medicare',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Mike Ehrmantraut',
  },
  {
    caseId: '100401', timeRemaining: '18 days, 3 hours', urgent: false,
    member: 'Chris Mara', drug: 'Stelara 90MG/ML Syringe', drugSubtext: 'Qty:1 | Days:56',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Exchange',
    status: 'Closed', statusSubtext: '01/05/2026 09:18 AM EST',
  },
  {
    caseId: '100402', timeRemaining: '3 days, 21 hours', urgent: false,
    member: 'Victor Vega', drug: 'Cosentyx 150MG/ML Pen', drugSubtext: 'Qty:2 | Days:28',
    reviewLevel: 'Reconsideration', serviceStatus: 'Pending Documents', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', hasNewDocument: true,
  },
  {
    caseId: '100403', timeRemaining: '14 days, 17 hours', urgent: false,
    member: 'Tyrus Kitt', drug: 'Skyrizi 150MG/ML Pen', drugSubtext: 'Qty:1 | Days:56',
    reviewLevel: 'Initial', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'Completed', statusSubtext: '01/20/2026 04:41 PM EST',
  },
]

function TableSection() {
  const [sortColumn, setSortColumn] = useState<'name' | 'date' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState<number[]>([])
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const pageSize = 10

  const [realisticPage, setRealisticPage] = useState(1)
  const realisticPageSize = 10

  type RealisticSortColumn = 'caseId' | 'timeRemaining' | 'member' | 'drug' | 'reviewLevel' | 'serviceStatus' | 'lob'
  const [realisticSortColumn, setRealisticSortColumn] = useState<RealisticSortColumn | null>(null)
  const [realisticSortDirection, setRealisticSortDirection] = useState<'asc' | 'desc' | undefined>(undefined)

  const sortedRealisticRows = [...REALISTIC_TABLE_ROWS].sort((a, b) => {
    if (!realisticSortColumn) return 0
    const dir = realisticSortDirection === 'desc' ? -1 : 1
    return a[realisticSortColumn].localeCompare(b[realisticSortColumn]) * dir
  })
  const pagedRealisticRows = sortedRealisticRows.slice(
    (realisticPage - 1) * realisticPageSize,
    realisticPage * realisticPageSize
  )

  const handleSort = (column: 'name' | 'date') => {
    if (sortColumn !== column) {
      setSortColumn(column)
      setSortDirection('asc')
    } else if (sortDirection === 'asc') {
      setSortDirection('desc')
    } else {
      setSortColumn(null)
      setSortDirection(undefined)
    }
  }

  const handleRealisticSort = (column: RealisticSortColumn) => {
    if (realisticSortColumn !== column) {
      setRealisticSortColumn(column)
      setRealisticSortDirection('asc')
    } else if (realisticSortDirection === 'asc') {
      setRealisticSortDirection('desc')
    } else {
      setRealisticSortColumn(null)
      setRealisticSortDirection(undefined)
    }
  }

  const toggleSelected = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const sortedRows = [...DEMO_TABLE_ROWS].sort((a, b) => {
    if (!sortColumn) return 0
    const dir = sortDirection === 'desc' ? -1 : 1
    return a[sortColumn].localeCompare(b[sortColumn]) * dir
  })
  const pagedRows = sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const standaloneBoxClass = 'inline-flex flex-col w-fit rounded-(--radius-sm) overflow-hidden'
  const standaloneBoxStyle = { border: 'var(--space-1) solid var(--border-surface-base)' }

  return (
    <div className="min-h-full flex flex-col gap-(--layout-3)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--stack-4) text-(--text-surface-base)">
          Table
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          TableCellHeader, TableCell, and Pagination shown standalone, then assembled into a full Table.
          Gridlines are a 1px gap over a gray background, not per-cell borders — avoids double-border
          seams where cells meet.
        </Text>
      </div>

      <div className="flex flex-wrap items-start gap-(--layout-3)">
        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            TableCellHeader
          </Text>
          <div className={standaloneBoxClass} style={standaloneBoxStyle}>
            <TableCellHeader
              label="Sortable, with tooltip"
              tooltip="This column can be sorted by clicking anywhere on the header"
              sortable
              sortDirection="asc"
              onSort={() => {}}
            />
            <TableCellHeader label="Not sortable, no tooltip" />
          </div>
        </div>

        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            TableCell
          </Text>
          <div className={standaloneBoxClass} style={standaloneBoxStyle}>
            <TableCell type="text" subtext="Member ID: 1234567">
              Walter White
            </TableCell>
            <TableCell type="tag" odd>
              <Tag variant="success">Approved</Tag>
            </TableCell>
            <TableCell type="checkbox">
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell type="money" odd>
              $1,240.00
            </TableCell>
          </div>
        </div>

        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            Pagination
          </Text>
          <div className={standaloneBoxClass} style={standaloneBoxStyle}>
            <Pagination currentPage={currentPage} pageSize={pageSize} totalItems={DEMO_TABLE_ROWS.length} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>

      <div>
      <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
        Full Table
      </Text>
      <Table
        columns="48px 1fr max-content max-content max-content max-content"
        onRowClick={(rowIndex) => {
          const row = pagedRows[rowIndex]
          if (row) toggleSelected(row.id)
        }}
        header={[
          <TableCellHeader label="" />,
          <TableCellHeader
            label="Member Name"
            tooltip="Full legal name on file"
            sortable
            sortDirection={sortColumn === 'name' ? sortDirection : undefined}
            onSort={() => handleSort('name')}
          />,
          <TableCellHeader label="Status" />,
          <TableCellHeader label="Amount" />,
          <TableCellHeader
            label="Date Submitted"
            sortable
            sortDirection={sortColumn === 'date' ? sortDirection : undefined}
            onSort={() => handleSort('date')}
          />,
          <TableCellHeader label="Actions" align="center" />,
        ]}
        rows={pagedRows.map((row) => [
          <TableCell type="checkbox">
            {/* No-op onChange — the row's own onClick is the single source of
                truth for toggling selection, so this just reflects state. */}
            <Checkbox checked={selected.includes(row.id)} onChange={() => {}} />
          </TableCell>,
          <TableCell type="text" subtext={`Member ID: ${row.memberId}`}>
            {row.name}
          </TableCell>,
          <TableCell type="tag">
            <Tag variant={TABLE_STATUS_VARIANT[row.status]}>{row.status}</Tag>
          </TableCell>,
          <TableCell type="money">{row.amount}</TableCell>,
          <TableCell type="date">{row.date}</TableCell>,
          <TableCell type="action">
            <div className="flex items-center gap-(--inline-3)">
              <Tooltip content="Edit">
                <button
                  type="button"
                  aria-label="Edit"
                  className="inline-flex items-center justify-center cursor-pointer bg-transparent p-0"
                  style={{ border: 'none' }}
                >
                  <Icon icon={EditIcon} size="regular" className="text-(--icon-action-secondary-idle)" />
                </button>
              </Tooltip>
              <Tooltip content="Delete">
                <button
                  type="button"
                  aria-label="Delete"
                  onClick={() => setDeleteModalOpen(true)}
                  className="inline-flex items-center justify-center cursor-pointer bg-transparent p-0"
                  style={{ border: 'none' }}
                >
                  <Icon icon={DeleteIcon} size="regular" className="text-(--icon-action-secondary-critical-idle)" />
                </button>
              </Tooltip>
            </div>
          </TableCell>,
        ])}
        paginationBottom={
          <Pagination currentPage={currentPage} pageSize={pageSize} totalItems={DEMO_TABLE_ROWS.length} onPageChange={setCurrentPage} />
        }
      />

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete"
        rightActions={
          <>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" destructive onClick={() => setDeleteModalOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <Text variant="body-md" className="text-(--text-surface-base)">
          This action cannot be undone.
        </Text>
      </Modal>
      </div>

      <div>
      <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
        Realistic table (sticky first/last column, horizontal scroll)
      </Text>
      <Text as="div" variant="body-sm" className="mb-(--stack-3) text-(--text-surface-subtle)">
        Rows aren't click targets here — only the Case ID link and the status icons are interactive.
        Scroll horizontally to see Case ID and Actions stay pinned.
      </Text>
      <Table
        columns="max-content max-content max-content minmax(220px,1fr) max-content max-content max-content max-content max-content"
        stickyFirstColumn
        paginationTop={
          <Pagination
            currentPage={realisticPage}
            pageSize={realisticPageSize}
            totalItems={REALISTIC_TABLE_ROWS.length}
            onPageChange={setRealisticPage}
          />
        }
        paginationBottom={
          <Pagination
            currentPage={realisticPage}
            pageSize={realisticPageSize}
            totalItems={REALISTIC_TABLE_ROWS.length}
            onPageChange={setRealisticPage}
          />
        }
        header={[
          <TableCellHeader
            label="Case ID"
            sortable
            sortDirection={realisticSortColumn === 'caseId' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('caseId')}
          />,
          <TableCellHeader
            label="Time Remaining"
            sortable
            sortDirection={realisticSortColumn === 'timeRemaining' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('timeRemaining')}
          />,
          <TableCellHeader
            label="Member"
            sortable
            sortDirection={realisticSortColumn === 'member' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('member')}
          />,
          <TableCellHeader
            label="Drug"
            sortable
            sortDirection={realisticSortColumn === 'drug' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('drug')}
          />,
          <TableCellHeader
            label="Review Level"
            sortable
            sortDirection={realisticSortColumn === 'reviewLevel' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('reviewLevel')}
          />,
          <TableCellHeader
            label="Service Status"
            sortable
            sortDirection={realisticSortColumn === 'serviceStatus' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('serviceStatus')}
          />,
          <TableCellHeader
            label="Line of Business"
            sortable
            sortDirection={realisticSortColumn === 'lob' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('lob')}
          />,
          <TableCellHeader label="Case Status" />,
          <TableCellHeader label="Actions" align="center" />,
        ]}
        rows={pagedRealisticRows.map((row) => [
          <TableCell type="link">
            <Button variant="link">{row.caseId}</Button>
          </TableCell>,
          <TableCell type="text" color={row.urgent ? 'var(--text-feedback-error-base)' : undefined}>
            {row.timeRemaining}
          </TableCell>,
          <TableCell type="text">{row.member}</TableCell>,
          <TableCell type="text" subtext={row.drugSubtext}>
            {row.drug}
          </TableCell>,
          <TableCell type="text">{row.reviewLevel}</TableCell>,
          <TableCell type="text">{row.serviceStatus}</TableCell>,
          <TableCell type="text">{row.lob}</TableCell>,
          <TableCell type="text" color={REALISTIC_STATUS_COLOR[row.status]} subtext={row.statusSubtext}>
            {row.status}
          </TableCell>,
          <TableCell type="action">
            <div className="flex items-center gap-(--inline-1)">
              {row.lockedBy && (
                <Tooltip content={`Locked by ${row.lockedBy}`}>
                  <span tabIndex={0}>
                    <Icon icon={LockIcon} size="regular" className="text-(--icon-feedback-error-base)" />
                  </span>
                </Tooltip>
              )}
              {row.hasNewDocument && (
                <Tooltip content="New document attached">
                  <span tabIndex={0}>
                    <Icon icon={DocumentIcon} size="regular" className="text-(--icon-feedback-informational-base)" />
                  </span>
                </Tooltip>
              )}
            </div>
          </TableCell>,
        ])}
      />
      </div>
    </div>
  )
}

// ─── Radius ───────────────────────────────────────────────────────────────────

function RadiusSection() {
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

// ─── Tag & Badge ──────────────────────────────────────────────────────────────

function TagBadgeSection() {
  const TAG_VARIANTS: { label: string; variant: TagVariant; description: string }[] = [
    { label: 'Info',               variant: 'info',               description: 'Default neutral state' },
    { label: 'Info High Contrast', variant: 'info-high-contrast', description: 'Emphasized neutral' },
    { label: 'Success',            variant: 'success',            description: 'Approved / active / complete' },
    { label: 'Warning',            variant: 'warning',            description: 'Needs attention' },
    { label: 'Error',              variant: 'error',              description: 'Failed / rejected / blocked' },
    { label: 'System',             variant: 'system',             description: 'System-generated status' },
    { label: 'System Alt',         variant: 'system-alt',         description: 'System alt emphasis' },
  ]

  return (
    <div className="min-h-full flex flex-col gap-(--stack-5)">

      {/* ── Tag ── */}
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Tag
        </Text>
        <Text as="p" variant="body-md" className="mb-(--space-24) text-(--text-surface-subtle)">
          Read-only labels. Text only — no interactive elements. Use to communicate status or category.
        </Text>

        {/* All variants */}
        <Text as="h3" variant="label-lg" className="mb-(--space-16) text-(--text-surface-subtle)">
          Variants
        </Text>
        <div className="flex flex-col gap-(--stack-3)">
          {TAG_VARIANTS.map(({ label, variant, description }) => (
            <div key={variant} className="flex items-center gap-(--inline-4)">
              <div className="shrink-0 w-[160px]">
                <Tag variant={variant}>{label}</Tag>
              </div>
              <Text variant="label-md" className="shrink-0 w-[180px] text-(--text-surface-subtle)">
                {variant}
              </Text>
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                {description}
              </Text>
            </div>
          ))}
        </div>

        {/* In context */}
        <Text as="h3" variant="label-lg" className="mt-(--space-32) mb-(--space-16) text-(--text-surface-subtle)">
          In context
        </Text>
        <div className="flex flex-wrap gap-(--inline-2)">
          <Tag variant="success">Approved</Tag>
          <Tag variant="warning">Pending Review</Tag>
          <Tag variant="error">Rejected</Tag>
          <Tag variant="info">Draft</Tag>
          <Tag variant="system">Auto-assigned</Tag>
          <Tag variant="info-high-contrast">Priority</Tag>
          <Tag variant="system-alt">Escalated</Tag>
        </div>
      </div>

      {/* ── Badge ── */}
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Badge
        </Text>
        <Text as="p" variant="body-md" className="mb-(--space-24) text-(--text-surface-subtle)">
          Interactive labels. Identical to the Info tag in colour but supports an optional dismiss (×) button. Use for user-applied filters or removable selections.
        </Text>

        <Text as="h3" variant="label-lg" className="mb-(--space-16) text-(--text-surface-subtle)">
          Variants
        </Text>
        <div className="flex flex-col gap-(--stack-3)">
          <div className="flex items-center gap-(--inline-4)">
            <div className="shrink-0 w-[160px]">
              <Badge>Label</Badge>
            </div>
            <Text variant="label-md" className="shrink-0 w-[180px] text-(--text-surface-subtle)">
              without onClose
            </Text>
            <Text variant="body-md" className="text-(--text-surface-subtle)">
              Static — no dismiss button rendered
            </Text>
          </div>
          <div className="flex items-center gap-(--inline-4)">
            <div className="shrink-0 w-[160px]">
              <Badge onClose={() => {}}>Label</Badge>
            </div>
            <Text variant="label-md" className="shrink-0 w-[180px] text-(--text-surface-subtle)">
              with onClose
            </Text>
            <Text variant="body-md" className="text-(--text-surface-subtle)">
              Renders × dismiss button, calls onClose on click
            </Text>
          </div>
        </div>

        {/* In context */}
        <Text as="h3" variant="label-lg" className="mt-(--space-32) mb-(--space-16) text-(--text-surface-subtle)">
          In context — active filters
        </Text>
        <div className="flex flex-wrap gap-(--inline-2)">
          <Badge onClose={() => {}}>Status: Active</Badge>
          <Badge onClose={() => {}}>Assigned: Chad Ontario</Badge>
          <Badge onClose={() => {}}>Due: This week</Badge>
          <Badge onClose={() => {}}>Type: Claim</Badge>
        </div>
      </div>

    </div>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function TabsSection() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="flex flex-col gap-(--stack-5) p-(--inset-7)">
      <DemoRow label="TabSet">
        <TabSet>
          <Tab label="Overview"  selected={activeTab === 'overview'}  onClick={() => setActiveTab('overview')}  rightSlot={<Lozenge count={3} />} />
          <Tab label="Details"   selected={activeTab === 'details'}   onClick={() => setActiveTab('details')}   rightSlot={<Lozenge count={12} />} />
          <Tab label="History"   selected={activeTab === 'history'}   onClick={() => setActiveTab('history')} />
          <Tab label="Documents" selected={activeTab === 'documents'} onClick={() => setActiveTab('documents')} />
        </TabSet>
      </DemoRow>
    </div>
  )
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

function StepperSection() {
  return (
    <div className="min-h-full flex flex-col gap-(--stack-5)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Stepper
        </Text>
        <Text as="p" variant="body-md" className="text-(--text-surface-subtle)">
          Shows case progress. Active steps can return to a completed stage; future steps remain unavailable.
        </Text>
      </div>

      <div className="bg-(--bg-surface-base) p-(--inset-7)">
        <Steps
          steps={[
            { label: 'Intake', active: true, onClick: () => {} },
            { label: 'Review', active: true, onClick: () => {} },
            { label: 'Decision', active: false },
            { label: 'Close', active: false },
          ]}
        />
      </div>
    </div>
  )
}

// ─── Key Case Details ─────────────────────────────────────────────────────────

function KeyCaseDetailsSection() {
  return (
    <div className="min-h-full flex flex-col gap-(--stack-5)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Key Case Details
        </Text>
        <Text as="p" variant="body-md" className="text-(--text-surface-subtle)">
          A collapsible, full-width contextual bar for member, prescriber, drug, origin, and plan-benefit details.
        </Text>
      </div>
      <KeyCaseDetails />
    </div>
  )
}

// ─── Shell ────────────────────────────────────────────────────────────────────

function ShellSection() {
  return (
    <div className="min-h-full" />
  )
}

// ─── Doc app ──────────────────────────────────────────────────────────────────

function DocContent({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('Typography')
  const [theme, setTheme] = useState<Theme>('minerva')

  const switchTheme = (t: Theme) => {
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  }

  const headerActions = (
    <ButtonGroup>
      {(['minerva', 'evolution'] as Theme[]).map((t) => (
        <Button
          key={t}
          variant="inverse"
          onClick={() => switchTheme(t)}
          style={theme === t ? { borderColor: 'var(--text-action-inverse-idle)' } : undefined}
        >
          {t}
        </Button>
      ))}
    </ButtonGroup>
  )

  const sideNavContent = (
    <div className="flex flex-col gap-(--stack-4)">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-(--space-4)">
          <SideNavGroup label={group.label} />
          {group.sections.map((section) => (
            <SideNavItem
              key={section}
              label={section}
              onClick={() => setActiveSection(section)}
              active={activeSection === section}
            />
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <AppLayout
      variant={theme}
      appName="Documentation"
      headerActions={headerActions}
      breadcrumbs={[{ label: 'Home', }, { label: 'Documentation Module', href: '/' }, { label: activeSection }]}
      sideNavContent={sideNavContent}
      title='Documentation Module'
      onBackClick={onBack}
      actions={
        <ButtonGroup>
          <Button variant="tertiary" rightIcon={ChevronDownIcon}>Case Actions</Button>
          <Button variant="secondary">Exit Case</Button>
        </ButtonGroup>
      }
      completed
      titleMeta={
        <>
          <Tag variant="system">RPh Review</Tag>
          <Tag variant="warning">TDI</Tag>
        </>
      }
      secondaryContent={
        <>
          <MetaItem label="Review Level" value="Initial" />
          <MetaItem icon={ClockIcon} label="Elapses" value="05/26/2026 12:00PM EST" />
        </>
      }
    >
      {activeSection === 'Typography' && <TypographySection />}
      {activeSection === 'Colors'     && <ColorsSection />}
      {activeSection === 'Spacing'    && <SpacingSection />}
      {activeSection === 'Radius'     && <RadiusSection />}
      {activeSection === 'Button'     && <ButtonSection />}
      {activeSection === 'Checkbox'   && <CheckboxSection />}
      {activeSection === 'Radio'      && <RadioSection />}
      {activeSection === 'Notification' && <NotificationSection />}
      {activeSection === 'Document Viewer' && <DocumentViewerSection />}
      {activeSection === 'Chip'       && <ChipSection />}
      {activeSection === 'Input'      && <InputSection />}
      {activeSection === 'Textarea'   && <TextareaSection />}
      {activeSection === 'Dropdown'   && <DropdownSection />}
      {activeSection === 'AI Card'    && <AICardSection />}
      {activeSection === 'Judi Assistant' && <JudiAssistantDocumentation />}
      {activeSection === 'Prior Auth Tabs' && <ClinicalCriteriaTabSection />}
      {activeSection === 'Collapse'   && <CollapseSection />}
      {activeSection === 'Tooltip'    && <TooltipSection />}
      {activeSection === 'Message'    && <MessageSection />}
      {activeSection === 'Modal'      && <ModalSection />}
      {activeSection === 'Table'      && <TableSection />}
      {activeSection === 'Tag & Badge' && <TagBadgeSection />}
      {activeSection === 'Tabs'       && <TabsSection />}
      {activeSection === 'Stepper'    && <StepperSection />}
      {activeSection === 'Key Case Details' && <KeyCaseDetailsSection />}
      {activeSection === 'Shell'      && <ShellSection />}
    </AppLayout>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [page, setPage] = useState<AppPage>('modules')

  if (page === 'documentation') return <DocContent onBack={() => setPage('modules')} />
  if (page === 'tap') return <TapPage onExit={() => setPage('modules')} />

  return <ModuleLanding onNavigate={setPage} />
}

export default App
