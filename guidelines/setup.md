# Setup

Follow these steps in order before writing any page code. They assume a React + Vite project. If the project doesn't exist yet, create one first:

```bash
npm create vite@latest my-prototype -- --template react-ts
cd my-prototype
```

---

## 1. Install the package

```bash
npm install github:tlee-caprx/minerva-design-system#release
```

This installs `@judi-health/minerva-ds` from the `release` branch of the design system repo. You need read access to that repo (the same access you use for `git clone`).

To pin a version, use a tag instead of `release`, e.g. `#minerva-ds-v0.1.0`.

---

## 2. Install Tailwind

Minerva's spacing, color, and radius utilities (`p-(--inset-6)`, `bg-(--bg-surface-base)`) are Tailwind v4 classes, so the project needs Tailwind:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Add the plugin to `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
```

---

## 3. Replace `src/index.css`

Replace the entire contents of `src/index.css` with exactly this. Order matters: `tokens.css` must be first.

```css
@import "@judi-health/minerva-ds/tokens.css";
@import "tailwindcss";
@source "../node_modules/@judi-health/minerva-ds/dist";
```

- `tokens.css` defines every Minerva CSS variable, the fonts, and base styles.
- `@source` tells Tailwind to generate the classes Minerva's components use.

Delete `src/App.css` and remove its import — Minerva provides all styling.

---

## 4. Set the theme

Set `data-theme` on the `<html>` tag in `index.html`. Without it, every token is undefined and components render unstyled.

```html
<html lang="en" data-theme="minerva">
```

- `minerva` — 16px base, Source Sans 3
- `evolution` — 14px base, Inter

Pass the same value to `AppLayout`'s `variant` prop.

---

## 5. Import components by name

```tsx
import { AppLayout, SideNavItem, Button, ButtonGroup, Tag, AddIcon } from '@judi-health/minerva-ds'
import { KeyCaseDetails } from '@judi-health/minerva-ds/patterns'
```

Never import from a file path inside `node_modules`, and never copy or edit the package's files. See `components.md` for every component.

---

## Starter template

Every page must use AppLayout. Use this as `src/App.tsx`:

```tsx
import { AppLayout, SideNavItem, Tag } from '@judi-health/minerva-ds'

export default function App() {
  return (
    <AppLayout
      variant="minerva"
      appName="My App"
      breadcrumbs={[{ label: 'Home' }]}
      title="Dashboard"
      titleMeta={<Tag variant="info">Draft</Tag>}
      sideNavContent={
        <>
          <SideNavItem label="Home" active />
          <SideNavItem label="Settings" />
        </>
      }
    >
      {/* page content here */}
    </AppLayout>
  )
}
```

---

## Adding page actions

```tsx
import { Button, ButtonGroup, AddIcon } from '@judi-health/minerva-ds'

<AppLayout
  ...
  actions={
    <ButtonGroup>
      <Button variant="secondary">Export</Button>
      <Button variant="primary" leftIcon={AddIcon}>New Item</Button>
    </ButtonGroup>
  }
>
```

---

## Detail page (with back button)

```tsx
import { useNavigate } from 'react-router'

const navigate = useNavigate()

<AppLayout
  ...
  breadcrumbs={[{ label: 'Home' }, { label: 'Cases', href: '/cases' }, { label: 'Case #1234' }]}
  title="Case #1234"
  onBackClick={() => navigate(-1)}
>
```

---

## Without Tailwind

If a project can't run Tailwind, import the precompiled stylesheet once instead of steps 2–3:

```ts
import '@judi-health/minerva-ds/style.css'
```

Components render correctly, but Minerva's utility classes are only available where the components already use them, so custom layout code must use inline `style` with `var(--token)` values.

---

## Updating

```bash
npm update @judi-health/minerva-ds
```

If that doesn't pick up a new release, reinstall with the command from step 1.
