# Mochi Consumer Design System

The Mochi Design System uses a 3-layer token architecture to support multi-brand theming across consumer apps. Components are built with shadcn/BaseUI primitives, styled with CVA (class variance authority), and themed via CSS custom properties consumed through Tailwind 4.

The system is designed to support both runtime theming (SPA via API-driven overrides) and SSR with style injection at request time.

References:

- https://ui.shadcn.com/docs/base-ui
- https://base-ui.com/react/handbook/styling
- https://tailwindcss.com/
- https://cva.style

## Fonts

Mochi self-hosts Work Sans from the variable regular and italic files in
`assets/fonts/work-sans/`. `src/tokens/fonts.css` registers weights 100–900 with
`font-display: swap`, and `src/styles.css` loads those faces before the token
layers. The system font stack remains the fallback. The font files and their
SIL Open Font License are included in the package; the static font variants
are retained in the source folder but are not packaged.

## Icon Pipeline

The design system ships icons as a generated SVG sprite instead of a JavaScript icon runtime.

High-level flow:

1. Raw source SVGs live in `assets/raw/`
2. The canonical Mochi icon surface is defined in `src/icon-manifest.ts`
3. `bin/generate-icons.js` generates:
   - `assets/generated/icons.svg`
   - `src/generated/icons.ts`
4. The app imports the generated sprite asset URL and provides it once via `IconSpriteProvider`
5. The Mochi `Icon` component renders icons with `<svg><use /></svg>`

Key files:

- `assets/raw/` — design-provided source SVGs
- `src/icon-manifest.ts` — canonical icon metadata
- `bin/generate-icons.js` — sprite and type generator
- `assets/generated/icons.svg` — generated sprite asset
- `src/generated/icons.ts` — generated typed icon exports
- `src/components/icon.tsx` — runtime icon component and provider

Methodology:

- The design-provided SVG set is the source of truth for the curated Mochi icon API
- Icon exports are generated as typed string identifiers rather than runtime icon objects
- Icon payload is moved out of JavaScript and into one cacheable static SVG asset

### Adding icons to the pipeline

1. Add the raw SVG to `assets/raw/medium`
2. Add a canonical entry to `src/icon-manifest.ts`
3. Run `pnpm generate:icons`
4. Include the new icon in the ds icons file definition and icons export index file: `app.capitalrx.com/packages/mochi/src/components/icon.tsx` and `app.capitalrx.com/packages/mochi/src/index.ts` files.
5. Use the generated export from `src/generated/icons.ts` through the Mochi `Icon` component, ex. `import { faCheck } from "@consumer/mochi";`

### Updating Illustration colors

Illustrations have tokenized values for their colors but the exported assets do
not reflect these tokens but the realized hex values. You need to update the
illustrations SVG stroke and fill colors with the appropriate tokenized
variables manually. Remember to run the generate icons script after doing this.

## Token Layers

We separate tokens into three layers: primitives → brand roles → component. Each layer gives the next one a more specific meaning.

Primitives answer "what raw values exist?" Brand roles answer "which values does this client use for shared UI purposes?" Component tokens answer "how does this component express those roles?" Client-specific component overrides remain possible when a component needs to differ from the shared roles.

### Layer 1: Primitives

