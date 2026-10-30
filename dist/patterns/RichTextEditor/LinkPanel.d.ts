import { Editor } from '@tiptap/react';
interface LinkPanelProps {
    editor: Editor;
    /** The toolbar's link button was clicked */
    addRequested: boolean;
    onClose: () => void;
}
export declare function LinkPanel({ editor, addRequested, onClose }: LinkPanelProps): import('react').ReactPortal | null;
export {};
