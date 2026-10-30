import { ReactNode } from 'react';
export interface RichTextEditorProps {
    /** Label rendered above the field */
    label?: ReactNode;
    /** Shows a required asterisk after the label */
    required?: boolean;
    /** Shows an info icon after the label with a Tooltip on hover/focus */
    tooltip?: string;
    /** Helper text rendered below the field */
    instructions?: ReactNode;
    /** Error border and red instructions. Falls back to "Invalid input" without instructions. */
    invalid?: boolean;
    /** Hides the toolbar and greys the field out */
    disabled?: boolean;
    /** Hides the toolbar and shows the content without allowing edits */
    readOnly?: boolean;
    /** Content as HTML, for a controlled editor. Pair with `onChange`. */
    value?: string;
    /** Starting content as HTML, for an uncontrolled editor */
    defaultValue?: string;
    /** Called with the content as HTML on every change */
    onChange?: (html: string) => void;
    placeholder?: string;
    /** Height of the text area, which scrolls past it. Any CSS length. Defaults to 182px. */
    height?: string;
    id?: string;
    className?: string;
}
export declare function RichTextEditor({ label, required, tooltip, instructions, invalid, disabled, readOnly, value, defaultValue, onChange, placeholder, height, id, className, }: RichTextEditorProps): import('react').JSX.Element;
