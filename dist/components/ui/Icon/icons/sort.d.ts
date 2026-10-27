import { SVGProps } from 'react';
export type SortIconDirection = 'asc' | 'desc';
export interface SortIconProps extends SVGProps<SVGSVGElement> {
    /**
     * Which chevron reflects the active sort — the other stays subtle.
     * Omit for the unsorted state (both chevrons subtle). Unlike every other
     * icon in this library, SortIcon doesn't take its color from `currentColor`
     * — the two chevrons need independent colors, so use it directly rather
     * than through the shared `Icon` wrapper.
     */
    direction?: SortIconDirection;
}
export declare function SortIcon({ direction, ...props }: SortIconProps): import('react').JSX.Element;
