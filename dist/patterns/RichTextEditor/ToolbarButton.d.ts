import { ComponentType, SVGProps } from 'react';
interface ToolbarButtonProps {
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    active?: boolean;
    onClick: () => void;
    /** `sm` (4px) in the toolbar, `md` (8px) in the link panel, per the design */
    padding?: 'sm' | 'md';
}
export declare function ToolbarButton({ label, icon, active, onClick, padding }: ToolbarButtonProps): import('react').JSX.Element;
export {};
