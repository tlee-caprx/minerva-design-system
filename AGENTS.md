# Minerva design system: agent instructions

This repo builds and publishes `@judi-health/minerva-ds`, the Minerva design system that Judi designers install into their prototypes. Prototypes themselves live elsewhere, not in this repo.

## Layout

- `packages/minerva-ds/`: the package.
  - `src/components/`: core components (`layout/`, `navigation/`, `ui/`), one folder per component with `Component.tsx` and `index.ts`.
  - `src/patterns/`: Judi-specific compositions built from core components (`KeyCaseDetails`, `JudiAssistant`, `DocumentViewer`).
  - `src/tokens/`: TypeScript source of truth for tokens (primitive → semantic).
  - `src/styles/`: `themes.css` (generated), `base.css`, `fonts.css`, plus `tokens.css` and `index.css`, which become `dist/tokens.css` and `dist/style.css`.
  - `guidelines/`: Markdown shipped in the package. Designers' AI tools read these files to build with Minerva. Treat them as public API.
- `apps/documentation/`: documentation site, with one file per section in `src/sections/`. It resolves the package from `packages/minerva-ds/src` through Vite aliases, so edits hot-reload.
- `scripts/prepare-release.mjs` and `.github/workflows/release-minerva.yml`: publish the built package to the `release` branch.

## Commands

Run from the repo root:

```bash
npm install
npm run dev:documentation   # documentation site at localhost:5173
npm run build               # generate themes.css, then build packages/minerva-ds/dist
npm run typecheck           # package + documentation app
```

## Rules

- **Tokens:** edit `src/tokens/**/*.ts`, never `src/styles/themes.css`, which `npm run build` regenerates. Every value in a component comes from a CSS variable: no hex values, raw pixels, or Tailwind's default scale (`p-4`). Use the token syntax `p-(--inset-6)` and `bg-(--bg-surface-base)`.
- **Typography:** use the `Text` component, never Tailwind text classes.
- **Themes:** components must work under both `data-theme="minerva"` and `data-theme="evolution"`. Check both with the documentation app's theme switcher.
- **React:** peer range is React 18 and 19. Don't use APIs that exist in only one of them.
- **Dependencies:** core components depend only on React. A component that needs a third-party library belongs in `src/patterns/`. If that library is heavy, or emits assets like wasm or workers, give it its own entry point the way `document-viewer` has one (add it to `vite.config.ts` `build.lib.entry`, to `package.json` `exports`, and to the documentation app's aliases in `vite.config.ts` and `tsconfig.json`).

## Adding or changing a component

1. Create `src/components/ui/Name/Name.tsx` and `index.ts`, following an existing component such as `Tag` or `Button`. Export its props type.
2. Export it from `src/components/index.ts`, or from `src/patterns/index.ts` for a pattern. Anything not exported there is unreachable for consumers.
3. Add or update its section in `apps/documentation/src/sections/` and register it in `NAV_GROUPS` in `apps/documentation/src/App.tsx`.
4. Update `guidelines/components.md`: the table at the top, plus a usage section if designers need guidance. Keep examples importing from `@judi-health/minerva-ds`, never from file paths.
5. Run `npm run typecheck && npm run build`, then check the component in the documentation app under both themes.

## Releasing

- Merging to `main` with changes under `packages/minerva-ds/` republishes the `release` branch automatically. Never commit to `release` by hand.
- Bump `version` in `packages/minerva-ds/package.json` for changes designers should be able to pin to. Use a minor bump for new components and a major bump for removed or renamed exports, props or tokens. The workflow tags `minerva-ds-v<version>`.
- A breaking change to an export, prop or token also needs the matching update in `guidelines/`.
