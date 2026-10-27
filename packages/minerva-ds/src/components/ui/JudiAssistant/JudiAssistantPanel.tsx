import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import {
  ActionBarPrimitive,
  AssistantRuntimeProvider,
  AuiIf,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  groupPartByType,
  useAuiState,
  type AssistantRuntime,
} from '@assistant-ui/react'
import { Button } from '../Button'
import { AIIcon, ArrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon, CopyIcon, DocumentIcon, Icon, RefreshIcon, XIcon } from '../Icon'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const judiAiMarkSrc = new URL('../../../assets/judi-ai-mark.svg', import.meta.url).href

export interface JudiAssistantSource {
  id: string
  url?: string
  title?: string
}

export interface JudiAssistantToolCall {
  toolName: string
  args?: unknown
  result?: unknown
}

export interface JudiAssistantPanelProps {
  /** Assistant-ui runtime supplied by the consuming product. */
  runtime: AssistantRuntime
  /** Omit when the assistant is an always-visible part of a page. */
  onClose?: () => void
  suggestions?: readonly string[]
  emptyTitle?: string
  emptyDescription?: string
  /** Optional explanatory text for each reasoning step. */
  reasoningDetails?: Readonly<Record<string, string>>
  /** Render product-specific inline citations or rich answer text. */
  renderAnswer?: (text: string) => ReactNode
  /** Render a product-specific source card; a generic linked card is the default. */
  renderSource?: (source: JudiAssistantSource) => ReactNode
  /** Render product-specific tool activity, such as a criteria review. */
  renderToolCall?: (tool: JudiAssistantToolCall) => ReactNode
}

export function JudiAssistantReviewStep({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="judi-assistant-review-step grid grid-cols-[var(--space-4)_minmax(0,1fr)] gap-(--inline-2)">
      <span aria-hidden="true" className="mt-(--space-8) size-(--space-4) rounded-(--radius-full) bg-(--icon-surface-subtle)" />
      <div className="flex min-w-0 flex-col gap-(--stack-1)">
        <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">{title}</Text>
        {detail && <Text variant="body-md" className="text-(--text-surface-subtle)">{detail}</Text>}
      </div>
    </div>
  )
}

function ReasoningSteps({ text, details }: { text: string; details?: Readonly<Record<string, string>> }) {
  return <>
    {text.split('\n').filter((step) => step.trim().length > 0).map((step) => (
      <JudiAssistantReviewStep key={step} title={step} detail={details?.[step]} />
    ))}
  </>
}

function ReviewSteps({ children }: { children: ReactNode }) {
  const running = useAuiState((state) => state.message.status?.type === 'running')
  const writing = useAuiState((state) => state.message.parts.some((part) => part.type === 'text' && part.text.length > 0))
  const thinking = running && !writing
  const [expanded, setExpanded] = useState(true)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const startedAt = useRef<number | null>(null)

  useEffect(() => {
    if (thinking) {
      startedAt.current = performance.now()
      setElapsedSeconds(0)
      setExpanded(true)
      const timer = window.setInterval(() => {
        setElapsedSeconds(Math.max(1, Math.round((performance.now() - startedAt.current!) / 1000)))
      }, 1000)
      return () => window.clearInterval(timer)
    }

    if (startedAt.current !== null) {
      setElapsedSeconds(Math.max(1, Math.round((performance.now() - startedAt.current) / 1000)))
      startedAt.current = null
    }
    setExpanded(false)
  }, [thinking])

  return (
    <div className="mb-(--stack-3)">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
        className="flex items-center gap-(--inline-1) text-left text-(--text-surface-subtle) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)"
      >
        <Text variant="body-md" className={thinking ? 'judi-assistant-thinking-shimmer' : ''}>
          {thinking ? 'Thinking…' : elapsedSeconds > 0 ? `Thought for ${elapsedSeconds}s` : 'Review steps'}
        </Text>
        <Icon icon={expanded ? ChevronUpIcon : ChevronDownIcon} size="small" />
      </button>
      {expanded && (
        <div className="mt-(--stack-3) flex flex-col gap-(--stack-3)">
          {children}
        </div>
      )}
    </div>
  )
}

function Sources({ count, children }: { count: number; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false)
  const listId = useId()

  return (
    <div className="mt-(--stack-3)">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={listId}
        onClick={() => setExpanded((current) => !current)}
        className="inline-flex items-center gap-(--inline-2) rounded-(--radius-full) bg-(--bg-surface-subtle) px-(--inset-3) py-(--inset-1) text-(--text-surface-base) hover:bg-(--bg-action-neutral-hover) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)"
      >
        <span aria-hidden="true" className="flex items-center">
          {Array.from({ length: Math.min(count, 3) }, (_, index) => (
            <span
              key={index}
              className="flex size-(--space-20) items-center justify-center rounded-(--radius-full) border border-(--border-surface-base) bg-(--bg-surface-base) text-(--icon-surface-base)"
              style={{ marginLeft: index === 0 ? undefined : 'calc(-1 * var(--space-4))' }}
            >
              <Icon icon={DocumentIcon} size="small" />
            </span>
          ))}
        </span>
        <Text variant="body-sm" weight="semibold">Sources ({count})</Text>
        <Icon icon={expanded ? ChevronUpIcon : ChevronDownIcon} size="small" />
      </button>
      {expanded && <div id={listId} className="mt-(--stack-3) grid grid-cols-1 gap-(--layout-1) @min-[36rem]:grid-cols-2">{children}</div>}
    </div>
  )
}

