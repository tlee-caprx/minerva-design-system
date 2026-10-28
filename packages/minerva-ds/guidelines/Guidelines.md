# Judi Design System Guidelines

## Workflow

### Starting a new project?

Read `setup.md` completely and follow every step before writing any code.

### Given a design?

1. Analyze the design and identify all components present
2. **Start with the Shell** — set up AppLayout before touching any page content
3. Once the shell is complete, move to body content

### No design given?

Start with the Shell — set up AppLayout with the correct props, then build page content.

---

## Shell — AppLayout

Every page must use AppLayout. Never build a custom layout or render content outside AppLayout.

```tsx
import { AppLayout, SideNavItem, SideNavGroup, Lozenge } from "@judi-health/minerva-ds";
```

Work through each section of AppLayout in order:

### 1. Variant

- `"minerva"` — 16px base, Source Sans 3
- `"evolution"` — 14px base, Inter

### 2. GlobalHeader

Always visible. Determine which props apply from the design:

| Prop                   | When to include                                  |
| ---------------------- | ------------------------------------------------ |
| `appName`              | Design shows a module/app name next to the logo  |
| `headerActions`        | Design shows custom content before the bell icon |
| `onNotificationsClick` | Bell icon is interactive                         |
| `onAccountClick`       | Minerva only — account button is interactive     |
| `accountLabel`         | Minerva only — defaults to "Account"             |
| `onAiClick`            | Evolution only                                   |
| `onKeyboardClick`      | Evolution only                                   |

### 3. ActionBar

Always visible. Determine which props apply from the design:

| Prop               | When to include                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `breadcrumbs`      | Design shows a breadcrumb trail                                                             |
| `title`            | Design shows a page title                                                                   |
| `onBackClick`      | Detail/nested page with a back button                                                       |
| `titleMeta`        | Design shows a status tag or inline metadata beside the title — use `<Tag>` or `<MetaItem>` |
| `secondaryContent` | Second row of content below the title — use `<MetaItem>` for key/value pairs                |
| `actions`          | Action buttons in the top right                                                             |

```tsx
// titleMeta — status tag beside the title
titleMeta={<Tag variant="success">Approved</Tag>}

// secondaryContent — metadata row below the title
// Pass MetaItems as siblings — no wrapper div needed. Spacing between items is handled automatically.
secondaryContent={
  <>
    <MetaItem label="Review Level" value="Initial" />
    <MetaItem icon={ClockIcon} label="Elapses" value="05/26/2026 12:00PM EST" />
  </>
}
```

### 4. Content area

| Prop        | When to include                                                                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `subBar`    | Design shows a full-width bar directly below the ActionBar — use `<Steps>` for a progress indicator, `<KeyCaseDetails>` for collapsible case metadata, or both stacked in a fragment |
| `noPadding` | Design has full-bleed content (tables, split views) — removes the default 40px body padding                                                                                          |

### 5. SideNav

**Only include `sideNavContent` if the design explicitly shows a sidebar.** If there is no sidebar, omit this prop entirely — do not pass null, undefined, or an empty fragment.

If the design has a sidebar:

```tsx
sideNavContent={
  <div className="flex flex-col gap-(--stack-4)">
    <div className="flex flex-col gap-(--space-4)">
      <SideNavGroup label="Section Name" />
      <SideNavItem label="Item One" active />
      <SideNavItem label="Item Two" lozenge={<Lozenge count={3} />} />
    </div>
  </div>
}
```

---

## Body Content

Once the shell is set up, work through the rest of the design:

1. **Find the component in `components.md`.** Its table lists what each component is for and the other names designers use for it (a "card" is a `Panel`). Always use a Minerva component when one fits.
2. **Build custom pieces only when nothing fits.** Put them in their own files, never inline in a page file, and never edit anything inside `node_modules/@judi-health/minerva-ds`.
3. **Custom pieces follow the token rules below.** To pick a specific spacing, color, radius or shadow token, use `tokens.md`.

---

## Rules

- **Layout:** every page uses `AppLayout`. Lay out content with flex or grid, never absolute positioning. Don't set fixed heights; let content size containers.
- **Spacing:** use spacing tokens, never Tailwind's scale (`p-4`, `gap-2`) or pixel values. The scales are `--inset-1`…`7`, `--inline-1`…`5`, `--stack-1`…`5` and `--layout-1`…`5`. Nothing exists beyond those numbers.
- **Typography:** always use the `Text` component. Never use Tailwind text classes (`text-sm`, `font-bold`) or inline font styles.
- **Color:** use color tokens, never hex values or Tailwind color names (`bg-white`, `text-gray-900`).
- **Radius:** `--radius-sm` (4px) for almost everything, `--radius-full` for pills.
- **CSS:** style with Tailwind classes using tokens. Don't write custom CSS classes or stylesheets.

```tsx
// ✓ correct
<div className="flex flex-col gap-(--stack-4) p-(--inset-7) bg-(--bg-surface-base) rounded-(--radius-sm)">
  <Text as="h2" variant="heading-sm" className="text-(--text-surface-base)">Member</Text>
</div>

// ✗ wrong
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg">
  <h2 className="text-lg font-semibold">Member</h2>
</div>
```
