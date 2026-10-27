import { ReactNode } from 'react';
import { DropdownProps } from './Dropdown';
export interface MultiSelectDropdownProps extends Omit<DropdownProps, 'value' | 'onSelect' | 'onClear' | 'onChange' | 'children'> {
    /** MenuGroup/MenuItem content — every MenuItem gets `checkbox` forced on. */
    children: ReactNode;
    /** Fires whenever the selection changes (toggling an item, or Clear All). */
    onChange?: (selected: string[]) => void;
}
export declare function MultiSelectDropdown({ children, onChange, ...props }: MultiSelectDropdownProps): import('react').JSX.Element;
