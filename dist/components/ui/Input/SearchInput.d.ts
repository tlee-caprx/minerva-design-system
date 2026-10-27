import { InputProps } from './Input';
export type SearchInputProps = Omit<InputProps, 'type' | 'leftIcon' | 'rightIcon'>;
export declare const SearchInput: import('react').ForwardRefExoticComponent<SearchInputProps & import('react').RefAttributes<HTMLInputElement>>;
