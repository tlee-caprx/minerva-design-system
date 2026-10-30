# Components

Always use a Minerva component when one fits. Build something custom only when nothing here covers it (see `Guidelines.md` → Body Content).

Import everything by name from the package, never from a file path inside `node_modules`:

```tsx
import { AppLayout, Button, Tag } from '@judi-health/minerva-ds'
import { KeyCaseDetails } from '@judi-health/minerva-ds/patterns'
```

## Find a component

Designers often use a different name from the component's. Look in **Also called** before deciding Minerva doesn't have something.

### Core: `@judi-health/minerva-ds`

| Component | Also called | Use |
| --- | --- | --- |
| [`AppLayout`](#applayout) | page, shell, layout, template, frame | Every page. Includes `GlobalHeader`, `ActionBar`, `Breadcrumb` and `SideNav`; set them through its props |
| [`SideNavItem`](#sidenavitem), `SideNavGroup` | sidebar link, left nav, menu item | Items in AppLayout's side nav |
| [`Steps`](#steps) | stepper, progress bar, wizard steps | Progress through a multi-step flow, under the ActionBar |
| [`Text`](#text) | heading, title, paragraph, label, typography | All text |
| [`Button`](#button) | CTA, link, icon button | Actions. `variant="link"` for text links |
| [`ButtonGroup`](#buttongroup) | button row, actions, footer buttons | Two or more related buttons |
| [`Chip`](#chip) | filter chip, toggle, pill button | Quick toggle filters |
| [`Input`](#input-textarea-passwordinput-searchinput), `Textarea`, `PasswordInput`, `SearchInput` | text field, form field, text box, search bar | Typing text. For formatting (bold, lists, links), use `RichTextEditor` |
| [`Dropdown`](#dropdown-multiselectdropdown), `MultiSelectDropdown` | select, picker, combobox, multi-select | Choosing from a list |
| `MenuPanel`, `MenuItem`, `MenuGroup`, `MenuSearchBar` | menu, popover menu, options list | The list inside Dropdown, for building a menu |
| [`Checkbox`, `Radio`](#checkbox-radio) | tick box, radio button, option | Yes/no and single-choice options |
| `FieldWrapper` | field shell | Label, box and helper text around a custom control |
| [`Tag`](#tag) | status, label, chip, pill, status badge | Read-only status |
| [`Badge`](#badge) | removable tag, filter tag, token | An applied filter or selection the user can remove |
| [`Lozenge`](#lozenge) | count, counter, number badge, notification dot | A number next to a tab or nav item |
| [`MetaItem`](#metaitem) | key-value, metadata, label: value, detail | A labeled value |
| [`Message`](#message) | inline message, callout, notice | A status message inside the page content |
| [`Alert`](#alert), `showAlert` | **alert, toast, banner, snackbar, flash message** | Temporary feedback over the page after an action ("Case saved") |
| [`Tooltip`](#tooltip), `TooltipBubble` | hint, hover text, info popover | Short help on hover |
| [`Spinner`](#spinner) | loader, loading indicator | Page or section loading |
| [`Notification`](#notification) | notifications panel, bell dropdown, inbox | The panel that opens from the header bell. Not a toast |
| [`Modal`](#modal), `ModalContent` | dialog, popup, confirmation, lightbox | Confirmations and short focused tasks |
| [`Panel`](#panel) | card, container, box, section, tile | Grouping content in a white box |
| [`Tab`, `TabSet`](#tab--tabset) | tabs, tab bar, segmented control | Switching between views |
| [`Collapse`](#collapse) | accordion, expandable section, disclosure | Sections that open and close |
| [`Divider`](#divider) | separator, rule, line, hr | A line between sections |
| [`Table`](#table) and its parts, `Pagination` | data table, grid, list, data grid | Rows of records |
| [`Icon`](#icon) and every `*Icon` | glyph, symbol | Icons |

### Patterns: `@judi-health/minerva-ds/patterns`

Judi-specific compositions. Use them only when the design shows them.

| Component | Also called | Use |
| --- | --- | --- |
| [`KeyCaseDetails`](#keycasedetails) | case header, case summary bar, member strip | Collapsible member/drug/prescriber bar at the top of a case |
| `JudiAssistantPanel`, `JudiAssistantReviewStep` | Judi AI, chat, assistant, copilot | The Judi AI chat panel. See `JudiAssistant.md` |

### Document viewer: `@judi-health/minerva-ds/document-viewer`

| Component | Also called | Use |
| --- | --- | --- |
| `DocumentViewer` | PDF viewer, file preview | An embedded PDF |

It has its own import path so its large PDF engine is only bundled when used:

```tsx
import { DocumentViewer } from '@judi-health/minerva-ds/document-viewer'
```

### Rich text editor: `@judi-health/minerva-ds/rich-text-editor`

| Component | Also called | Use |
| --- | --- | --- |
| [`RichTextEditor`](#richtexteditor) | RTE, WYSIWYG, formatted text field, text editor, notes field | A text field with bold, italic, underline, strikethrough, lists and links |

It has its own import path so its editor engine is only bundled when used:

```tsx
import { RichTextEditor } from '@judi-health/minerva-ds/rich-text-editor'
```

Not in the table? Minerva doesn't have it. Build it from the components above and the token rules in `Guidelines.md`, and tell the designer it's custom.

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

## Text

Always use `Text` for typography — never Tailwind text classes or raw inline styles.

```tsx
import { Text } from '@judi-health/minerva-ds'

<Text as="h1" variant="heading-xl" className="text-(--text-surface-base)">Page Title</Text>
<Text variant="body-md" className="text-(--text-surface-base)">Body copy</Text>
<Text variant="body-md" weight="semibold">Semibold</Text>
```

Variants: `heading-xl/lg/md/sm/xs` | `body-lg/md/sm` | `label-lg/md/sm`. `tag-label` and `option-default` exist for `Tag` and `MenuItem` internally; don't use them directly.

Use `as` to set the HTML element (`h1`–`h3`, `p`, `span` — defaults to `span`). Use `weight="semibold"` to override a variant's default weight.

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
| `link`      | Inline text link                   |

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

## Chip

A toggle button for quick filters. Use a row of Chips for "show only" filters above a list or table. Use `Badge` for a filter that's already applied and can be removed.

```tsx
import { Chip } from '@judi-health/minerva-ds'

<div className="flex gap-(--inline-2)">
  <Chip selected={filter === 'open'} onClick={() => setFilter('open')}>Open</Chip>
  <Chip selected={filter === 'closed'} onClick={() => setFilter('closed')}>Closed</Chip>
</div>
```

---

## Input, Textarea, PasswordInput, SearchInput

Text fields. Each one includes its own label, required asterisk, info tooltip, helper text and error state, so don't add your own label or error message around it.

```tsx
import { Input, Textarea, SearchInput, PasswordInput } from '@judi-health/minerva-ds'

<Input label="Member ID" required value={memberId} onChange={(e) => setMemberId(e.target.value)} />
<Input label="NPI" instructions="10 digits" invalid={npiInvalid} />
<Input label="Date of birth" tooltip="As shown on the member's card" placeholder="MM/DD/YYYY" />
<Textarea label="Notes" rows={4} />
<SearchInput placeholder="Search cases" value={query} onChange={(e) => setQuery(e.target.value)} />
<PasswordInput label="Password" />
```

| Prop | Use |
| --- | --- |
| `label` | Text above the field |
| `required` | Adds the asterisk |
| `tooltip` | Info icon after the label, with this text on hover |
| `instructions` | Helper text below the field. Turns red when `invalid` |
| `invalid` | Error state. Shows "Invalid input" if there are no `instructions` |
| `leftIcon`, `rightIcon` | Content inside the field's edges. `Input` takes both; `PasswordInput` takes `leftIcon` |

All other native `<input>` / `<textarea>` props (`value`, `onChange`, `placeholder`, `disabled`, `readOnly`) work as usual. `SearchInput` adds the search icon and a clear button. `PasswordInput` adds the show/hide toggle.

Building a custom control that should look like a field? Wrap it in `FieldWrapper`, which provides the same label, box and helper text.

---

## RichTextEditor

A text field with a formatting toolbar: bold, italic, underline, strikethrough, bulleted and numbered lists, and links. It takes the same `label`, `required`, `tooltip`, `instructions`, `invalid`, `readOnly` and `disabled` props as `Textarea`. The value is an HTML string.

```tsx
import { RichTextEditor } from '@judi-health/minerva-ds/rich-text-editor'

const [notes, setNotes] = useState('')

<RichTextEditor
  label="Reviewer notes"
  required
  placeholder="Add notes for the reviewer"
  instructions="Visible to the pharmacist on this case"
  value={notes}
  onChange={setNotes}
/>

// Showing saved content without editing
<RichTextEditor label="Notes" value={savedNotesHtml} readOnly />
```

- `value` + `onChange` for a controlled field; `defaultValue` for starting content you don't track. `onChange` receives `''` when the field is empty.
- The text area is 182px tall and scrolls past that. `height` (any CSS length) changes it.
- `readOnly` and `disabled` hide the toolbar.
- Links: select text and click the link button, or put the cursor in a link to edit or remove it. Links open in a new tab.
- To display saved HTML outside an editor, use `readOnly` rather than rendering the HTML yourself.

Use `Textarea` for plain text without formatting.

---

## Dropdown, MultiSelectDropdown

A select field. Options are `MenuItem`s, optionally split into sections by `MenuGroup`. It takes the same `label`, `required`, `tooltip`, `instructions` and `invalid` props as `Input`. `Dropdown` doesn't store the value: keep it in your own state, and it marks the matching `MenuItem` as selected for you.

```tsx
import { Dropdown, MultiSelectDropdown, MenuGroup, MenuItem, MenuSearchBar } from '@judi-health/minerva-ds'

<Dropdown
  label="Reviewer"
  placeholder="Choose a reviewer"
  value={reviewer}
  onSelect={setReviewer}
  onClear={() => setReviewer(undefined)}
  searchBar={<MenuSearchBar placeholder="Search reviewers" />}
>
  <MenuGroup label="Pharmacists" />
  <MenuItem label="Chad Ontario" />
  <MenuItem label="Ana Ruiz" />
</Dropdown>

<MultiSelectDropdown label="Status" placeholder="Any status" onChange={setStatuses}>
  <MenuItem label="Open" />
  <MenuItem label="Pending" />
  <MenuItem label="Closed" />
</MultiSelectDropdown>
```

- `onSelect` receives the clicked item's `label`. Omit `onClear` to hide the × button.
- `MultiSelectDropdown` keeps the menu open while picking and shows the selections as removable badges. It stores the selection itself (it has no `value` prop, so it can't be preset or reset from outside) and calls `onChange` with every selected label.
- For a menu of actions rather than a value (a ⋮ menu), use `TableRowActions` in tables. `MenuPanel` and `MenuItem` (with `destructive` for red items) are the building blocks if you need a menu elsewhere.

---

## Checkbox, Radio

```tsx
import { Checkbox, Radio } from '@judi-health/minerva-ds'

<Checkbox label="Expedited review" checked={expedited} onChange={(e) => setExpedited(e.target.checked)} />
<Checkbox label="Select all" checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
<Checkbox label="I attest this is accurate" error errorMessage="Required before submitting" />

<div className="flex flex-col gap-(--stack-2)">
  <Radio name="decision" label="Approve" checked={decision === 'approve'} onChange={() => setDecision('approve')} />
  <Radio name="decision" label="Deny" checked={decision === 'deny'} onChange={() => setDecision('deny')} />
</div>
```

- `label` is optional. Without one, pass `aria-label` (as in table selection columns).
- `padding` makes the row as tall as a Button, for lists and form rows.
- `readOnly` shows the value but blocks changes. Use it instead of `disabled` when the user should still see the value clearly.
- `indeterminate` (Checkbox only) shows a dash for a partly selected group.

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

Same colors as the `info` Tag but supports an optional dismiss button. Use for removable filters or selections.

```tsx
import { Badge } from '@judi-health/minerva-ds'

<Badge>Label</Badge>
<Badge onClose={() => removeFilter()}>Status: Active</Badge>
```

---

## Lozenge

A small count bubble, e.g. the number of items in a tab or nav item. Pass it to `Tab`'s `rightSlot` or `SideNavItem`'s `lozenge`.

```tsx
import { Lozenge } from '@judi-health/minerva-ds'

<Tab label="Open" rightSlot={<Lozenge count={12} />} />
<SideNavItem label="Inbox" lozenge={<Lozenge count={3} variant="dark" />} />
```

Variants: `light` (default) | `dark`

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

## Alert

Temporary feedback shown over the page after something happens: "Case saved", "Couldn't reach the server". Designers call it an alert, toast or banner. It has two properties, matching Figma:

| Prop | Values | Figma property |
| --- | --- | --- |
| `type` | `success` \| `warning` \| `error` \| `general` | Type |
| `variant` | `banner` \| `toast` | Style (React reserves `style`, so it's `variant` in code) |

- **Banner:** full width, covers the global header, × to dismiss.
- **Toast:** hugs its text, centered at the top of the page, no ×. Several toasts stack.
- Both disappear after 5 seconds. A new banner replaces the current one.
- The message is plain text only: no header, links or buttons. For status that should stay on the page, or that needs an action, use [`Message`](#message).

Show one by calling `showAlert` from an event handler. `AppLayout` already renders the `AlertViewport` where it appears, so there's nothing to add to the page:

```tsx
import { showAlert } from '@judi-health/minerva-ds'

const handleSave = () => {
  saveCase()
  showAlert({ type: 'success', variant: 'toast', message: 'Case saved' })
}

showAlert({ type: 'error', variant: 'banner', message: 'We couldn’t submit the determination. Try again.' })
showAlert({ type: 'general', variant: 'toast', message: 'Draft autosaved', duration: 3000 })
```

- `duration` (milliseconds) overrides the 5-second default.
- `showAlert` returns an id. Pass it to `dismissAlert(id)` to remove the alert early.
- On a page without `AppLayout`, render `<AlertViewport />` once yourself.

To show an alert in place for a static mockup or a screenshot of a state, render the component directly. A banner takes `onClose`:

```tsx
import { Alert } from '@judi-health/minerva-ds'

<Alert type="warning" variant="banner" onClose={() => {}}>Your session expires in 5 minutes</Alert>
<Alert type="success" variant="toast">Case saved</Alert>
```

Never build a toast or banner yourself, and never use `Message` for one.

---

## Message

An inline status box inside the page content, with an icon, an optional bold header, body text and an optional action. Designers may call it an inline message, callout or notice.

`Message` is not an alert, toast or banner: those are [`Alert`](#alert). Use `Message` for status that belongs to the page and stays put; use `Alert` for temporary feedback after an action.

```tsx
import { Message, Button } from '@judi-health/minerva-ds'

<Message variant="warning" header="Prior authorization expires soon">
  This authorization expires on 05/26/2026. Request an extension before then.
</Message>

<Message
  variant="error"
  action={<Button variant="tertiary" unpadded onClick={retry}>Retry</Button>}
>
  We couldn't load the member's claims.
</Message>
```

Variants: `informational` | `success` | `warning` | `error`

- Place it in the page flow, next to the content it's about. It doesn't float.
- `icon` replaces the default status icon, e.g. `AIIcon`. `ai` adds the Judi AI gradient background.

---

## Tooltip

Short help text shown on hover and keyboard focus. Wrap the element that triggers it.

```tsx
import { Tooltip, Button, Icon, EditIcon, InfoCircleIcon } from '@judi-health/minerva-ds'

<Tooltip content="Edit case">
  <Button variant="tertiary" iconOnly unpadded aria-label="Edit case"><Icon icon={EditIcon} /></Button>
</Tooltip>

<Tooltip content="Based on the last 12 months of claims" beak="top">
  <Icon icon={InfoCircleIcon} size="small" />
</Tooltip>
```

- `beak` sets which side the arrow is on, which also sets placement: `bottom` (default, tooltip above), `top`, `left`, `right`, `none`.
- Every icon-only button should have a Tooltip naming its action.
- Form fields have a built-in `tooltip` prop, and truncated table cells show one automatically, so don't add your own there.
- `TooltipBubble` is the bubble on its own, for static mockups only.

---

## Spinner

Used automatically inside Button when `loading` is set. Only use standalone for page or section loading states.

```tsx
import { Spinner } from '@judi-health/minerva-ds'

<Spinner />
```

---

## Notification

The notifications dropdown panel that opens from the bell in the global header, with "Mark All As Read" and "View All" in its header. It isn't a toast or alert.

```tsx
import { Notification } from '@judi-health/minerva-ds'

<Notification onMarkAllAsRead={markAllRead} onViewAll={() => navigate('/notifications')}>
  {/* your list of notification items, built with Text, Tag and Button variant="link" */}
</Notification>
```

---

## Modal

A dialog over the page for confirmations and short focused tasks. It has a title, a body, and a footer with a tertiary action on the left and buttons on the right.

```tsx
import { Modal, Button, Text } from '@judi-health/minerva-ds'

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete case?"
  rightActions={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" destructive onClick={deleteCase}>Delete</Button>
    </>
  }
>
  <Text variant="body-md" className="text-(--text-surface-base)">
    This permanently deletes Case #123456 and its documents.
  </Text>
</Modal>
```

- `rightActions` are wrapped in a `ButtonGroup` for you. Put the primary button last.
- `leftAction` takes one tertiary Button, e.g. "Learn more".
- `ModalContent` is the dialog box without the overlay, for static mockups.

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

## Collapse

A section with a header that expands and collapses its content (an accordion item). Stack several for an accordion.

```tsx
import { Collapse, Button } from '@judi-health/minerva-ds'

<Collapse title="Prescriber details" defaultOpen>
  {/* content */}
</Collapse>

<Collapse style="underline" title="Attachments" actions={<Button variant="tertiary">Upload</Button>}>
  {/* content */}
</Collapse>
```

- `style`: `default` (bordered box) | `underline` | `blank` | `underline-flush` | `blank-flush` | `unpadded`
- `trigger`: `chevron` (default) | `checkbox`
- `actions` sits on the right of the header. Clicking it doesn't toggle the section.

---

## Divider

A 1px line between sections or items.

```tsx
import { Divider } from '@judi-health/minerva-ds'

<Divider />
<div className="flex items-center gap-(--inline-3)">
  <Text variant="body-md">Left</Text>
  <Divider orientation="vertical" />
  <Text variant="body-md">Right</Text>
</div>
```

Prefer spacing over dividers inside a `Panel`. Use a Divider only when the design shows a line.

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
AttachmentIcon, BankIcon, BellIcon, BoldIcon, BoltIcon, BranchIcon,
CheckCircleIcon, CheckMarkIcon, ChevronDownIcon, ChevronEndIcon, ChevronLeftIcon,
ChevronRightIcon, ChevronStartIcon, ChevronUpIcon, ClockIcon, CloseIcon, CopyIcon,
CreditCardIcon, CustomerServiceIcon, DeleteIcon, DocumentIcon,
DocumentPageFoldIcon, DollarCircleIcon, DollarIcon, DownloadIcon, EditIcon,
EllipsisCircleIcon, EllipsisVerticalIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon,
FaceIdIcon, FilterIcon, GlobeIcon, GrabberIcon, GridIcon, HistoryIcon, HomeIcon,
InfoCircleIcon, ItalicIcon, LinkIcon, LinkOutIcon, ListOlIcon, ListTreeIcon,
ListUlIcon, LocationIcon, LockIcon, LockOpenIcon, LogOutIcon, MedicalIcon,
MenuBarsIcon, MenuGridIcon, MessageDotsIcon, PhoneIcon, PillBottleIcon,
PlaceholderIcon, PrintIcon, QuestionCircleIcon, RedoIcon, RefreshIcon, RemoveIcon,
ScaleIcon, SearchIcon, SeriesIcon, SettingsIcon, ShieldCheckIcon, ShippingIcon,
SortIcon, StarEmptyIcon, StarFilledIcon, StrikethroughIcon, ThumbsDownIcon,
ThumbsUpIcon, UnderlineIcon, UndoIcon, UploadIcon, UserIcon, WarningCircleIcon,
XCircleIcon, XCloseIcon, XIcon
```

---

## KeyCaseDetails

Collapsible full-width bar showing case-level metadata in columns. Clicking the chevron expands each column to reveal sub-fields. Place in AppLayout's `subBar` prop, below `<Steps>` if both are present.

**Always use this component whenever a KeyCaseDetails bar appears in a design.** Do not build a custom version, inline the markup, or skip it because the data is hardcoded. The hardcoded data is intentional — this is a display component for the design system and accepts no props.

```tsx
import { KeyCaseDetails } from '@judi-health/minerva-ds/patterns'

<AppLayout subBar={<KeyCaseDetails />}>
```
