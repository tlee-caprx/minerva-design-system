import { CSSProperties } from 'react';
import { SortIconDirection } from '../Icon';
export interface TableCellHeaderProps {
    label: string;
    /** Info icon after the label, with a Tooltip on hover/focus */
    tooltip?: string;
    /** Whole cell becomes a click/keyboard sort trigger */
    sortable?: boolean;
    /** Current sort direction — omit for unsorted (both chevrons idle-colored) */
    sortDirection?: SortIconDirection;
    /** Called when the header is clicked/activated — cycle unsorted → asc → desc → unsorted yourself */
    onSort?: () => void;
    /** Match this to the column's body alignment — center for checkbox/radio/action/tag columns */
    align?: 'left' | 'center';
    className?: string;
    /** Used by Table to explicitly place this cell in its grid — not for consumer use */
    style?: CSSProperties;
}
export declare function TableCellHeader({ label, tooltip, sortable, sortDirection, onSort, align, className, style, }: TableCellHeaderProps): import('react').JSX.Element;
