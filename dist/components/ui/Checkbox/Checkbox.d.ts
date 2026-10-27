import { InputHTMLAttributes, ReactNode } from 'react';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Label rendered to the right of the checkbox. Omit for an unlabeled checkbox. */
    label?: ReactNode;
    /** Adds top/bottom padding so the row height matches Button (36px) — e.g. table rows, list rows */
    padding?: boolean;
    /**
     * Shows a dash instead of a checkmark — represents a group that's partially
     * selected. Set imperatively on the DOM node (not a real HTML attribute) and
     * takes visual precedence over `checked` if both are true. Ignored when `disabled`.
     */
    indeterminate?: boolean;
    /**
     * Visually and functionally read-only — stays focusable and keeps its value,
     * but can't be toggled. Native `readOnly` is a no-op on checkboxes in every
     * browser, so toggling is blocked manually here rather than relying on it.
     */
    readOnly?: boolean;
    /** Shows the error border and the message below the checkbox. Ignored when `disabled`. */
    error?: boolean;
    /** Message shown below the checkbox when `error` is true. */
    errorMessage?: ReactNode;
    className?: string;
}
export declare const Checkbox: import('react').ForwardRefExoticComponent<CheckboxProps & import('react').RefAttributes<HTMLInputElement>>;
