# Judi Assistant

`JudiAssistantPanel` is Minerva's shared chat surface. It renders the Judi header, conversation, reasoning steps, source cards, composer, and message actions. It does not choose case data, prompts, answers, citations, or tool behavior.

The consuming product creates an assistant-ui runtime and passes it to the panel. Each product (TAP, PAT, …) provides its own adapter without copying the chat UI. The documentation app's Judi Assistant section shows a minimal scripted adapter.

```tsx
const runtime = useLocalRuntime(productAdapter)

<JudiAssistantPanel
  runtime={runtime}
  onClose={closeAssistant}
  suggestions={suggestedQuestions}
  renderAnswer={renderProductCitations}
  renderSource={renderProductSource}
  renderToolCall={renderProductToolActivity}
/>
```

The rendering callbacks are optional. Without them, answer text is plain, sources use a basic Minerva card, and tool activity is hidden. `reasoningDetails` optionally supplies descriptions for reasoning-step titles. The host controls the panel's width and height.

Document upload, live model integration, and changes elsewhere in the application belong to the product's runtime and workflows, not this visual component. They are not simulated by the shared panel.
