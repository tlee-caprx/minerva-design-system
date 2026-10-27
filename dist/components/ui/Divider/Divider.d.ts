export type DividerOrientation = 'horizontal' | 'vertical';
export interface DividerProps {
    orientation?: DividerOrientation;
    className?: string;
}
export declare function Divider({ orientation, className }: DividerProps): import('react').JSX.Element;
