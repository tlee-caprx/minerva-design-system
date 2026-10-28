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
| Data         | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableExpandButton`, `TableRowActions`, `Pagination` — see [Table](#table) |
| Structure    | `Panel`, `TabSet`, `Tab`, `Steps`, `Collapse`, `Divider` — see [Panel](#panel) |
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

---

## Panel

The card. Use `Panel` whenever a design shows content grouped in a white box with a light border — never build a card from a `div` with your own border, shadow or padding.

| Variant | Look | Use |
| --- | --- | --- |
| `default` | Surface fill, 1px stroke, small shadow, 4px radius, 24px padding | Top-level cards on a page |
| `nested` | Subtle (gray) fill, no stroke or shadow, same radius and padding | Grouping inside a Panel |

Panel only provides the container. Lay out what's inside yourself with `Text`, `Tag`, `MetaItem`, `Button` and flex/grid using spacing tokens.

```tsx
import { Panel, Text, MetaItem } from '@judi-health/minerva-ds'

<Panel>
  <div className="flex flex-col gap-(--stack-4)">
    <Text as="h3" variant="heading-sm" className="text-(--text-surface-base)">Member</Text>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(calc(var(--space-40)*4),1fr))] gap-(--inline-4)">
      <Panel variant="nested"><MetaItem label="Name" value="Walter White" /></Panel>
      <Panel variant="nested"><MetaItem label="Member ID" value="1234567" /></Panel>
    </div>
  </div>
</Panel>
```

**Tabbed panel.** Pass a `TabSet` as `tabs`. It sits flush on top of the panel body with no gap, and the whole panel keeps its 4px corners. Switch the body content on the selected tab yourself.

```tsx
import { Panel, TabSet, Tab } from '@judi-health/minerva-ds'

<Panel
  tabs={
    <TabSet>
      <Tab label="Summary" selected={tab === 'summary'} onClick={() => setTab('summary')} />
      <Tab label="History" selected={tab === 'history'} onClick={() => setTab('history')} />
    </TabSet>
  }
>
  {tab === 'summary' ? <CaseSummary /> : <CaseHistory />}
</Panel>
```

---

## Table

Real `<table>` markup, composed like shadcn/ui: `Table` → `TableHeader` / `TableBody` → `TableRow` → `TableHead` / `TableCell`. Rows alternate fills automatically, columns hug their content, and wide tables scroll sideways.

```tsx
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Pagination, Tag,
} from '@judi-health/minerva-ds'

<Table paginationBottom={<Pagination currentPage={page} pageSize={10} totalItems={cases.length} onPageChange={setPage} />}>
  <TableHeader>
    <TableRow>
      <TableHead sortable sortDirection={sortDirection} onSort={toggleSort}>Case ID</TableHead>
      <TableHead grow>Member</TableHead>
      <TableHead>Status</TableHead>
      <TableHead align="center">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {pagedCases.map((c) => (
      <TableRow key={c.id} onClick={() => openCase(c.id)}>
        <TableCell type="text">{c.id}</TableCell>
        <TableCell type="text" subtext={`Member ID: ${c.memberId}`}>{c.member}</TableCell>
        <TableCell type="tag"><Tag variant="success">{c.status}</Tag></TableCell>
        <TableCell type="action">{/* icon Buttons */}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Cell `type`** sets alignment and behavior. Give every cell in a column the same type.

| `type` | Use | Notes |
| --- | --- | --- |
| `text`, `date`, `number`, `money` | Plain values | Children get body text styling. Left-aligned. Support `subtext`, `color`, `maxWidth`. |
| `link` | A `<Button variant="link">` | Left-aligned. Clicks don't trigger the row's `onClick`. |
| `tag` | A `Tag` | Centered. |
| `checkbox`, `radio` | Row selection | Centered. Clicks don't trigger the row's `onClick`. |
| `action` | Icon buttons and/or `TableRowActions` at the end of the row | Centered. **A last column of `action` cells is always pinned to the right**, with a shadow while columns scroll under it. |
| `expand` | A `TableExpandButton` | Centered. Clicks don't trigger the row's `onClick`. |

**Layout**

- Columns hug their content and text doesn't wrap. Too many columns → horizontal scroll.
- `grow` on one `TableHead` makes that column fill the leftover width so the table spans its container. Without it the table is only as wide as its content.
- `maxWidth` on a text cell (e.g. `maxWidth="calc(var(--space-40) * 6)"`) cuts longer text off with "…"; the full text shows in a Tooltip on hover.
- `subtext` adds a smaller second line under the value, making that row taller.
- `stickyFirstColumn` on `Table` pins the first column on the left.
- Sorting and pagination are state you own: slice your rows for the current page, and cycle `sortDirection` unsorted → `'asc'` → `'desc'` → unsorted in `onSort`. `Pagination` hides itself when everything fits on one page. Use `paginationTop` and/or `paginationBottom`.

**Clickable rows and selection.** `onClick` on a `TableRow` makes the whole row a click target (hover fill, Enter/Space from the keyboard). A selection checkbox works independently — give it its own `onChange`:

```tsx
<TableRow onClick={() => openCase(c.id)}>
  <TableCell type="checkbox">
    <Checkbox aria-label={`Select ${c.member}`} checked={selected.includes(c.id)} onChange={() => toggle(c.id)} />
  </TableCell>
  ...
</TableRow>
```

A select-all `Checkbox` (with `indeterminate`) can go directly inside a `TableHead align="center"`.

**Row actions.** Put actions in a last column of `action` cells.

- One or two frequent actions (Edit, Download) → inline icon `Button`s (`variant="tertiary" iconOnly unpadded`, matching the ⋮), each with a `Tooltip`. Space them with `gap-(--inline-3)`.
- Three or more, or a tight table → `TableRowActions`: a ⋮ button that opens the same menu as `Dropdown` (`MenuPanel` + `MenuItem`). Put destructive actions last with `destructive: true`.
- Both is fine: the most common action inline, followed by `TableRowActions` for the rest.

```tsx
import { TableRowActions } from '@judi-health/minerva-ds'

<TableCell type="action">
  <TableRowActions
    label={`Actions for case ${c.id}`}
    actions={[
      { label: 'Reassign', onClick: () => reassign(c.id) },
      { label: 'Download', onClick: () => download(c.id) },
      { label: 'Delete', onClick: () => confirmDelete(c.id), destructive: true },
    ]}
  />
</TableCell>
```

Don't build a ⋮ button or menu by hand. `TableRowActions` keeps the menu from being clipped by the table, closes it on outside click, Escape or scroll, and supports arrow keys.

**Expandable rows.** `detail` is a full-width area under the row, shown while `expanded` is true. It keeps the row's fill and doesn't break the alternating colors.

```tsx
import { TableExpandButton } from '@judi-health/minerva-ds'

<TableRow expanded={isOpen} detail={<CaseHistory caseId={c.id} />}>
  <TableCell type="expand">
    <TableExpandButton expanded={isOpen} onClick={() => toggleOpen(c.id)} />
  </TableCell>
  ...
</TableRow>
```

Use an empty `<TableHead />` above an expand column.

