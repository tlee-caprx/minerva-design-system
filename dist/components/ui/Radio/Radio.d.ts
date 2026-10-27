import { InputHTMLAttributes, ReactNode } from 'react';
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Label rendered to the right of the radio control. */
    label?: ReactNode;
    /** Adds top and bottom padding for list or form-row contexts. */
    padding?: boolean;
    /** Displays the radio's value without allowing the user to change it. */
    readOnly?: boolean;
    className?: string;
}
export declare const Radio: import('react').ForwardRefExoticComponent<RadioProps & import('react').RefAttributes<HTMLInputElement>>;
