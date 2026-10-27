import { ComponentType, SVGProps } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'link';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style of the button */
    variant?: ButtonVariant;
    /** Switches all color tokens to their critical/destructive counterparts */
    destructive?: boolean;
    /** Icon rendered to the left of the label */
    leftIcon?: ComponentType<SVGProps<SVGSVGElement>>;
    /** Icon rendered to the right of the label (spinner renders after this when loading) */
    rightIcon?: ComponentType<SVGProps<SVGSVGElement>>;
    /** Renders as a square 36×36 button — pass the icon as children */
    iconOnly?: boolean;
    /** Shows a spinner; also sets disabled to prevent interaction */
    loading?: boolean;
    /** Full-width on mobile, auto-width on sm+ */
    fullWidth?: boolean;
    /**
     * Removes all padding — tertiary only, so the button sits flush inline
     * with surrounding content (e.g. inside a Message) at exactly its text's
     * line-height rather than tertiary's usual 12px vertical touch-target
     * padding. Ignored for every other variant.
     */
    unpadded?: boolean;
}
export declare const Button: import('react').ForwardRefExoticComponent<ButtonProps & import('react').RefAttributes<HTMLButtonElement>>;
