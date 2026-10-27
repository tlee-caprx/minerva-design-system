# Color foundation audit

Status: source inventory and mapping decisions, **not** approved theme values.
Sources inspected: `../minerva-ds/src/tokens/primitive/colors.ts`,
`../minerva-ds/src/tokens/semantic/colors.ts`,
`../mochi-ds/src/tokens/primitives.css`, and
`../mochi-ds/src/tokens/brand.css`.

## What exists

| | Minerva | Mochi (local) |
| --- | --- | --- |
| Primitives | 86 entries in the Minerva palette: turquoise, neutral, red, orange, yellow, green, purple, branding, and special; global white/black/transparent are separate. Most ramps use `050`–`900`, with a few named lightening/darkening values. | 121 numbered colors: 11 families (indigo, blue, teal, green, yellow, orange, pink, red, purple, slate, stone), each `50`–`950`; plus white/black/transparent. |
| Roles | 201 entries in `minervaTokens`: 65 backgrounds, 24 borders, 47 text, 46 icons, plus 19 AI/gradient/shadow/utility entries. Names are specific to property, context, role, and often state. | 70 `--brand-*` tokens before its Tailwind registration block. They cover broad surfaces, primary/secondary/accent, feedback, border/focus/input, status, plus typography and radius. Fewer distinct interaction and icon roles are named. |
| Current mechanism | TypeScript source generates static CSS under `[data-theme="minerva"]`; consumers already rely on these names. | `primitives.css` uses `@theme static`; `brand.css` defines runtime `:root` roles and repeats them as `@theme inline` aliases. |

These counts describe the **original local source**. `brand2.css` has since
been reconstructed locally from screenshots and is compared in
`COLOR_ROLE_MAP.md`; the company source and `brand2-theme.css` were not
available for direct verification.

## Initial color-role alignment

This table identifies intent, **not** final token values or a complete 201-token one-to-one conversion.

| Shared role to define | Minerva source | Mochi source | Assessment |
| --- | --- | --- | --- |
| Base surface | `bg-surface-base` | `--brand-surface` / `--brand-bg` | Clear intent; verify whether page and contained surface should remain separate. |
| Raised/subtle surface | `bg-surface-subtle`, `bg-surface-muted` | `--brand-surface-raised`, `--brand-surface-sunken` | Do not equate `raised` with `subtle` without viewing examples; names describe different dimensions. |
| Base text | `text-surface-base` | `--brand-fg` / `--brand-surface-fg` | Clear intent; verify context-specific foregrounds. |
| Subtle text | `text-surface-subtle` | `--brand-muted-fg` | Candidate only; the local Mochi muted pair needs contrast review. |
| Base border | `border-surface-base` | `--brand-border` | Clear intent. |
| Primary action background | `bg-action-primary-idle/hover/pressed` | `--brand-primary/primary-hover/primary-active` | Idle and hover align; Mochi `active` must be confirmed as **pressed**, not selected/current. |
| Primary action foreground | `text-action-primary-idle/hover/pressed` | `--brand-primary-fg` | Mochi has one shared foreground value; it may be reused for all states if validated. |
| Focus border/ring | `border-control-default-focus` and other focus roles | `--brand-border-focus`, `--brand-ring` | Different focus contexts; do not collapse into one role prematurely. |
| Link text/icon | `text-action-hyperlink`, `icon-action-hyperlink` | No explicit hyperlink role in local `brand.css` | Missing Mochi semantic decision. Do not assume `--brand-primary`. |
| Feedback | `bg-feedback-*` with text/icon counterparts | `--brand-success/warning/destructive/info` with foreground/subtle pairs | Align terminology and contexts; verify each pair independently. |
| Control state | `bg-control-*`, `border-control-*`, `text-control-*`, `icon-control-*` | Mostly `--brand-input-border*`; few other control roles | Mochi has a substantial naming/coverage gap relative to Minerva. Define on demand from approved component designs. |

## Value and contrast flags

The following ratios were calculated from the values in the local token files;
they are evidence for review, **not** automatic replacements:

- Mochi `--brand-success` (`#09a549`) with `--brand-success-fg`
  (`#fafaf9`): approximately **3.10:1**.
- Mochi `--brand-accent` (`#2fbaa8`) with `--brand-accent-fg`
  (`#fafaf9`): approximately **2.31:1**.
- Mochi `--brand-muted` (`#f5f4f3`) with `--brand-muted-fg`
  (`#b9b2ac`): approximately **1.91:1**.
- For comparison, the local primary pairs are approximately **6.62:1**
  (Mochi indigo/stone-50) and **5.23:1** (Minerva turquoise/white).

Those first three pairs may be unsuitable for ordinary text at their current
sizes. Confirm intended usage and approved company values before changing them.

## Decisions before implementation

1. Keep the existing packages intact while the shared package is being mapped.
2. Use the same **naming grammar** for primitives in both themes, not an
   artificial identical set of palette families or steps. Normalize Minerva
   `050` to `50` only in the new shared package; preserve legacy names upstream.
3. Define shared semantic names by **UI purpose**, with distinct foreground,
   background, border, and icon roles when needed. A theme must not silently
   fall back to the other theme's value.
4. Resolve ambiguous terms (`raised` vs `subtle`, `active` vs `pressed`,
   `muted` vs `disabled`) from component examples before mapping.
5. Treat the company `brand2.css` source as necessary to validate the Mochi
   palette-role mappings. The screenshot alone does not establish all values.
6. Only after the color mapping is approved should the pilot's hard-coded
   theme values be replaced and components migrated.
