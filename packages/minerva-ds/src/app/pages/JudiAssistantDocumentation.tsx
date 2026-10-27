import { useState } from 'react'
import { useLocalRuntime, type ChatModelAdapter } from '@assistant-ui/react'
import { Button } from '../../components/ui/Button'
import { JudiAssistantPanel } from '../../components/ui/JudiAssistant'
import { Text } from '../../components/ui/Text'

const sampleReasoningSteps = ['Reading the question', 'Checking the sample source'] as const

function waitForDemoStep(duration: number, signal: AbortSignal) {
  if (signal.aborted) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const finish = () => {
      window.clearTimeout(timer)
      signal.removeEventListener('abort', finish)
      resolve()
    }
    const timer = window.setTimeout(finish, duration)
    signal.addEventListener('abort', finish, { once: true })
  })
}

const sampleAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    const reasoning = sampleReasoningSteps.join('\n')
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      yield { content: [{ type: 'reasoning', text: '\n' }] }
      await waitForDemoStep(250, abortSignal)
      for (let index = 0; index < sampleReasoningSteps.length; index += 1) {
        if (abortSignal.aborted) return
        yield { content: [{ type: 'reasoning', text: sampleReasoningSteps.slice(0, index + 1).join('\n') }] }
        await waitForDemoStep(800, abortSignal)
      }
    }
    if (abortSignal.aborted) return
    yield {
      content: [
        { type: 'reasoning', text: reasoning },
        { type: 'text', text: 'This is a sample response from a documentation-only runtime. A product supplies its own responses, context, sources, and actions.' },
        { type: 'source', sourceType: 'url', id: 'judi-assistant-demo-source', url: '#judi-assistant-demo-source', title: 'Sample criteria source' },
      ],
    }
  },
}

export function JudiAssistantDocumentation() {
  const runtime = useLocalRuntime(sampleAdapter)
  const [open, setOpen] = useState(true)

  return (
    <div className="flex min-h-full flex-col gap-(--layout-2)">
      <div className="flex flex-col gap-(--stack-2)">
        <Text as="h2" variant="heading-md" className="text-(--text-surface-base)">Judi Assistant</Text>
        <Text variant="body-md" className="text-(--text-surface-subtle)">
          A reusable chat surface. Each product supplies its assistant runtime, suggested prompts, source destinations, and tool activity.
        </Text>
      </div>
      {open ? (
        <div className="h-[calc(var(--space-48)*13)] w-full max-w-[calc(var(--space-48)*10)] overflow-hidden rounded-(--radius-md) border border-(--border-surface-base) shadow-(--shadow-surface-md)">
          <JudiAssistantPanel
            runtime={runtime}
            onClose={() => setOpen(false)}
            emptyTitle="Ask Judi AI."
            emptyDescription="This is an interactive example using sample content only."
            suggestions={['What can you help with?', 'Show a sample source.']}
            reasoningDetails={{
              'Reading the question': 'Understanding what the user asked.',
              'Checking the sample source': 'Finding relevant sample information.',
            }}
          />
        </div>
      ) : <Button variant="secondary" className="self-start" onClick={() => setOpen(true)}>Open Judi Assistant</Button>}
      <Text as="p" id="judi-assistant-demo-source" variant="body-sm" className="text-(--text-surface-subtle)">
        Sample criteria source for this documentation example. No real case or document data is used.
      </Text>
    </div>
  )
}
