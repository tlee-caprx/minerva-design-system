# Judi UI color-token contract

Status: foundation proposal. No component is considered migrated until both themes
provide its required tokens and its states have been visually checked.

## Value flow

```text
Theme primitives → brand palette roles → semantic color roles → component tokens
                                                        ↘ Tailwind utility aliases
```

The four stages describe **value ownership**, not a required number of CSS files.
`brand2-theme.css` in the supplied Mochi screenshots registers existing palette
tokens with Tailwind through `@theme inline`; it does not assign new colors and
is not another value layer. The local Mochi `brand.css` currently maps many
semantic roles directly to primitives. We will not assume that the company
`brand2.css` replaces or extends that file until its source is available.

## Naming rules

The shared semantic layer uses unprefixed background/foreground pairs,
following the agreed app-root theming model. A token name has exactly
the same meaning under `[data-judi-theme="minerva"]` and
`[data-judi-theme="mochi"]`. Only its assigned value changes.

| Stage | Naming pattern | Example | Rule |
| --- | --- | --- | --- |
| Primitive | `--color-{family}-{step}` | `--color-indigo-500` | Literal palette value, scoped to the selected root theme. Both themes use the same naming grammar but need not have identical families or steps. |
| Brand palette | `--brand-{role}-{step}` | `--brand-primary-500` | Theme-chosen ramp. Define a step only when the source has an approved value; do not fabricate a `950`. |
| Semantic | `--{role}` / `--{role}-foreground` | `--primary` / `--primary-foreground` | The base role is a background; its paired foreground is text/icon color on that background. Use familiar shadcn names where the meaning matches. |
| Component | `--{component}-{variant}-{property}-{state}` | `--button-primary-bg-hover` | Owns component-specific states and is scoped to the component selector, not the app root. |

Prefer `idle`, `hover`, `pressed`, `focus`, `disabled` for interaction states.
Legacy `active` must be classified as either selected/current or pressed before
mapping; those are different states. Use `bg`, `text`, `icon`, and `border`
consistently in component token names. The semantic layer describes common
surfaces and their foregrounds; component tokens retain granular state control.
The app-root theme intentionally owns these unprefixed semantic names, so a
consumer cannot combine Judi UI with another root theme without an explicit
integration decision.

## Theme and Tailwind boundaries

- Apply one theme at the application root with `data-judi-theme="minerva"` or
  `data-judi-theme="mochi"`. Do not mix the themes within a page.
- The CSS custom properties are the runtime contract. `@theme inline` is an
  optional Tailwind-facing alias layer, not a second definition of values.
- Keep layout utilities in Tailwind. Component state styling reads component
  tokens in its CSS rather than embedding raw values or arbitrary-variable
  utilities in each JSX branch.
- Do not make the existing pilot Button's hard-coded values authoritative.

## Step 1 scope and acceptance

1. Inventory Minerva's primitive and semantic color tokens and Mochi's local
   primitives and `brand.css`. Review company `brand2.css` and
   `brand2-theme.css` when provided. Keep source names in a mapping table;
   do not rename or delete source-package tokens during this step.
2. Define the shared semantic **color** role set from real use cases: surfaces,
   text, borders, actions, controls, feedback, links, and focus. Mark each role
   as mapped, missing, or requiring a design decision for each theme.
3. Publish a two-theme color specimen for those roles and check readable
   foreground/background pairs. Do not advance to component migration while
   required semantic roles are unresolved.

Typography, spacing, radius, shadows, and Button-specific tokens are later
passes. The current theme-switching demo remains a mechanism test only.