Raw values, no meaning. This is our "periodic table". Tailwind supplies [default scales](https://tailwindcss.com/docs/theme#default-theme-variable-reference); Mochi's color scales extend them in `src/tokens/primitives.css`. The current hex values were transcribed from design screenshots and are pending design review.

Registered via `@theme static` so the complete palette remains available in the built stylesheet. Mochi components should use brand or component tokens instead of raw color primitives.

The palette uses tokens such as `--color-indigo-500` (`bg-indigo-500` in Tailwind). These intentionally replace Tailwind's built-in scales with the same names.

### Layer 2: Brand Tokens

Shared purpose-based choices assigned to primitives: surfaces, text, actions, feedback, typography, and radii. This is the primary layer clients override to whitelabel. The initial mappings in `src/tokens/brand.css` follow the supplied reference screenshots; feedback and contrast pairs still need design review.

This layer has two parts in a single file:

1. `:root {}` declarations that set the runtime _values_ to primitive css variables
2. `@theme inline {}` declarations that register Tailwind utilities

We need both. Read more about why we need `@theme inline` [here](https://tailwindcss.com/docs/theme#referencing-other-variables).

The `:root` gives us CSS custom properties that the browser resolves, referencing layer 1 primitives.

The `@theme inline` registers public brand tokens as Tailwind utilities, allowing consuming apps to write `bg-brand-primary` in application code. The "inline" keyword tells Tailwind to create the utility class mappings without emitting duplicate variable declarations in the output CSS.

> Component tokens are intentionally excluded from Tailwind utilities. The `:root` brand values are the runtime override surface; `@theme inline` only exposes their Tailwind utility names.

Client overrides can target any of the variables defined in `:root`. The `@theme inline` is really a convenience for consumers (exposing the tailwind utilities).

### Layer 3: Component Tokens

The full customization API for each component. They define every visual value a component uses: colors, radii, sizing, typography, etc. Used exclusively by Mochi components.

Defined via `:root {}` in colocated `.tokens.css` files. These are aggregated into a single `components.css` export.
These are **not** registered as Tailwind utilities.
They are consumed via `var()` in CVA definitions.

In each component's CVA definitions:

- Color tokens reference brand roles, e.g. `--button-default-bg: var(--brand-primary)`
- Structural tokens reference primitives, e.g. `--button-default-height: calc(var(--spacing) * 8)`

**Both are overridable per client.** Some properties are not valid for component-specific overrides. See these exceptions below.

What gets tokenized?

- Background colors (per variant, per state)
- Text/foreground colors
- border colors
- focus ring colors
- hover/active/expanded/checked state colors
- border radius
- height, padding, gap (per size variant)
- font size, font weight
- box shadows
- disabled opacity

What is hardcoded in CVA (e.g. we do not allow clients to customize):

- display modes (e.g. `inline-flex`)
- alignment (`items-center`)
- pointer behavior (`pointer-events-none`, `select-none`)
- SVG sizing
- transition properties and duration
- ARIA/data-attribute selectors
- compositional selectors (`in-data-[slot=button-group]`)
- `whitespace-nowrap`, `shrink-0`, `bg-clip-padding`

The idea behind each is we ask ourselves "could a client brand plausibly need this value to be different?" Adjusting the color, height, border, shadows of a button is reasonable. Making a button that isn't `inline-flex` isn't.

**Color tokens reference brand roles**: `--button-default-bg: var(--brand-primary)`
**Structural tokens reference primitives**: `--button-default-height: calc(var(--spacing) * 8)`
**Derived values may reference brand roles with `color-mix`** when an approved state calls for it.

Again, these tokens are customizable in a fine-grained way.

**Token File Structure**:

```css
:root {
  /* variant: default */
  --button-default-bg: var(--brand-primary);
  --button-default-fg: var(--brand-primary-fg);
  --button-default-bg-hover: var(--brand-primary-hover);

  /* variant: secondary */
  /* ... */

  /* shared: chrome */
  --button-radius: var(--brand-radius-lg);
  --button-ring: var(--brand-ring);
  --button-disabled-opacity: 0.5;
  /* shared: typography */
  --button-font-weight: var(--font-weight-medium);

  /* size: default */
  --button-default-height: calc(var(--spacing) * 8);

  /* size: sm */
  /* ... */
}
```

All component token files are aggregated through a single import:

```css
/* src/tokens/components.css */
@import "../components/button/button.tokens.css";
@import "../components/input/input.tokens.css";
```

When a new component is created, add its import here. This is the only manual wiring step currently.

## Import Order / Cascade

```css
/* app/app.css */
@import "tailwindcss";
@import "tw-animate-css";

/* ── Design System Styles ────────────────────────── */
@import "./ds/tokens/primitives.css";
@import "./ds/tokens/brand.css";
@import "./ds/tokens/components.css";

/* ── Base element styles (optional minimal defaults) */
@import "./ds/tokens/base.css";
```

Because Tailwind processes `@import`s in the entrypoint, all `@theme` and `@theme inline` directives in imported files are part of tailwind's build pipeline.

## How Tailwind Fits in

Tailwind is involved at build time only. It scans source code, generates utility classes, and outputs a CSS file. It has zero runtime involvement, which is good for performance. Understanding this is critical to understanding the system.

Some additional notes on tailwind specific behaviors and conventions in this Mochi:

- Tailwind 4 provides `bg-(--var-name)` as a shorthand for `bg-[var(--var-name)]`. Same output, but cleaner. Prefer the shorthand.
- The `text-` utility can mean color or font-size. Prefer `text-(--var)` to resolve to color. Font size needs a type hint, `text-[length:var(--button-default-font-size)]`

## Theming and Whitelabeling

Client themes override CSS custom properties at Layer 2 (brand roles) and, when component token files are added, optionally at Layer 3 (component tokens).

The override mechanism works identically (out of the box) for both runtime (SPA) and server-side rendering (SSR).

We simply use a `<style>` tag rendered in the `<head>` **after** the Mochi stylesheet `:root` declarations. This style tag will override the defaults when the styles are parsed by the browser.

Example:

```html
<html lang="en">
  <head>
    <link rel="stylesheet" href="/assets/app-[hash].css" />
    <style>
      :root {
        --brand-primary: oklch(0.56 0.18 250);
      }
    </style>
  </head>
</html>
```

Since the style tag comes after the stylesheet link where our `@import`s resolve, the overrides win. Every `var()` reference in the document resolves to the updated values. No JS touching individual elements, no re-renders, no class changes!

The resulting `<style>` tag can be driven by an API response shape at runtime or in SSR. Depending on where the values come from, you may need to transform to fit, but ultimately a <style> tag with `:root` in it is necessary.

## Token Naming Conventions

**Pattern**:

```css
--{component}--{variant?}--{property}--{state?}
```

Tokens specific to a CVA variant should include the `{variant}` name, e.g `--button-default-bg` for the "default" variant.

Tokens shared across ALL variants should omit the variant segment, e.g. `--button-radius`.

Size tokens should use the size name as the variant segment, `--button-default-height`, `--button-sm-height`, `--button-lg-px`, `--button-icon-size`

## CVA conventions

Base classes:

The first argument to `cva()` should contain classes shared across all variants. These are organized into two groups.

**Structural (hardcoded, never tokenized)**

```txt
inline-flex items-center justify-center shrink-0
whitespace-nowrap select-none
border border-transparent bg-clip-padding
outline-none transition-all
[&_svg]:pointerevents-none [&_svg]:shrink-0
disabled:pointer-events-none
group/button
```

**Visual (tokenized)**

```
rounded-(--button-radius)
font-[var(--button-font-weight)]
disabled:opacity-(--button-disabled-opacity)
focus-visible:ring-3 focus-visible:ring-(--button-ring-opacity)
focus-visible:border-(--button-border-focus)
aria-invalid:ring-3
aria-invalid:border-(--button-border-invalid)
aria-invalid:ring-(--button-ring-invalid)
```

Each variant should contain token-based color/visual classes:

```tsx
variant: {
  default: [
    "bg-(--button-default-bg)",
    "text-(--button-default-fg)",
    "[a]:hover:bg-(--button-default-bg-hover)",
  ],
}
```

Size variants contain a mix of tokenized values (height, padding, gap) and structural values (icon adjustments, group context).

```tsx
size: {
  default: [
    // tokenized
    "h-(--button-default-height)",
    "px-(--button-default-px)",
    "gap-(--button-default-gap)",
    // structural
    "has-data-[icon=inline-end]:pr-2",
    "has-data-[icon=inline-start]:pl-2",
  ],
}
```

Prefer arrays instead of raw strings for variant strings with more than 2 classes.
This keeps diffs clean and makes each class scannable:

```tsx
variant: {
  outline: [
    "bg-(--button-outline-bg)",
    "text-(--button-outline-fg)",
    "border-(--button-outline-border)",
    "hover:bg-(--button-outline-bg-hover)",
  ],
}
```

## Prop API Conventions

### Standard function signature

```tsx
function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### Rules

1. **`className` is always accepted** and passed through `cn()` as the last arg. Consumers may override.

2. **`data-slot` on every component root.** The slot name is the component's lowercase name. This enables parent-child styling via selectors like `in-data-[slot=button-group]`.

3. **Variant defaults in the function signature**, not just CVA's `defaultVariants`. This makes defaults visible in the type.

4. **Spread `...props` last** so consumers can override anything.

5. **Named exports only.** Export the component function and the variants:

   ```tsx
   export { Button, buttonVariants };
   ```

## Compound Components

Components with multiple visual parts (Dialog, Card, Select) export each part as a named function:

```tsx
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
```

### Token scoping

All parts share a single `.tokens.css` file scoped to the parent name:

```css
/* dialog.tokens.css */
:root {
  --dialog-overlay-bg: var(--brand-overlay);
  --dialog-content-bg: var(--brand-surface);
  --dialog-content-fg: var(--brand-surface-fg);
  --dialog-content-border: var(--brand-border);
  --dialog-content-radius: var(--brand-radius-xl);
  --dialog-content-shadow: var(--shadow-soft-lg);
  --dialog-content-px: calc(var(--spacing) * 6);
  --dialog-content-py: calc(var(--spacing) * 6);
  --dialog-title-fg: var(--brand-fg);
  --dialog-title-font-size: var(--text-lg);
  --dialog-description-fg: var(--brand-muted-fg);
}
```

## Open Questions

1. How can we help enforce conventions like this on the Mochi components?
