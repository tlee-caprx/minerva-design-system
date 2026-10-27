/**
 * Breakpoint constants for JavaScript/TypeScript.
 *
 * These values mirror the CSS breakpoint tokens defined in primitives.css.
 * They must be kept in sync manually. If you change a breakpoint in CSS,
 * update it here as well.
 *
 * ## Recommended Usage
 *
 * **Prefer hooks over direct breakpoint access:**
 *
 * ```ts
 * // ✅ Best: Use the mobile detection hook
 * import { useIsMobile } from "#src/hooks/use-mobile";
 * const isMobile = useIsMobile();
 *
 * // ✅ Good: Use a breakpoint hook (if available)
 * import { useBreakpoint } from "#src/hooks/use-breakpoint";
 * const isLargeScreen = useBreakpoint("lg");
 * ```
 *
 * **If you must use breakpoints directly, prefer matchMedia over innerWidth:**
 *
 * ```ts
 * // ✅ Correct: matchMedia is reactive and matches CSS behavior
 * import { maxWidthQuery } from "#src/lib/breakpoints";
 * const mediaQuery = window.matchMedia(maxWidthQuery("md"));
 * const isMobile = mediaQuery.matches;
 *
 * // ❌ Avoid: innerWidth doesn't account for scrollbars, isn't reactive
 * const isMobile = window.innerWidth < BREAKPOINTS.md;
 * ```
 *
 * Why `matchMedia` is preferred:
 * - Matches CSS media query behavior exactly
 * - Accounts for scrollbar width differences
 * - Can be subscribed to for reactive updates
 * - Works consistently across browsers
 */

/**
 * Breakpoint values in pixels.
 *
 * These correspond to Tailwind's default breakpoints:
 * - sm: 40rem  = 640px
 * - md: 48rem  = 768px (commonly used as mobile/desktop threshold)
 * - lg: 64rem  = 1024px
 * - xl: 80rem  = 1280px
 * - 2xl: 96rem = 1536px
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;
export type BreakpointValue = (typeof BREAKPOINTS)[BreakpointKey];

/**
 * Helper to build a max-width media query string.
 * Subtracts 1px to create a proper "below breakpoint" query.
 *
 * Use with `window.matchMedia()` for reactive breakpoint detection.
 *
 * @example
 * const query = maxWidthQuery("md"); // "(max-width: 767px)"
 * const mediaQuery = window.matchMedia(query);
 *
 * // Check current state
 * if (mediaQuery.matches) {
 *   console.log("Below md breakpoint");
 * }
 *
 * // Listen for changes
 * mediaQuery.addEventListener("change", (e) => {
 *   console.log("Now below md:", e.matches);
 * });
 */
export function maxWidthQuery(breakpoint: BreakpointKey): string {
  return `(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`;
}

/**
 * Helper to build a min-width media query string.
 *
 * Use with `window.matchMedia()` for reactive breakpoint detection.
 *
 * @example
 * const query = minWidthQuery("lg"); // "(min-width: 1024px)"
 * const mediaQuery = window.matchMedia(query);
 *
 * if (mediaQuery.matches) {
 *   console.log("At or above lg breakpoint");
 * }
 */
export function minWidthQuery(breakpoint: BreakpointKey): string {
  return `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
}