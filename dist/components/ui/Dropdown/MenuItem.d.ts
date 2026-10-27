import { ButtonHTMLAttributes } from 'react';
export interface MenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    label: string;
    /**
     * Shows a checkmark on the far right, colored to match the label. Ignored
     * when `checkbox` is true — the checkbox itself becomes the selection
     * indicator instead, so showing both would be redundant.
     */
    selected?: boolean;
    /** Switches idle/hover colors to the destructive (red) set */
    destructive?: boolean;
    /**
     * Shows a checkbox-style indicator on the left instead of the right-side
     * checkmark, for multi-select menus. This is visual only, not a real
     * nested <input> — MenuItem is a <button>, and HTML doesn't allow
     * interactive form controls inside a button. The whole row stays the
     * single click/focus target; the box just reflects `selected`.
     */
    checkbox?: boolean;
    className?: string;
}
export declare function MenuItem({ label, selected, destructive, checkbox, disabled, className, ...props }: MenuItemProps): import('react').JSX.Element;
