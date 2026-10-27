import { TextareaHTMLAttributes, ReactNode } from 'react';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
    className?: string;
}
export declare const Textarea: import('react').ForwardRefExoticComponent<TextareaProps & import('react').RefAttributes<HTMLTextAreaElement>>;
