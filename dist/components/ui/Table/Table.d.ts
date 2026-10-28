import { HTMLAttributes, ReactNode } from 'react';
export interface TableProps {
    /** TableHeader and TableBody */
    children: ReactNode;
    /** Pins the first column so it stays visible when the table scrolls horizontally. A last column of type="action" cells is always pinned. */
    stickyFirstColumn?: boolean;
    /** Pagination rendered above the table, separated by a 1px gridline */
    paginationTop?: ReactNode;
    /** Pagination rendered below the table, separated by a 1px gridline */
    paginationBottom?: ReactNode;
    className?: string;
}
export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children?: ReactNode;
}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
    /** Makes the row a click target: pointer cursor, light blue hover fill, Enter/Space to activate. Clicks on link, action, checkbox and radio cells don't trigger it. */
    onClick?: () => void;
    /** Full-width area shown under the row while `expanded` is true */
    detail?: ReactNode;
    /** Shows `detail` under the row */
    expanded?: boolean;
}
export declare function Table({ children, stickyFirstColumn, paginationTop, paginationBottom, className, }: TableProps): import('react').JSX.Element;
export declare function TableHeader({ children, ...rest }: TableHeaderProps): import('react').JSX.Element;
export declare function TableBody({ children, ...rest }: TableBodyProps): import('react').JSX.Element;
export declare function TableRow({ children, onClick, detail, expanded, className, onKeyDown, ...rest }: TableRowProps): import('react').JSX.Element;
