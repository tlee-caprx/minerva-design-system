import { ReactNode } from 'react';
export type CollapseStyle = 'default' | 'underline' | 'blank' | 'underline-flush' | 'blank-flush' | 'unpadded';
export type CollapseTrigger = 'chevron' | 'checkbox';
export interface CollapseProps {
    /** Container treatment — stroke, radius, and horizontal padding */
    style?: CollapseStyle;
    /** Chevron rotates/swaps on click; checkbox is a visual-only state indicator
     *  (not a real input — the whole header is the single click/focus target) */
    trigger?: CollapseTrigger;
    title: ReactNode;
    /** Right-aligned header content, e.g. buttons — clicks here don't toggle */
    actions?: ReactNode;
    defaultOpen?: boolean;
    children: ReactNode;
    className?: string;
}
export declare function Collapse({ style, trigger, title, actions, defaultOpen, children, className, }: CollapseProps): import('react').JSX.Element;
