# Shared color-role map: Minerva ↔ Mochi

Status: initial core roles implemented in `src/tokens/semantics.css`. This
document also tracks roles still awaiting a design decision. The existing
Minerva and Mochi packages are unchanged.

Sources: Minerva `primitive/colors.ts` and `semantic/colors.ts`; Mochi
`primitives.css`, local `brand.css`, and the screenshot-reconstructed
`brand2.css`. Screenshot transcription should be checked against the company
source before this map becomes production-authoritative.

## Palette comparison

| Palette purpose | Minerva | Mochi | Decision |
| --- | --- | --- | --- |
| Primary brand | turquoise `050–900`, with named hover/pressed adjustments | `brand-primary-50–950` → indigo | Same **role**, different hue and step coverage. Never assume Minerva `500` equals Mochi `500` in a UI state. |
| Neutral | neutral `050–900` | `brand-secondary-50–950` → stone; `brand-tertiary-50–950` → slate | Mochi has two neutral-like ramps. A semantic surface/text role must choose one explicitly. |
| Success | green `050–900` | `semantic-success-50–950` → green | Comparable intent, not equal luminance. |
| Error | red `050–900` | `semantic-error-50–950` → red | Comparable intent. |
| Warning | yellow `050–900` | `semantic-warning-50–950` → yellow; `semantic-attention-50–950` → orange | Warning and attention are separate Mochi concepts; don't merge them by default. |
| Informational | turquoise is used in Minerva feedback | `semantic-message-50–950` → blue; local `--brand-info` → indigo | Mochi sources disagree on the intended information ramp. Resolve before final mapping. |
| Accents | purple plus branding/special colors | `accent-primary` → teal; `accent-secondary` → pink; `semantic-miscellaneous` → purple | No direct role equivalence. Keep separate until usage is specified. |

Minerva uses `050`; Mochi uses `50` and also has `950`. The new package may
normalize the spelling to `50`, but must not invent a Minerva `950` or force
numeric steps to serve identical UI purposes.

## Shared semantic roles that can be mapped now

The names below follow `TOKEN_CONTRACT.md`. Values are traced to existing
source tokens; they are not guesses from color similarity.

| Shared semantic token | Minerva source → value | Mochi source → value | Status |
| --- | --- | --- | --- |
| `--background` | `bg-surface-base` → `#ffffff` | `--brand-bg` → `#ffffff` | Mapped for initial app canvas |
| `--foreground` | `text-surface-base` → `#313e48` | `--brand-fg` → `#211f1c` | Mapped |
| `--card` | `bg-surface-base` → `#ffffff` | `--brand-surface` → `#ffffff` | Mapped |
| `--card-foreground` | `text-surface-base` → `#313e48` | `--brand-surface-fg` → `#211f1c` | Mapped |
| `--border` | `border-surface-base` → `#cfd9e1` | `--brand-border` → `#ecebe9` | Mapped |
| `--primary` | `bg-action-primary-idle` → `#0071b3` | `--brand-primary` / indigo-600 → `#1438ff` | Mapped |
| `--primary-foreground` | `text-action-primary-idle` → `#ffffff` | `--brand-primary-fg` / stone-50 → `#fafaf9` | Mapped |
| `--destructive` | `bg-feedback-error-base` → `#b8222a` | `--brand-destructive` / red-600 → `#ca1a26` | Mapped by intent; validate usage |
| `--destructive-foreground` | `text-feedback-error-inverse` → `#ffffff` | `--brand-destructive-fg` / stone-50 → `#fafaf9` | Mapped |
| `--success` | `bg-feedback-success-base` → `#317861` | `--brand-success` / green-500 → `#09a549` | Candidate only; not implemented until foreground contrast is resolved |
| `--warning` | `bg-feedback-warning-base` → `#e1cf77` | `--brand-warning` / yellow-500 → `#ffca28` | Mapped by intent; use appropriate dark foreground |
| `--warning-foreground` | `text-feedback-warning-strong` → `#313e48` | `--brand-warning-fg` / yellow-950 → `#241b00` | Mapped |
| `--input` | `border-control-default-idle` → `#aebfcc` | `--brand-input-border` / stone-200 → `#ecebe9` | Mapped as input border |
| `--ring` | `border-control-default-focus` → `#008dce` | `--brand-ring` / indigo-500 → `#4763ff` | Mapped as focus indicator color |

## Roles intentionally unresolved

| Role | Why it remains open |
| --- | --- |
| App vs card differentiation | Both source systems currently map app background and card to white. Keep separate semantic names so a later canvas change does not force card changes. |
| Primary pressed background | Minerva has explicit `pressed`; Mochi local `--brand-primary-active` may mean pressed **or** selected/current. Confirm component behavior. |
| Primary hover background | Source values exist (`#007ec7` / `#0022e0`), but this belongs in a Button or action-state token rather than the shared base `--primary` pair. |
| Subtle, muted, raised, sunken surfaces | These words encode different purposes; mapping by lightness alone would hide a design decision. |
| Secondary and tertiary actions | Minerva's secondary action is transparent; Mochi's `--brand-secondary` is a filled stone color. Component variants need review. |
| Link text and icon | Minerva has explicit hyperlink roles; local Mochi roles do not. Do not silently use primary indigo. |
| Focus and control states | Minerva differentiates focus/control contexts; Mochi local roles are broader. Map with the actual control specs. |
| Information/message background | Mochi's local `--brand-info` uses indigo while reconstructed `semantic-message` uses blue. Determine whether these are separate use cases or a revision. |
| Accent and miscellaneous roles | The palettes are available, but shared UI meaning is not established. |

## Contrast observations from local values

The local Mochi success background with its current foreground is about
**3.10:1**; accent is **2.31:1**; muted text on its muted background is
**1.91:1**. These pairs need intended text size/use and design review before
becoming shared semantic foreground/background pairs. The primary action pair
is about **6.62:1** for Mochi and **5.23:1** for Minerva.

## Implementation gate

The pilot reads the implemented core semantic pairs. Do not add more shared
roles or treat the pilot Button as complete until the Mochi info/message
conflict and unresolved interaction states are reviewed. Missing roles should
fail review rather than fall back to another theme's values.
