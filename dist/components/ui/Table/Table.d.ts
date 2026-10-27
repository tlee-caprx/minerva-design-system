import { ReactNode } from 'react';
export interface TableProps {
    /** Number of equal-width columns, or an explicit grid-template-columns value for custom widths */
    columns: number | string;
    /** Header row — one TableCellHeader per column, in column order */
    header: ReactNode[];
    /** Body rows — each inner array is one row's TableCell elements, in column order. `odd`/`hoverable` are injected automatically. */
    rows: ReactNode[][];
    /** Pins the first column so it stays visible when the table scrolls horizontally — an actual per-table choice, unlike the last column below */
    stickyFirstColumn?: boolean;
    /** When provided, rows become click targets (pointer cursor + hover) */
    onRowClick?: (rowIndex: number) => void;
    /** Pagination rendered above the table, separated by a 1px gridline */
    paginationTop?: ReactNode;
    /** Pagination rendered below the table, separated by a 1px gridline */
    paginationBottom?: ReactNode;
    className?: string;
}
export declare function Table({ columns, header, rows, stickyFirstColumn, onRowClick, paginationTop, paginationBottom, className, }: TableProps): import('react').JSX.Element;
