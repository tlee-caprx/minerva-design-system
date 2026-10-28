import { HTMLAttributes, ReactNode } from 'react';
export type PanelVariant = 'default' | 'nested';
export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
    /** `default` is a white card with a stroke and small shadow; `nested` is a subtle-fill card with no stroke or shadow, for panels inside panels */
    variant?: PanelVariant;
    /** A TabSet rendered flush on top of the panel body, with no gap between them */
    tabs?: ReactNode;
    children?: ReactNode;
}
export declare function Panel({ variant, tabs, children, className, ...rest }: PanelProps): import('react').JSX.Element;
