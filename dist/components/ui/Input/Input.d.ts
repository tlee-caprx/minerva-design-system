import { InputHTMLAttributes, ReactNode } from 'react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Label rendered above the field */
    label?: ReactNode;
    /** Shows a required asterisk after the label */
    required?: boolean;
    /** Shows an info icon after the label with a Tooltip on hover/focus */
    tooltip?: string;
    /** Helper text rendered below the field */
    instructions?: ReactNode;
    /**
     * Shows the error border and turns instructions red. Persists through
     * hover/focus rather than clearing — focusing the field doesn't fix
     * the underlying validation problem, so the signal should stay visible.
     * Falls back to "Invalid input" if no instructions are given.
     */
    invalid?: boolean;
    /**
     * Content anchored to the left edge of the field (e.g. a search icon).
     * Accepts any ReactNode, not just a bare icon, so variants like Password
     * can put an interactive button here instead of a decorative glyph.
     */
    leftIcon?: ReactNode;
    /** Same as leftIcon, anchored to the right edge (e.g. Password's eye toggle). */
    rightIcon?: ReactNode;
    className?: string;
}
export declare const Input: import('react').ForwardRefExoticComponent<InputProps & import('react').RefAttributes<HTMLInputElement>>;
