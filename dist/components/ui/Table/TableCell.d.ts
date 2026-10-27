import { CSSProperties, KeyboardEvent, ReactNode } from 'react';
export type TableCellType = 'text' | 'link' | 'date' | 'number' | 'money' | 'checkbox' | 'radio' | 'action' | 'tag';
interface TableCellCommonProps {
    /** Alternates the fill by row position — pass the row's own odd/even state */
    odd?: boolean;
    /**
     * Whether this cell's row is a click target — only then does it react to
     * the row's hover (bg-surface-muted). The row wrapper needs the `group`
     * class for this to take effect.
     */
    hoverable?: boolean;
    children: ReactNode;
    className?: string;
    /** Used by Table to explicitly place this cell in its grid — not for consumer use */
    style?: CSSProperties;
    /**
     * Used by Table to make the first cell of a clickable row a keyboard
     * activation target for `onRowClick` — not for consumer use. (The row
     * wrapper itself is `display: contents` and can't receive focus, so the
     * activation point has to live on a real cell instead.)
     */
    tabIndex?: number;
    /** Used by Table alongside `tabIndex` above — not for consumer use */
    onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
}
interface TableCellTextProps extends TableCellCommonProps {
    type: 'text' | 'link' | 'date' | 'number' | 'money';
    /** Second line underneath, only valid for text/link/date/number/money — always text-surface-base regardless of `color` */
    subtext?: ReactNode;
    /**
     * Overrides the default text-surface-base color — pass a CSS color value,
     * e.g. `'var(--text-feedback-error-base)'`. Only applies to `text`/`date`/
     * `number`/`money` (the types with built-in Text styling) — for `link`,
     * color comes from whatever you pass as children.
     */
    color?: string;
}
interface TableCellOtherProps extends TableCellCommonProps {
    type: 'checkbox' | 'radio' | 'action' | 'tag';
}
export type TableCellProps = TableCellTextProps | TableCellOtherProps;
export declare function TableCell(props: TableCellProps): import('react').JSX.Element;
export {};
