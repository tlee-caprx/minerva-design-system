import { ReactNode } from 'react';
export type AlertType = 'success' | 'warning' | 'error' | 'general';
/** Figma calls this property "Style"; `style` is taken by React, so it's `variant` here. */
export type AlertVariant = 'banner' | 'toast';
export interface AlertProps {
    type: AlertType;
    variant: AlertVariant;
    /** The message. Plain text only */
    children: ReactNode;
    /** Banner only: called when the × is clicked */
    onClose?: () => void;
    className?: string;
}
export declare function Alert({ type, variant, children, onClose, className }: AlertProps): import('react').JSX.Element;
