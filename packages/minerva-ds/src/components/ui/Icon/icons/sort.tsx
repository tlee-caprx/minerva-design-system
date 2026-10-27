import type { SVGProps } from 'react'

export type SortIconDirection = 'asc' | 'desc'

export interface SortIconProps extends SVGProps<SVGSVGElement> {
  /**
   * Which chevron reflects the active sort — the other stays subtle.
   * Omit for the unsorted state (both chevrons subtle). Unlike every other
   * icon in this library, SortIcon doesn't take its color from `currentColor`
   * — the two chevrons need independent colors, so use it directly rather
   * than through the shared `Icon` wrapper.
   */
  direction?: SortIconDirection
}

export function SortIcon({ direction, ...props }: SortIconProps) {
  const activeColor = 'var(--icon-surface-base)'
  const idleColor = 'var(--icon-surface-subtle)'

  return (
    <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" {...props}>
<path fill={direction === 'asc' ? activeColor : idleColor} d="M6.58254 1.1694C6.81245 0.943535 7.18423 0.943535 7.4117 1.1694L11.3276 5.0137C11.5575 5.23955 11.5575 5.60476 11.3276 5.82821C11.0977 6.05166 10.7259 6.05406 10.4984 5.82821L7.00079 2.39237L3.50068 5.83061C3.27077 6.05646 2.89899 6.05646 2.67152 5.83061C2.44405 5.60476 2.44161 5.23955 2.67152 5.0161L6.58254 1.1694Z" />
<path fill={direction === 'desc' ? activeColor : idleColor} d="M7.41748 12.8306C7.18757 13.0565 6.81579 13.0565 6.58833 12.8306L2.67244 8.98631C2.44252 8.76045 2.44252 8.39525 2.67244 8.17179C2.90235 7.94834 3.27413 7.94594 3.5016 8.17179L6.99924 11.6076L10.4993 8.1694C10.7292 7.94353 11.101 7.94353 11.3285 8.1694C11.556 8.39525 11.5584 8.76046 11.3285 8.98391L7.41748 12.8306Z" />
</svg>
  )
}
