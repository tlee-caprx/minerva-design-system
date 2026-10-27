import { ReactNode } from 'react';
export interface TabProps {
    label: string;
    selected?: boolean;
    onClick?: () => void;
    leftSlot?: ReactNode;
    rightSlot?: ReactNode;
}
export declare function Tab({ label, selected, onClick, leftSlot, rightSlot }: TabProps): import('react').JSX.Element;
