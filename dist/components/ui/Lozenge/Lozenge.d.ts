export type LozengeVariant = 'light' | 'dark';
export interface LozengeProps {
    count?: number;
    variant?: LozengeVariant;
    className?: string;
}
export declare function Lozenge({ count, variant, className }: LozengeProps): import('react').JSX.Element;
