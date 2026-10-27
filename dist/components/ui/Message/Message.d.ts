import { ComponentType, ReactNode, SVGProps } from 'react';
export type MessageVariant = 'informational' | 'error' | 'warning' | 'success';
export interface MessageProps {
    variant: MessageVariant;
    /** Replaces the variant's default status icon, e.g. use AIIcon for an AI-generated notice. */
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    /** Applies the existing default Judi AI gradient while retaining the variant's semantic border and icon color. */
    ai?: boolean;
    /** Optional bold header above the body text */
    header?: ReactNode;
    /** Body text */
    children: ReactNode;
    /** Optional action — pass a <Button variant="tertiary" unpadded> */
    action?: ReactNode;
    className?: string;
}
export declare function Message({ variant, icon: iconOverride, ai, header, children, action, className }: MessageProps): import('react').JSX.Element;
