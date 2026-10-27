/**
 * Theme override utilities.
 *
 * Converts API theme responses into CSS override strings that can be
 * injected as a <style> tag in the document <head>. Works identically
 * for SPA (runtime) and SSR (request-time) rendering.
 */

export interface ThemeOverrides {
  brand?: Record<string, string>;
}

/**
 * Maps API response keys to CSS custom property names.
 *
 * Brand tokens: the primary override surface for client theming.
 * These map to --brand-* variables defined in brand.css.
 *
 * Only map keys backed by tokens in brand.css. Component overrides can be
 * added once the corresponding component token files exist.
 */
const BRAND_TOKEN_MAP: Record<string, string> = {
  // Surfaces
  bg: "--brand-bg",
  fg: "--brand-fg",
  surface: "--brand-surface",
  surfaceForeground: "--brand-surface-fg",
  surfaceRaised: "--brand-surface-raised",
  surfaceSunken: "--brand-surface-sunken",

  // Primary
  primary: "--brand-primary",
  primaryForeground: "--brand-primary-fg",
  primaryHover: "--brand-primary-hover",
  primaryActive: "--brand-primary-active",
  primarySubtle: "--brand-primary-subtle",
  primarySubtleForeground: "--brand-primary-subtle-fg",

  // Secondary
  secondary: "--brand-secondary",
  secondaryForeground: "--brand-secondary-fg",
  secondaryHover: "--brand-secondary-hover",

  // Muted
  muted: "--brand-muted",
  mutedForeground: "--brand-muted-fg",

  // Accent
  accent: "--brand-accent",
  accentForeground: "--brand-accent-fg",
  accentHover: "--brand-accent-hover",

  // Destructive
  destructive: "--brand-destructive",
  destructiveForeground: "--brand-destructive-fg",
  destructiveHover: "--brand-destructive-hover",
  destructiveSubtle: "--brand-destructive-subtle",
  destructiveSubtleForeground: "--brand-destructive-subtle-fg",
  warning: "--brand-warning",
  warningForeground: "--brand-warning-fg",
  warningSubtle: "--brand-warning-subtle",
  warningSubtleForeground: "--brand-warning-subtle-fg",
  success: "--brand-success",
  successForeground: "--brand-success-fg",
  successSubtle: "--brand-success-subtle",
  successSubtleForeground: "--brand-success-subtle-fg",
  info: "--brand-info",
  infoForeground: "--brand-info-fg",
  infoSubtle: "--brand-info-subtle",
  infoSubtleForeground: "--brand-info-subtle-fg",

  // Borders
  border: "--brand-border",
  borderStrong: "--brand-border-strong",
  borderFocus: "--brand-border-focus",

  // Healthcare status
  statusActive: "--brand-status-active",
  statusActiveSubtle: "--brand-status-active-subtle",
  statusPending: "--brand-status-pending",
  statusPendingSubtle: "--brand-status-pending-subtle",
  statusExpired: "--brand-status-expired",
  statusUrgent: "--brand-status-urgent",
  statusUrgentSubtle: "--brand-status-urgent-subtle",

  // Interactive
  ring: "--brand-ring",
  inputBorder: "--brand-input-border",
  inputBorderHover: "--brand-input-border-hover",
  inputBorderFocus: "--brand-input-border-focus",

  // Overlay
  overlay: "--brand-overlay",

  // Radius
  radiusSm: "--brand-radius-sm",
  radiusMd: "--brand-radius-md",
  radiusLg: "--brand-radius-lg",
  radiusXl: "--brand-radius-xl",
  headingFontFamily: "--brand-heading-font-family",
  bodyFontFamily: "--brand-body-font-family",
  headingFontWeight: "--brand-heading-font-weight",
  bodyFontWeight: "--brand-body-font-weight",
};

/**
 * Builds a CSS string of :root overrides from an API theme response.
 *
 * Returns empty string if no overrides are present.
 */
export function buildOverrideCSS(overrides: ThemeOverrides): string {
  const declarations: string[] = [];

  if (overrides.brand) {
    for (const [key, value] of Object.entries(overrides.brand)) {
      const varName = BRAND_TOKEN_MAP[key];
      if (varName) declarations.push(`  ${varName}: ${value};`);
    }
  }

  if (declarations.length === 0) return "";

  return `:root {\n${declarations.join("\n")}\n}`;
}
