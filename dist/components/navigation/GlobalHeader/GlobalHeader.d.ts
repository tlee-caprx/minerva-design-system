import { ReactNode } from 'react';
export interface GlobalHeaderProps {
    /** Which header layout to render — defaults to "minerva" */
    variant?: 'minerva' | 'evolution';
    /** Full logo shown on sm+ screens — defaults to the Judi logo */
    logoSrc?: string;
    /** Icon-only logo shown on mobile */
    logoIconSrc?: string;
    /** Alt text for the logo — defaults to "Judi" */
    logoAlt?: string;
    /** Where the logo links — defaults to "/" */
    logoHref?: string;
    /** Module or app name */
    appName?: string;
    /** Called when the menu icon is clicked */
    onMenuClick?: () => void;
    /** Whether to show the navigation menu control. */
    showMenuButton?: boolean;
    /** Called when the bell notification icon is clicked */
    onNotificationsClick?: () => void;
    /** Optional content rendered before the bell icon — available in both variants */
    headerActions?: ReactNode;
    /** Called when the account button is clicked (Minerva only) */
    onAccountClick?: () => void;
    /** Label for the account button (Minerva only) — defaults to "Account" */
    accountLabel?: string;
    /** Called when the AI assistant icon is clicked (Evolution only) */
    onAiClick?: () => void;
    /** Called when the keyboard shortcuts icon is clicked (Evolution only) */
    onKeyboardClick?: () => void;
    className?: string;
}
export declare function GlobalHeader({ variant, logoSrc, logoIconSrc, logoAlt, logoHref, appName, onMenuClick, showMenuButton, onNotificationsClick, headerActions, onAccountClick, accountLabel, onAiClick, onKeyboardClick, className, }: GlobalHeaderProps): import('react').JSX.Element;
