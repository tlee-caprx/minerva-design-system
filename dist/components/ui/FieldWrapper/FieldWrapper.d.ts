import { ReactNode } from 'react';
export interface FieldWrapperProps {
    inputId: string;
    label?: ReactNode;
    required?: boolean;
    tooltip?: string;
    instructions?: ReactNode;
    invalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    /**
     * Rendered absolutely-positioned directly below the box (e.g. a Dropdown's
     * MenuPanel) — anchored to the box specifically, not the whole label/box/
     * instructions stack, so it's correctly positioned regardless of whether
     * a label or instructions are present above/below it.
     */
    panel?: ReactNode;
    children: ReactNode;
}
export declare function FieldWrapper({ inputId, label, required, tooltip, instructions, invalid, disabled, readOnly, leftIcon, rightIcon, panel, children, }: FieldWrapperProps): import('react').JSX.Element;
