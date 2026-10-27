import { ReactNode, ElementType, CSSProperties, HTMLAttributes } from 'react';
export type TextVariant = 'body-sm' | 'body-md' | 'body-lg' | 'heading-xs' | 'heading-sm' | 'heading-md' | 'heading-lg' | 'heading-xl' | 'label-sm' | 'label-md' | 'label-lg' | 'tag-label' | 'option-default';
export type TextWeight = 'regular' | 'semibold';
export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'style' | 'className' | 'children'> {
    /** Typography variant — controls font size and line height */
    variant: TextVariant;
    /** Override the variant's default weight */
    weight?: TextWeight;
    /** Render as italic */
    italic?: boolean;
    /** Render with underline */
    underline?: boolean;
    /** HTML element to render — defaults to span */
    as?: ElementType;
    /** Extra inline styles (e.g. margin resets) — merged with typography styles */
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
}
export declare function Text({ variant, weight, italic, underline, as: Tag, style: extraStyle, className, children, ...rest }: TextProps): import('react').JSX.Element;
