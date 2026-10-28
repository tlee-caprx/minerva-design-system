import { ReactNode, ThHTMLAttributes } from 'react';
import { SortIconDirection } from '../Icon';
export interface TableHeadProps extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align' | 'children'> {
    /** Column label, or a control such as a select-all Checkbox */
    children?: ReactNode;
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
    /** This column absorbs the table's leftover width. Mark at most one column; without it the table hugs its content. */
    grow?: boolean;
}
export declare function TableHead({ children, tooltip, sortable, sortDirection, onSort, align, grow, className, style, ...rest }: TableHeadProps): import('react').JSX.Element;
