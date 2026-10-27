import { ComponentType, SVGProps } from 'react';
export type IconSize = 'regular' | 'small';
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    size?: IconSize;
}
export declare function Icon({ icon: IconComponent, size, ...props }: IconProps): import('react').JSX.Element;
