import { InputProps } from './Input';
export type PasswordInputProps = Omit<InputProps, 'type' | 'rightIcon'>;
export declare const PasswordInput: import('react').ForwardRefExoticComponent<PasswordInputProps & import('react').RefAttributes<HTMLInputElement>>;