function SourceCard({ source }: { source: JudiAssistantSource }) {
  const content = <>
      <span className="flex min-w-0 items-center gap-(--inline-2) text-(--text-surface-subtle)">
        <span aria-hidden="true" className="flex size-(--space-20) shrink-0 items-center justify-center rounded-(--radius-sm) bg-(--bg-surface-subtle)">
          <Icon icon={DocumentIcon} size="small" />
        </span>
        <Text variant="body-sm" className="truncate">Source document</Text>
      </span>
      <Text variant="body-sm" weight="semibold" className="line-clamp-2">{source.title ?? source.id}</Text>
    </>
  const classes = 'flex min-w-0 flex-col gap-(--stack-1) rounded-(--radius-md) border border-(--border-surface-base) bg-(--bg-surface-base) p-(--inset-5) text-(--text-surface-base)'

  return source.url
    ? <a href={source.url} className={`${classes} hover:bg-(--bg-surface-subtle) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)`} aria-label={`View source: ${source.title ?? 'Source document'}`}>{content}</a>
    : <div className={classes}>{content}</div>
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="ml-auto max-w-[90%] rounded-(--radius-sm) bg-(--bg-surface-subtle) p-(--inset-4)">
      <MessagePrimitive.Parts>
        {({ part }) => part.type === 'text'
          ? <Text variant="body-md" className="whitespace-pre-wrap text-(--text-surface-base)">{part.text}</Text>
          : null}
      </MessagePrimitive.Parts>
    </MessagePrimitive.Root>
  )
}

const groupWork = groupPartByType({ reasoning: ['group-work'], 'tool-call': ['group-work'], source: ['group-sources'] })

function MessageActions() {
  const copied = useAuiState((state) => state.message.isCopied)

  return (
    <ActionBarPrimitive.Root hideWhenRunning className="mt-(--stack-2) flex items-center gap-(--inline-1)">
      <Tooltip content={copied ? 'Copied' : 'Copy answer'} beak="none">
        <ActionBarPrimitive.Copy asChild copiedDuration={1500}>
          <Button variant="tertiary" iconOnly aria-label={copied ? 'Copied to clipboard' : 'Copy answer'} style={{ padding: 'var(--inset-1)' }}>
            <Icon icon={copied ? CheckCircleIcon : CopyIcon} size="small" className={copied ? 'text-(--icon-feedback-success-base)' : undefined} />
          </Button>
        </ActionBarPrimitive.Copy>
      </Tooltip>
      <Tooltip content="Regenerate answer" beak="none">
        <ActionBarPrimitive.Reload asChild>
          <Button variant="tertiary" iconOnly aria-label="Regenerate answer" style={{ padding: 'var(--inset-1)' }}>
            <Icon icon={RefreshIcon} size="small" />
          </Button>
        </ActionBarPrimitive.Reload>
      </Tooltip>
      <span role="status" className="sr-only">{copied ? 'Copied to clipboard' : ''}</span>
    </ActionBarPrimitive.Root>
  )
}

function AssistantMessage({ reasoningDetails, renderAnswer, renderSource, renderToolCall }: Pick<JudiAssistantPanelProps, 'reasoningDetails' | 'renderAnswer' | 'renderSource' | 'renderToolCall'>) {
  return (
    <MessagePrimitive.Root className="flex min-w-0 flex-col gap-(--stack-2)">
      <div className="flex shrink-0 items-center gap-(--inline-3)">
        <img src={judiAiMarkSrc} alt="" aria-hidden="true" width="24" height="25" className="h-auto w-(--space-24) shrink-0" />
        <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">Judi AI</Text>
      </div>
      <div className="@container ml-[calc(var(--space-24)+var(--inline-3))] min-w-0">
        <MessagePrimitive.GroupedParts groupBy={groupWork} indicator="empty">
          {({ part, children }) => {
            switch (part.type) {
              case 'group-work':
                return <ReviewSteps>{children}</ReviewSteps>
              case 'reasoning':
                return <ReasoningSteps text={part.text} details={reasoningDetails} />
              case 'tool-call':
                return renderToolCall?.({ toolName: part.toolName, args: part.args, result: part.result }) ?? null
              case 'text':
                return (
                  <Text as="div" variant="body-md" className="whitespace-pre-wrap text-(--text-surface-base)">
                    {renderAnswer ? renderAnswer(part.text) : part.text}
                  </Text>
                )
              case 'group-sources':
                return <Sources count={part.indices.length}>{children}</Sources>
              case 'source':
                return renderSource
                  ? renderSource({ id: part.id, url: part.url, title: part.title })
                  : <SourceCard source={{ id: part.id, url: part.url, title: part.title }} />
              case 'indicator':
                return <Text variant="body-sm" className="text-(--text-surface-subtle)">Thinking…</Text>
              default:
                return null
            }
          }}
        </MessagePrimitive.GroupedParts>
        <MessageActions />
      </div>
    </MessagePrimitive.Root>
  )
}

