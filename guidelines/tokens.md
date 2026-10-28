# Tokens

Use this file to pick the right token when you build something Minerva has no component for. The short rules are in `Guidelines.md`. Minerva components already use the right tokens, so you only need this for your own markup.

Every color, spacing and radius value comes from a CSS variable, written with Tailwind's token syntax:

```tsx
// ✓ correct
<div className="p-(--inset-6) gap-(--inline-3) bg-(--bg-surface-base) rounded-(--radius-sm)">

// ✗ wrong: Tailwind's scale, hex values, raw pixels
<div className="p-4 gap-3 bg-white rounded-lg" style={{ borderColor: '#e5e7eb', padding: '16px' }}>
```

Don't guess token names. If the one you want isn't here, use the nearest listed one.

---

## Spacing

Pick the family by what the space is for, then the size.

| Family | Use | Tokens |
| --- | --- | --- |
| `--inset-*` | Padding inside a box | 1–7 |
| `--inline-*` | Gap between items in a row | 1–5 |
| `--stack-*` | Gap between items in a column | 1–5 |
| `--layout-*` | Page-level padding and spacing between page sections | 1–5 |

Sizes, in pixels at the Minerva theme's 16px base. Evolution's 14px base scales them down proportionally.

| Token | px | Typical use |
| --- | --- | --- |
| `--inset-1` | 4 | Tags (vertical) |
| `--inset-2` | 6 | Badges (vertical), dense controls |
| `--inset-3` | 8 | Buttons, inputs, nav items, table cells (vertical) |
| `--inset-4` | 10 | List items |
| `--inset-5` | 12 | Table cells and menu items (horizontal) |
| `--inset-6` | 16 | Messages, compact boxes |
| `--inset-7` | 24 | Panels, modals, page sections |
| `--inline-1` | 4 | Icon next to its text |
| `--inline-2` | 8 | Icon + label, items in a toolbar |
| `--inline-3` | 12 | Grouped items |
| `--inline-4` | 16 | Distinct groups, grid columns |
| `--inline-5` | 24 | Widely separated groups |
| `--stack-1` | 4 | Label and its value |
| `--stack-2` | 8 | Tightly related lines |
| `--stack-3` | 12 | Related items |
| `--stack-4` | 16 | Distinct groups, heading and its content |
| `--stack-5` | 24 | Major sections inside a panel |
| `--layout-1` … `--layout-5` | 16, 24, 32, 40, 48 | Between panels and page sections. `AppLayout` already pads the page with `--layout-4` |

For widths, heights and hairlines, use the `--space-*` primitives in `calc()`: `w-[calc(var(--space-40)*6)]`, `border-(--space-1)`. Never type pixel values.

---

## Typography

Always use the `Text` component. Never use Tailwind text classes (`text-sm`, `font-bold`) or inline font styles. Pick the variant by role, and set color with a text token in `className`.

| Role | Variant |
| --- | --- |
| Page title | `heading-xl`. `AppLayout`'s `title` prop already renders it |
| Section heading | `heading-lg` or `heading-md` |
| Panel or card heading | `heading-sm` |
| Small heading | `heading-xs` |
| Body text | `body-md` (default), `body-sm` (dense), `body-lg` (featured) |
| Form label | `label-md` (default), `label-sm` (compact), `label-lg` |
| Metadata label | Use `MetaItem`. It renders the label as `body-md` semibold |

```tsx
<Text as="h2" variant="heading-sm" className="text-(--text-surface-base)">Member</Text>
<Text variant="body-md" className="text-(--text-surface-subtle)">Last updated 2 hours ago</Text>
<Text variant="body-md" weight="semibold">Bold body text</Text>
```

---

## Color

Names follow `--{property}-{area}-{role}-{state}`:

- **property:** `bg`, `text`, `border`, `icon`
- **area:** `surface` (page and containers), `action` (buttons, links), `control` (inputs, checkboxes, menus), `feedback` (status), `navigation` (header, side nav)
- **state** (optional): e.g. `idle`, `hover`, `pressed`, `active`, `disabled`, `focus`, `readonly`, `invalid`

Use a `text-*` token for text, an `icon-*` token for icons, and so on. Don't borrow a `bg-*` token for text.

**Surfaces**

| Need | Token |
| --- | --- |
| Panel, card, header row background | `--bg-surface-base` |
| Page background, nested panel, striped row | `--bg-surface-subtle` |
| Stronger gray fill | `--bg-surface-muted` |
| Dark surface | `--bg-surface-inverse` |
| Brand (turquoise) bar | `--bg-surface-brand` |
| Default text | `--text-surface-base` |
| Secondary or muted text | `--text-surface-subtle` |
| Text on dark surfaces | `--text-surface-inverse` |
| Default icon | `--icon-surface-base`, `--icon-surface-subtle` for muted |
| Default border, divider | `--border-surface-base` |
| Faint border | `--border-surface-subtle` |
| Hyperlink text | `--text-action-hyperlink` |

**Feedback (status colors)**

Four statuses: `error`, `warning`, `success`, `informational`. Use them only to communicate status, never for decoration.

| Need | Token |
| --- | --- |
| Light status background (e.g. `Message`) | `--bg-feedback-{status}-inverse` |
| Mid-tone status background | `--bg-feedback-{status}-muted` |
| Solid status background | `--bg-feedback-{status}-base` |
| Status border | `--border-feedback-{status}-muted` |
| Status text | `--text-feedback-{status}-base` |
| Status icon | `--icon-feedback-{status}-base` |
| Text or icon on a solid status background | `--text-feedback-{status}-inverse`, `--icon-feedback-{status}-inverse` |

Before building a status box yourself, check whether `Alert`, `Message`, `Tag` or `Tooltip` already covers it.

**Interactive states**

Buttons, inputs and menus are Minerva components and already handle hover, focus and pressed. If you make something custom clickable, such as a clickable list row, use `--bg-control-subtle-hover` for its hover fill and `--border-control-default-focus` for its focus ring.

---

## Radius

| Token | px | Use |
| --- | --- | --- |
| `--radius-sm` | 4 | **The default.** Panels, cards, buttons, inputs, tags, tables, modals |
| `--radius-xs` | 2 | Very small elements |
| `--radius-md` | 8 | Source cards in Judi Assistant only |
| `--radius-full` | 9999 | Pills, avatars, circular icons |

When in doubt, use `--radius-sm`. `--radius-none`, `--radius-soft`, `--radius-lg`, `--radius-xl` and `--radius-2xl` exist but no Minerva component uses them.

---

## Shadow

| Token | Use |
| --- | --- |
| `--shadow-surface-sm` | Panels. `Panel` already applies it |
| `--shadow-surface-md` | Floating surfaces: menus, popovers, the notifications panel |
| `--shadow-surface-lg` | Modals |
