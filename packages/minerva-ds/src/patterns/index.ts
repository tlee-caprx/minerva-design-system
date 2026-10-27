// ─── Patterns ─────────────────────────────────────────────────────────────────
// Judi-specific compositions built from core components. Kept separate from the
// core entry so prototypes that don't use them never pull in @assistant-ui/react.
//
// DocumentViewer has its own entry, '@judi-health/minerva-ds/document-viewer':
// EmbedPDF's wasm and worker chunks get emitted by any bundle that reaches its
// module, even when DocumentViewer itself is unused.

export { KeyCaseDetails } from './KeyCaseDetails'
export { JudiAssistantPanel, JudiAssistantReviewStep } from './JudiAssistant'
export type { JudiAssistantPanelProps, JudiAssistantSource, JudiAssistantToolCall } from './JudiAssistant'
