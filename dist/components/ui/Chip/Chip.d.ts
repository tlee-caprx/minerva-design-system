import { ButtonHTMLAttributes, ReactNode } from 'react';
export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    children: ReactNode;
    /** Toggled/active state */
    selected?: boolean;
    className?: string;
}
export declare function Chip({ children, selected, className, ...props }: ChipProps): import('react').JSX.Element;
