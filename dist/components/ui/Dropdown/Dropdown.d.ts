import { ButtonHTMLAttributes, ReactNode } from 'react';
export interface DropdownProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'value' | 'onSelect'> {
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
    /** Stays focusable but can't be opened/changed */
    readOnly?: boolean;
    /** Display text for the currently selected value */
    value?: string;
    placeholder?: string;
    /** Called when the clear (×) button is clicked. Omit to hide the clear button entirely. */
    onClear?: () => void;
    /**
     * Fires when a MenuItem is clicked, in single-select mode only (mode is
     * detected automatically — if any MenuItem child has `checkbox` set, this
     * is treated as multi-select and Dropdown doesn't auto-close/auto-select
     * at all, since that's a "select multiple, close manually" pattern).
     * Dropdown doesn't own `value` itself — wire this to your own state, same
     * as every other callback-driven component in this system.
     */
    onSelect?: (label: string) => void;
    /** Optional pinned search bar shown above the options, e.g. <MenuSearchBar> */
    searchBar?: ReactNode;
    /** MenuGroup/MenuItem content shown when open. Omit to render just the trigger with no panel. */
    children?: ReactNode;
    className?: string;
}
export declare const Dropdown: import('react').ForwardRefExoticComponent<DropdownProps & import('react').RefAttributes<HTMLButtonElement>>;
