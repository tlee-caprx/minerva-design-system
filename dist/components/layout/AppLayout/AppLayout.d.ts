import { ReactNode } from 'react';
import { BreadcrumbItem } from '../../navigation/Breadcrumb';
export interface AppLayoutProps {
    /** Which header to render — defaults to "minerva" */
    variant?: 'minerva' | 'evolution';
    /** Full logo shown on sm+ screens — defaults to the Judi logo */
    logoSrc?: string;
    /** Icon-only logo shown on mobile */
    logoIconSrc?: string;
    /** Alt text for the logo — defaults to "Judi" */
    logoAlt?: string;
    /** Where the logo links — defaults to "/" */
    logoHref?: string;
    /** Module or app name shown next to the logo */
    appName?: string;
    /** Optional content rendered before the bell icon — available in both variants */
    headerActions?: ReactNode;
    /** Called when the notifications icon is clicked */
    onNotificationsClick?: () => void;
    /** Called when the account button is clicked (Minerva only) */
    onAccountClick?: () => void;
    /** Label for the account button (Minerva only) — defaults to "Account" */
    accountLabel?: string;
    /** Called when the AI assistant icon is clicked (Evolution only) */
    onAiClick?: () => void;
    /** Called when the keyboard shortcuts icon is clicked (Evolution only) */
    onKeyboardClick?: () => void;
    /** Breadcrumb trail */
    breadcrumbs?: BreadcrumbItem[];
    /** Page / module title */
    title?: string;
    /** When provided, renders a ← Back button to the left of the title */
    onBackClick?: () => void;
    /** Optional second row of content beneath the title row */
    secondaryContent?: ReactNode;
    /** Action buttons for the far right of the ActionBar */
    actions?: ReactNode;
    /** Optional content rendered inline to the right of the title (e.g. Tag, MetaItem) */
    titleMeta?: ReactNode;
    /** When true, renders a green ✓ "Case Completed" indicator inline with the title */
    completed?: boolean;
    /** Nav items rendered inside the SideNav. Omit this prop entirely if the design has no side navigation — the SideNav will not render at all. */
    sideNavContent?: ReactNode;
    /** Initial open state of the SideNav — defaults to true */
    defaultSideNavOpen?: boolean;
    /** Persistent utility controls rendered at the far right, outside the scrolling page body. */
    rightUtilityContent?: ReactNode;
    /** Content for the utility panel that slides in to the left of the utility rail. */
    rightPanelContent?: ReactNode;
    /** Controls whether the utility panel is visible. */
    rightPanelOpen?: boolean;
    /** Default width for the utility panel when open. */
    rightPanelDefaultWidth?: number;
    /** Smallest allowed width for a resizable utility panel. */
    rightPanelMinWidth?: number;
    /**
     * Optional full-width component rendered between the ActionBar and the page body.
     * Renders flush to all edges — use for tab bars, filter strips, contextual toolbars.
     */
    subBar?: ReactNode;
    /**
     * When true, removes the default 40px padding from the page body.
     * Use for full-bleed layouts (e.g. split views, tables that extend edge-to-edge).
     */
    noPadding?: boolean;
    children?: ReactNode;
    className?: string;
}
export declare function AppLayout({ variant, logoSrc, logoIconSrc, logoAlt, logoHref, appName, onNotificationsClick, onAccountClick, headerActions, accountLabel, onAiClick, onKeyboardClick, breadcrumbs, title, onBackClick, secondaryContent, actions, titleMeta, completed, sideNavContent, defaultSideNavOpen, rightUtilityContent, rightPanelContent, rightPanelOpen, rightPanelDefaultWidth, rightPanelMinWidth, subBar, noPadding, children, className, }: AppLayoutProps): import('react').JSX.Element;
