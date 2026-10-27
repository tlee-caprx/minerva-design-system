import { ReactNode } from 'react';
export interface ModalContentProps {
    onClose: () => void;
    title: ReactNode;
    /** Body content — usually text, but can be anything */
    children: ReactNode;
    /** Tertiary button on the far left of the footer */
    leftAction?: ReactNode;
    /** Secondary/Primary buttons on the right — wrapped in a ButtonGroup */
    rightActions?: ReactNode;
    className?: string;
}
export interface ModalProps extends ModalContentProps {
    open: boolean;
}
export declare const ModalContent: import('react').ForwardRefExoticComponent<ModalContentProps & import('react').RefAttributes<HTMLDivElement>>;
export declare function Modal({ open, onClose, ...contentProps }: ModalProps): import('react').ReactPortal | null;
