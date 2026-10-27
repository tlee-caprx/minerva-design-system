# Components

Always use these components. Only build a custom component when nothing here covers the UI (see `Guidelines.md` → Building from designs).

Everything is imported by name from the package — never from a file path inside `node_modules`:

```tsx
import { AppLayout, Button, Tag } from '@judi-health/minerva-ds'
import { KeyCaseDetails } from '@judi-health/minerva-ds/patterns'
```

---

## Available components

### Core — `@judi-health/minerva-ds`

| Group        | Components |
| ------------ | ---------- |
| Shell        | `AppLayout`, `GlobalHeader`, `ActionBar`, `Breadcrumb`, `SideNav`, `SideNavItem`, `SideNavGroup` |
| Actions      | `Button`, `ButtonGroup`, `Chip` |
| Typography   | `Text` |
| Form         | `Input`, `PasswordInput`, `SearchInput`, `Textarea`, `FieldWrapper`, `Checkbox`, `Radio`, `Dropdown`, `MultiSelectDropdown`, `MenuPanel`, `MenuGroup`, `MenuItem`, `MenuSearchBar` |
| Status       | `Tag`, `Badge`, `Lozenge`, `MetaItem` |
| Feedback     | `Message`, `Notification`, `Spinner`, `Tooltip`, `TooltipBubble` |
| Overlays     | `Modal`, `ModalContent` |
| Data         | `Table`, `TableCell`, `TableCellHeader`, `Pagination` |
| Structure    | `TabSet`, `Tab`, `Steps`, `Collapse`, `Divider` |
| Icons        | `Icon` + every `*Icon` listed under [Icon](#icon) |

### Patterns — `@judi-health/minerva-ds/patterns`

Judi-specific compositions. Only use them when the design shows them.

| Component                                      | Use |
| ---------------------------------------------- | --- |
| `KeyCaseDetails`                               | Collapsible member/drug/prescriber strip at the top of a case |
| `JudiAssistantPanel`, `JudiAssistantReviewStep` | Judi AI chat surface — see `JudiAssistant.md` |

### Document viewer — `@judi-health/minerva-ds/document-viewer`

Embedded PDF viewer, imported from its own entry so its large PDF engine is only bundled when used:

```tsx
import { DocumentViewer } from '@judi-health/minerva-ds/document-viewer'
```

Components without a section below are demonstrated in the documentation app (`apps/documentation` in the design system repo). Their props are fully typed — rely on the TypeScript definitions shipped with the package.

---

## AppLayout

Every page must start with AppLayout. No exceptions — not for simple pages, not for single components. Never build a custom layout or render content outside of AppLayout.

```tsx
import { AppLayout, SideNavItem } from '@judi-health/minerva-ds'

export default function MyPage() {
  return (
    <AppLayout
      variant="minerva"
      appName="Module Name"
      breadcrumbs={[{ label: "Home" }, { label: "Page Name" }]}
      title="Page Title"
      sideNavContent={
        <>
          <SideNavItem label="Item One" active />
          <SideNavItem label="Item Two" />
        </>
      }
    >
      {/* page content */}
    </AppLayout>
  );
}
```

### With page actions

Always wrap actions in `ButtonGroup`. Order left to right: `tertiary | secondary | primary`. Omit variants that aren't needed — the rightmost button is always the most prominent one present.

```tsx
<AppLayout
  ...
  actions={
    <ButtonGroup>
      <Button variant="tertiary" rightIcon={ChevronDownIcon}>Case Actions</Button>
      <Button variant="secondary">Exit Case</Button>
      <Button variant="primary" leftIcon={AddIcon}>New Item</Button>
    </ButtonGroup>
  }
>
```

### With status tag and metadata

```tsx
<AppLayout
  ...
  titleMeta={<Tag variant="success">Approved</Tag>}
  secondaryContent={
    <>
      <MetaItem label="Review Level" value="Initial" />
      <MetaItem icon={ClockIcon} label="Elapses" value="05/26/2026 12:00PM EST" />
    </>
  }
>
```

### Completed case

Use the `completed` prop to show the green ✓ "Case Completed" indicator inline with the title. Pass any additional status tags via `titleMeta`.

```tsx
<AppLayout
  ...
  completed
  titleMeta={
    <>
      <Tag variant="system">RPh Review</Tag>
      <Tag variant="warning">TDI</Tag>
    </>
  }
>
```

### With sub-bar (tab bar, filter strip)

```tsx
<AppLayout
  ...
  subBar={<MyTabBar />}
>
```

### Full-bleed content (no padding)

```tsx
<AppLayout noPadding ...>
  {/* content manages its own layout and padding */}
</AppLayout>
```

### Detail page with back button

```tsx
<AppLayout
  ...
  breadcrumbs={[{ label: 'Home' }, { label: 'Cases', href: '/cases' }, { label: 'Case #1234' }]}
  title="Case #1234"
  onBackClick={() => navigate(-1)}
>
```

---

## Text

Always use `Text` for typography — never Tailwind text classes or raw inline styles.

```tsx
import { Text } from '@judi-health/minerva-ds'

<Text as="h1" variant="heading-xl" className="text-(--text-surface-base)">Page Title</Text>
<Text variant="body-md" className="text-(--text-surface-base)">Body copy</Text>
<Text variant="body-md" weight="semibold">Semibold</Text>
```

Variants: `heading-xl/lg/md/sm/xs` | `body-lg/md/sm` | `label-lg/md/sm` | `tag-label`

Use `as` to set the HTML element (`h1`–`h3`, `p`, `span` — defaults to `span`). Use `weight="semibold"` to override a variant's default weight.

---

## Tag

Read-only status labels. Text only — no interactive elements.

```tsx
import { Tag } from '@judi-health/minerva-ds'

<Tag variant="success">Approved</Tag>
<Tag variant="warning">Pending Review</Tag>
<Tag variant="error">Rejected</Tag>
```

Variants: `info` | `info-high-contrast` | `success` | `warning` | `error` | `system` | `system-alt`

---

## Badge

Same visual as the `info` Tag but supports an optional dismiss button. Use for removable filters or selections.

```tsx
import { Badge } from '@judi-health/minerva-ds'

<Badge>Label</Badge>
<Badge onClose={() => removeFilter()}>Status: Active</Badge>
```

---

## MetaItem

Inline key/value pair with an optional leading icon. Use in ActionBar `secondaryContent` or anywhere metadata is displayed.

```tsx
import { MetaItem, ClockIcon } from '@judi-health/minerva-ds'

<MetaItem label="Assigned" value="Chad Ontario" />
<MetaItem icon={ClockIcon} label="Elapses" value="05/26/2026 12:00PM EST" />

// Clickable link value — renders underlined text + LinkOut icon
<MetaItem label="Plan" value="J.P. Wynne High School" onClick={() => navigate('/plan')} />
```

---

## Steps

Full-width breadcrumb-style progress bar. Active steps are clickable; inactive steps are visible but non-interactive (30% opacity). Place in AppLayout's `subBar` prop.

```tsx
import { Steps } from '@judi-health/minerva-ds'

<AppLayout
  subBar={
    <Steps
      steps={[
        { label: 'Intake',   active: true,  onClick: () => navigate('/intake') },
        { label: 'Review',   active: true,  onClick: () => navigate('/review') },
        { label: 'Decision', active: false },
        { label: 'Close',    active: false },
      ]}
    />
  }
>
```

A step is `active` if the user can navigate to it (current or previously completed). Inactive steps cannot be clicked — do not pass `onClick` on them.

---

## KeyCaseDetails

Collapsible full-width bar showing case-level metadata in columns. Clicking the chevron expands each column to reveal sub-fields. Place in AppLayout's `subBar` prop, below `<Steps>` if both are present.

**Always use this component whenever a KeyCaseDetails bar appears in a design.** Do not build a custom version, inline the markup, or skip it because the data is hardcoded. The hardcoded data is intentional — this is a display component for the design system and accepts no props.

```tsx
import { KeyCaseDetails } from '@judi-health/minerva-ds/patterns'

<AppLayout subBar={<KeyCaseDetails />}>
```

---

## Button

```tsx
import { Button, AddIcon, DeleteIcon, ArrowRightIcon } from '@judi-health/minerva-ds'
```

| Variant     | Use                                |
| ----------- | ---------------------------------- |
| `primary`   | Main action — one per section      |
| `secondary` | Supporting actions                 |
| `tertiary`  | Low-emphasis actions               |
| `inverse`   | Use on dark/navigation backgrounds |

```tsx
// Basic
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>

// With icons
<Button variant="primary" leftIcon={AddIcon}>Add Item</Button>
<Button variant="secondary" rightIcon={ArrowRightIcon}>Next</Button>
<Button variant="secondary" iconOnly><DeleteIcon /></Button>

// States
<Button variant="primary" loading>Saving</Button>
<Button variant="primary" disabled>Save</Button>
<Button variant="primary" destructive leftIcon={DeleteIcon}>Delete</Button>
```

---

## ButtonGroup

Always wrap related buttons in ButtonGroup. Primary action goes rightmost.

Gap between buttons is 8px by default, and automatically widens to 16px when
every button in the group is `variant="tertiary"` — no prop needed, ButtonGroup
detects this from its children.

```tsx
import { ButtonGroup, Button } from '@judi-health/minerva-ds'

<ButtonGroup>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>

// All-tertiary group — gap widens to 16px automatically
<ButtonGroup>
  <Button variant="tertiary">Edit</Button>
  <Button variant="tertiary">Duplicate</Button>
  <Button variant="tertiary" destructive>Delete</Button>
</ButtonGroup>
```

---

## Icon

```tsx
import { Icon, AddIcon, SearchIcon, DeleteIcon } from '@judi-health/minerva-ds'

// Standalone icon
<Icon icon={SearchIcon} size="regular" />

// Pass directly to Button — never wrap in Icon when used inside Button
<Button variant="primary" leftIcon={AddIcon}>Add</Button>
```

Sizes: `small` (14px) | `regular` (20px, default)

`JudiLogoIcon` and `judiLogoSrc` are also exported for custom headers.

### All available icons

```
AddCircleIcon, AddIcon, AIIcon, AlarmClockIcon, ArrowDownIcon, ArrowDownLeftIcon,
ArrowDownRightIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowUpRightIcon,
AttachmentIcon, BankIcon, BellIcon, BoltIcon, BranchIcon, CheckCircleIcon,
CheckMarkIcon, ChevronDownIcon, ChevronEndIcon, ChevronLeftIcon, ChevronRightIcon,
ChevronStartIcon, ChevronUpIcon, ClockIcon, CloseIcon, CopyIcon, CreditCardIcon,
CustomerServiceIcon, DeleteIcon, DocumentIcon, DocumentPageFoldIcon,
DollarCircleIcon, DollarIcon, DownloadIcon, EditIcon, EllipsisCircleIcon,
EllipsisVerticalIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, FaceIdIcon, FilterIcon,
GlobeIcon, GrabberIcon, GridIcon, HistoryIcon, HomeIcon, InfoCircleIcon, LinkIcon,
LinkOutIcon, ListTreeIcon, LocationIcon, LockIcon, LockOpenIcon, LogOutIcon,
MedicalIcon, MenuBarsIcon, MenuGridIcon, MessageDotsIcon, PhoneIcon, PillBottleIcon,
PlaceholderIcon, PrintIcon, QuestionCircleIcon, RedoIcon, RefreshIcon, RemoveIcon,
ScaleIcon, SearchIcon, SeriesIcon, SettingsIcon, ShieldCheckIcon, ShippingIcon,
SortIcon, StarEmptyIcon, StarFilledIcon, ThumbsDownIcon, ThumbsUpIcon, UndoIcon,
UploadIcon, UserIcon, WarningCircleIcon, XCircleIcon, XCloseIcon, XIcon
```

---

## SideNavItem

Only used inside AppLayout's `sideNavContent` prop — never rendered standalone.

```tsx
import { SideNavItem } from '@judi-health/minerva-ds'

// href renders a plain anchor tag — no router needed
<SideNavItem label="Dashboard" active />
<SideNavItem label="Cases" href="/cases" />
<SideNavItem label="Clients" onClick={() => setSection('clients')} />
```

---

## Spinner

Used automatically inside Button when `loading` is set. Only use standalone for page or section loading states.

```tsx
import { Spinner } from '@judi-health/minerva-ds'

<Spinner />
```

---

## Tab / TabSet

`TabSet` is the container — it holds the bottom border and left/right padding. `Tab` is each individual tab. Manage selected state externally.

```tsx
import { Tab, TabSet } from '@judi-health/minerva-ds'

<TabSet>
  <Tab label="Overview" selected={active === 'overview'} onClick={() => setActive('overview')} />
  <Tab label="Details"  selected={active === 'details'}  onClick={() => setActive('details')} />
  <Tab label="History"  selected={active === 'history'}  onClick={() => setActive('history')} />
</TabSet>
```

Use `rightSlot` to render an icon or lozenge to the right of the label:

```tsx
<Tab label="Overview" rightSlot={<Lozenge count={3} />} />
<Tab label="Alerts"   rightSlot={<Icon icon={WarningCircleIcon} size="small" />} />
```
