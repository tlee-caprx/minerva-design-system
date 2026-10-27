export type TagVariant = 'info' | 'info-high-contrast' | 'success' | 'warning' | 'error' | 'system' | 'system-alt';
export interface TagProps {
    /** Visual style — defaults to "info" */
    variant?: TagVariant;
    children: string;
    className?: string;
}
export declare function Tag({ variant, children, className }: TagProps): import('react').JSX.Element;
