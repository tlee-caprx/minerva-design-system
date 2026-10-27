export interface BadgeProps {
    /** Badge text */
    children: string;
    /**
     * When provided, renders an × dismiss button to the right of the text.
     * Called when the user clicks the dismiss button.
     */
    onClose?: () => void;
    className?: string;
}
export declare function Badge({ children, onClose, className }: BadgeProps): import('react').JSX.Element;
