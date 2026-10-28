export interface TableRowAction {
    label: string;
    onClick: () => void;
    /** Red label, for deleting or other irreversible actions */
    destructive?: boolean;
    disabled?: boolean;
}
export interface TableRowActionsProps {
    /** Menu items, in order. Put destructive actions last. */
    actions: TableRowAction[];
    /** Accessible label for the ⋮ button, e.g. "Actions for case 100385" */
    label?: string;
}
export declare function TableRowActions({ actions, label }: TableRowActionsProps): import('react').JSX.Element;
