import { ComponentType, ReactNode, SVGProps } from 'react';
export interface SideNavItemProps {
    label: string;
    /** Optional leading icon. Required when using compact mode. */
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    /** Provide href for anchor-based navigation. Omit to use onClick state-based navigation. */
    href?: string;
    /** Used when href is omitted — switches the active section without routing */
    onClick?: () => void;
    /** Highlights the item as active */
    active?: boolean;
    /** Optional lozenge rendered on the far right */
    lozenge?: ReactNode;
    /** Renders as an icon-only navigation item while retaining an accessible label. */
    compact?: boolean;
    className?: string;
}
export declare function SideNavItem({ label, href, onClick, active, lozenge, icon, compact, className, }: SideNavItemProps): import('react').JSX.Element;
