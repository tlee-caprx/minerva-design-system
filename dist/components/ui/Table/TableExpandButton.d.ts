export interface TableExpandButtonProps {
    /** Match the row's `expanded` */
    expanded: boolean;
    /** Toggle the row's `expanded` state */
    onClick: () => void;
    /** Accessible label, e.g. "Show details for case 100385" */
    'aria-label'?: string;
}
export declare function TableExpandButton({ expanded, onClick, 'aria-label': ariaLabel }: TableExpandButtonProps): import('react').JSX.Element;
