import { ReactNode } from 'react';
export interface MenuPanelProps {
    /**
     * Optional pinned search bar (e.g. <MenuSearchBar>), rendered above the
     * scrollable list — stays fixed in place, doesn't scroll with the options.
     */
    searchBar?: ReactNode;
    /** MenuGroup/MenuItem content — scrolls internally past ~5 items. */
    children: ReactNode;
    className?: string;
}
export declare function MenuPanel({ searchBar, children, className }: MenuPanelProps): import('react').JSX.Element;
