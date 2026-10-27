export interface PaginationProps {
    /** 1-indexed */
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    className?: string;
}
export declare function Pagination({ currentPage, pageSize, totalItems, onPageChange, className }: PaginationProps): import('react').JSX.Element | null;
