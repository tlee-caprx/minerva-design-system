import { ReactNode, TdHTMLAttributes } from 'react';
export type TableCellType = 'text' | 'link' | 'date' | 'number' | 'money' | 'checkbox' | 'radio' | 'action' | 'tag' | 'expand';
interface TableCellCommonProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'color' | 'children'> {
    children: ReactNode;
}
interface TableCellTextProps extends TableCellCommonProps {
    type: 'text' | 'link' | 'date' | 'number' | 'money';
    /** Second line underneath, which makes the row taller — always text-surface-base regardless of `color` */
    subtext?: ReactNode;
    /**
     * Overrides the default text-surface-base color — pass a CSS color value,
     * e.g. `'var(--text-feedback-error-base)'`. Only applies to `text`/`date`/
     * `number`/`money` (the types with built-in Text styling) — for `link`,
     * color comes from whatever you pass as children.
     */
    color?: string;
    /**
     * Caps the cell's width; longer text is cut off with "…" and shows in full
     * in a Tooltip on hover. Any CSS length, e.g. `'calc(var(--space-40) * 6)'`.
     */
    maxWidth?: string;
}
interface TableCellOtherProps extends TableCellCommonProps {
    type: 'checkbox' | 'radio' | 'action' | 'tag' | 'expand';
}
export type TableCellProps = TableCellTextProps | TableCellOtherProps;
export declare function TableCell(props: TableCellProps): import('react').JSX.Element;
export {};
