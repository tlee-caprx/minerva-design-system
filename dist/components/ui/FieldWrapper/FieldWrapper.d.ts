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
    /**
     * No padding, children stacked full-width and clipped to the rounded box,
     * for controls with their own internal layout (RichTextEditor's toolbar
     * and text area).
     */
    flush?: boolean;
    children: ReactNode;
}
export declare function FieldWrapper({ inputId, label, required, tooltip, instructions, invalid, disabled, readOnly, leftIcon, rightIcon, panel, flush, children, }: FieldWrapperProps): import('react').JSX.Element;
