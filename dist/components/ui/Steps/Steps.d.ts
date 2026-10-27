export interface Step {
    /** Step label rendered inside the button */
    label: string;
    /**
     * Whether this step is active (current or already visited).
     * Active steps are clickable. Inactive steps are dimmed and non-interactive.
     * Defaults to false.
     */
    active?: boolean;
    /** Called when an active step is clicked — wire up navigation here */
    onClick?: () => void;
}
export interface StepsProps {
    steps: Step[];
    className?: string;
}
export declare function Steps({ steps, className }: StepsProps): import('react').JSX.Element;
