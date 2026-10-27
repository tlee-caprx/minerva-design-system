import { ReactNode } from 'react';
export type TooltipBeak = 'top' | 'bottom' | 'left' | 'right' | 'none';
export interface TooltipBubbleProps {
    content: ReactNode;
    /**
     * Which edge the beak protrudes from — this also drives placement (the
     * tooltip sits on the opposite side of the trigger from the beak).
     * `'none'` skips the beak but keeps `'bottom'`'s placement (above the
     * trigger), the most common default.
     */
    beak?: TooltipBeak;
    id?: string;
    className?: string;
}
export interface TooltipProps {
    content: ReactNode;
    beak?: TooltipBeak;
    children: ReactNode;
    className?: string;
}
export declare function TooltipBubble({ content, beak, id, className }: TooltipBubbleProps): import('react').JSX.Element;
export declare function Tooltip({ content, beak, children, className }: TooltipProps): import('react').JSX.Element;
