# Judi design systems

| Path                     | What it is |
| ------------------------ | ---------- |
| `packages/minerva-ds`    | **`@judi-health/minerva-ds`**: the Minerva design system package designers install. See its [README](packages/minerva-ds/README.md). |
| `apps/docs`              | Documentation site: every Minerva foundation, component, and pattern, with a theme switcher. |
| `apps/tap-prototype`     | TAP case review prototype, an example product built on Minerva. |
| `packages/judi-ui`       | Early work on a shared Minerva + Mochi system. Not part of the npm workspace yet. |
| `packages/mochi-ds`      | Mochi consumer design system (pnpm). Not part of the npm workspace yet. |
| `docs/`                  | Planning notes, including the Minerva/Mochi consolidation inventory. |

## Develop

```bash
npm install
npm run dev:docs   # docs site
npm run dev:tap    # TAP prototype
```

Both apps load `packages/minerva-ds/src` directly, so component edits hot-reload without a rebuild.

```bash
npm run build      # build packages/minerva-ds into dist/
npm run typecheck
```

## Release

Every push to `main` that touches `packages/minerva-ds` runs `.github/workflows/release-minerva.yml`. The workflow builds the package and commits the result to the `release` branch, which designers install from:

```bash
npm install github:tlee-caprx/minerva-design-system#release
```

To cut a pinnable version, bump `version` in `packages/minerva-ds/package.json`. The workflow then also tags `minerva-ds-v<version>`.
