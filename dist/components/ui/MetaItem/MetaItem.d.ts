import { ComponentType, SVGProps } from 'react';
export interface MetaItemProps {
    /** Optional icon rendered to the left of the label */
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    /** Bold label text — colon is added automatically */
    label: string;
    /** Regular value text */
    value: string;
    /**
     * When provided, renders the value as a clickable underlined link with a
     * LinkOut icon. Leave routing/navigation to the consumer.
     */
    onClick?: () => void;
    className?: string;
}
export declare function MetaItem({ icon, label, value, onClick, className }: MetaItemProps): import('react').JSX.Element;
