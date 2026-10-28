import { ReactNode } from 'react';
import { AlertType, AlertVariant } from './Alert';
export interface ShowAlertOptions {
    type: AlertType;
    variant: AlertVariant;
    message: ReactNode;
    /** Milliseconds before it disappears on its own. Defaults to 5000. */
    duration?: number;
}
/** Shows a banner or toast over the page and returns its id. A new banner replaces the current one; toasts stack. */
export declare function showAlert({ type, variant, message, duration }: ShowAlertOptions): number;
/** Removes a banner or toast before its time runs out. */
export declare function dismissAlert(id: number): void;
/**
 * Where showAlert() renders. AppLayout already includes one; render it
 * yourself only on a page without AppLayout, and only once per page.
 */
export declare function AlertViewport(): import('react').ReactPortal | null;
