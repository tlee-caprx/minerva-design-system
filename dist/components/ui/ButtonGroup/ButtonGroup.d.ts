import { ReactNode } from 'react';
export interface ButtonGroupProps {
    /**
     * Pass buttons in left-to-right visual order.
     *
     * Right-aligned group (e.g. action bar, dialog footer):
     *   tertiary → secondary → primary  (primary is rightmost / most prominent)
     *
     * Left-aligned group (e.g. toolbar, inline actions):
     *   primary → secondary → tertiary  (primary is leftmost / most prominent)
     *
     * The group itself is layout-neutral — use className or a parent flex
     * container with justify-end / justify-start to control alignment.
     */
    children: ReactNode;
    className?: string;
    /** Capture-phase click handler — fires before any child button's own handler */
    onClickCapture?: React.MouseEventHandler<HTMLDivElement>;
}
export declare function ButtonGroup({ children, className, onClickCapture }: ButtonGroupProps): import('react').JSX.Element;
