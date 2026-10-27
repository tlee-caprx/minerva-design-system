import { ReactNode } from 'react';
import { AssistantRuntime } from '@assistant-ui/react';
export interface JudiAssistantSource {
    id: string;
    url?: string;
    title?: string;
}
export interface JudiAssistantToolCall {
    toolName: string;
    args?: unknown;
    result?: unknown;
}
export interface JudiAssistantPanelProps {
    /** Assistant-ui runtime supplied by the consuming product. */
    runtime: AssistantRuntime;
    /** Omit when the assistant is an always-visible part of a page. */
    onClose?: () => void;
    suggestions?: readonly string[];
    emptyTitle?: string;
    emptyDescription?: string;
    /** Optional explanatory text for each reasoning step. */
    reasoningDetails?: Readonly<Record<string, string>>;
    /** Render product-specific inline citations or rich answer text. */
    renderAnswer?: (text: string) => ReactNode;
    /** Render a product-specific source card; a generic linked card is the default. */
    renderSource?: (source: JudiAssistantSource) => ReactNode;
    /** Render product-specific tool activity, such as a criteria review. */
    renderToolCall?: (tool: JudiAssistantToolCall) => ReactNode;
}
export declare function JudiAssistantReviewStep({ title, detail }: {
    title: string;
    detail?: string;
}): import('react').JSX.Element;
/** Branded chat UI; the consuming product owns its runtime, sources, and tools. */
export declare function JudiAssistantPanel({ runtime, ...contentProps }: JudiAssistantPanelProps): import('react').JSX.Element;
