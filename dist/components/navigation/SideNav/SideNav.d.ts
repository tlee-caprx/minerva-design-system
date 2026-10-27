import { ReactNode } from 'react';
export interface SideNavProps {
    /** Whether the nav is expanded or collapsed */
    isOpen: boolean;
    /** Called when the toggle icon is clicked — owner manages state */
    onToggle: () => void;
    /** Nav items — rendered when expanded */
    children?: ReactNode;
    className?: string;
}
export declare function SideNav({ isOpen, onToggle, children, className }: SideNavProps): import('react').JSX.Element;
