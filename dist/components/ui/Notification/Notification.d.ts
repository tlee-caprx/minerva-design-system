import { ReactNode } from 'react';
export interface NotificationProps {
    /** Heading rendered above the notification content. */
    title?: ReactNode;
    /** Content displayed below the notification header. */
    children?: ReactNode;
    onMarkAllAsRead?: () => void;
    onViewAll?: () => void;
    className?: string;
}
export declare function Notification({ title, children, onMarkAllAsRead, onViewAll, className, }: NotificationProps): import('react').JSX.Element;