function JudiAssistantContent({ onClose, suggestions = [], emptyTitle = 'Ask Judi AI.', emptyDescription = 'Ask about the current work and its supporting sources.', reasoningDetails, renderAnswer, renderSource, renderToolCall }: Omit<JudiAssistantPanelProps, 'runtime'>) {
  return (
    <ThreadPrimitive.Root className="flex h-full min-h-0 flex-col bg-(--bg-surface-base)">
      <header className="flex items-center justify-between border-b border-(--border-surface-base) px-(--inset-7) py-(--inset-5)">
        <div className="flex items-center gap-(--inline-2)">
          <Icon icon={AIIcon} size="regular" />
          <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">Judi AI</Text>
        </div>
        {onClose && (
          <Button variant="tertiary" iconOnly aria-label="Close Judi AI" onClick={onClose}>
            <Icon icon={CloseIcon} size="regular" />
          </Button>
        )}
      </header>

      <ThreadPrimitive.Viewport className="flex min-h-0 flex-1 flex-col gap-(--layout-3) overflow-y-auto p-(--inset-7)">
        <AuiIf condition={(state) => state.thread.isEmpty}>
          <div className="mt-auto flex flex-col gap-(--layout-3)">
            <div className="flex flex-col gap-(--stack-2)">
              <Text as="h2" variant="heading-sm" className="text-(--text-surface-base)">{emptyTitle}</Text>
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                {emptyDescription}
              </Text>
            </div>
            <div className="flex flex-col items-start gap-(--stack-3)">
              {suggestions.map((prompt) => (
                <ThreadPrimitive.Suggestion key={prompt} prompt={prompt} send asChild>
                  <Button variant="tertiary" unpadded className="text-left no-underline hover:no-underline">
                    <span aria-hidden="true" className="text-(--text-surface-subtle)">&gt;</span>
                    {prompt}
                  </Button>
                </ThreadPrimitive.Suggestion>
              ))}
            </div>
          </div>
        </AuiIf>
        <ThreadPrimitive.Messages>
          {({ message }) => message.role === 'user'
            ? <UserMessage />
            : <AssistantMessage reasoningDetails={reasoningDetails} renderAnswer={renderAnswer} renderSource={renderSource} renderToolCall={renderToolCall} />}
        </ThreadPrimitive.Messages>
      </ThreadPrimitive.Viewport>

      <ComposerPrimitive.Root className="m-(--inset-7) mt-0 flex min-h-[calc(var(--space-48)*2)] items-stretch gap-(--inline-2) rounded-(--radius-sm) bg-(--bg-control-default-idle) px-(--inset-3) py-(--inset-3) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)] hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)] focus-within:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-focus),var(--shadow-input-engaged)]">
        <ComposerPrimitive.Input
          aria-label="Ask Judi AI a question"
          placeholder="Ask a question…"
          rows={2}
          className="min-h-(--space-40) min-w-0 flex-1 self-stretch resize-none bg-transparent outline-none placeholder:text-(--text-surface-subtle)"
          style={{
            fontSize: 'var(--body-md-size)',
            lineHeight: 'var(--body-md-line-height)',
            fontWeight: 'var(--body-md-weight)',
            color: 'var(--text-control-value)',
          }}
        />
        <AuiIf condition={(state) => state.thread.isRunning}>
          <ComposerPrimitive.Cancel asChild>
            <Button variant="secondary" iconOnly aria-label="Stop response" title="Stop response" className="self-end">
              <Icon icon={XIcon} size="small" />
            </Button>
          </ComposerPrimitive.Cancel>
        </AuiIf>
        <AuiIf condition={(state) => !state.thread.isRunning}>
          <ComposerPrimitive.Send asChild>
            <Button variant="primary" iconOnly aria-label="Send message" title="Send message" className="self-end">
              <Icon icon={ArrowUpIcon} size="small" />
            </Button>
          </ComposerPrimitive.Send>
        </AuiIf>
      </ComposerPrimitive.Root>
    </ThreadPrimitive.Root>
  )
}

/** Branded chat UI; the consuming product owns its runtime, sources, and tools. */
export function JudiAssistantPanel({ runtime, ...contentProps }: JudiAssistantPanelProps) {
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <JudiAssistantContent {...contentProps} />
    </AssistantRuntimeProvider>
  )
}
