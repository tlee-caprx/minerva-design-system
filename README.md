# @judi-health/minerva-ds

Minerva design system for Judi prototypes: React components, icons, design tokens, and the `minerva` / `evolution` themes.

## Install

```bash
npm install github:tlee-caprx/minerva-design-system#release
```

You need read access to the `tlee-caprx/minerva-design-system` repo. Pin a version with a tag instead of `release`, e.g. `#minerva-ds-v0.1.0`.

Then follow [guidelines/setup.md](guidelines/setup.md): add Tailwind, replace `src/index.css`, and set `data-theme` on `<html>`.

## Use

```tsx
import { AppLayout, SideNavItem, Button } from '@judi-health/minerva-ds'

export default function App() {
  return (
    <AppLayout
      variant="minerva"
      appName="My Prototype"
      breadcrumbs={[{ label: 'Home' }]}
      title="Dashboard"
      sideNavContent={<SideNavItem label="Home" active />}
      actions={<Button variant="primary">New</Button>}
    >
      {/* page content */}
    </AppLayout>
  )
}
```

## Entry points

| Import                                     | Contents |
| ------------------------------------------ | -------- |
| `@judi-health/minerva-ds`                  | Core components and icons |
| `@judi-health/minerva-ds/patterns`         | Judi-specific compositions: `KeyCaseDetails`, `JudiAssistantPanel` |
| `@judi-health/minerva-ds/document-viewer`  | `DocumentViewer` (PDF engine, kept separate because it's large) |
| `@judi-health/minerva-ds/tokens`           | Token values as JS objects (`themes`, primitives) |
| `@judi-health/minerva-ds/tokens.css`       | CSS variables, fonts, and base styles, for apps running their own Tailwind |
| `@judi-health/minerva-ds/style.css`        | Fully precompiled stylesheet, for apps without Tailwind |

## Building with Claude Code

The package ships its rules for AI-assisted prototyping in `guidelines/`. In a new prototype project, tell Claude:

> Set up this project with the Minerva design system by following `node_modules/@judi-health/minerva-ds/guidelines/setup.md`, then read `Guidelines.md` and `components.md` in the same folder before building any UI.

Add this to the project's `CLAUDE.md` so every session follows the same rules:

```md
This project uses the Minerva design system (@judi-health/minerva-ds).
Before building or changing UI, read node_modules/@judi-health/minerva-ds/guidelines/Guidelines.md
and components.md. Use Minerva components and tokens; never hardcode colors, spacing, or fonts.
```

## Guidelines

- [setup.md](guidelines/setup.md): project setup
- [Guidelines.md](guidelines/Guidelines.md): workflow and rules
- [components.md](guidelines/components.md): every component, with usage
- [tokens.md](guidelines/tokens.md): picking spacing, color, radius and shadow tokens for custom UI
- [JudiAssistant.md](guidelines/JudiAssistant.md): the Judi AI chat surface
