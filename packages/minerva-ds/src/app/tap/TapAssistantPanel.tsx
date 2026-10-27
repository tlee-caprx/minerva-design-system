import { useMemo, type ReactNode } from 'react'
import { useLocalRuntime } from '@assistant-ui/react'
import { JudiAssistantPanel, JudiAssistantReviewStep } from '../../components/ui/JudiAssistant'
import type { JudiAssistantSource } from '../../components/ui/JudiAssistant'
import { Icon, DocumentIcon } from '../../components/ui/Icon'
import { Text } from '../../components/ui/Text'
import type { TapCase } from './cases'
import { createTapDemoAdapter, TAP_CHAT_PROMPTS } from './tapChatDemo'

export interface TapAssistantPanelProps {
  caseData: TapCase
  onClose: () => void
}

const STEP_DETAILS: Record<string, string> = {
  'Reading the current case details': 'Reviewing the member, requested drug, and diagnosis.',
  'Checking the clinical criteria': 'Comparing the recorded answers with the case requirements.',
  'Matching the answer to listed evidence': 'Connecting the response to the relevant evidence rows.',
  'Checking the questions supported by this demo': 'Looking for a matching scripted case question.',
}

function renderCitationText(text: string, caseId: string): ReactNode {
  return text.split(/(\[\d+\]\(#tap-criterion-[^)]+\))/g).map((segment, index) => {
    const citation = segment.match(/^\[(\d+)\]\(#tap-criterion-([^-]+)-(\d+)\)$/)
    if (!citation) return segment
    const [, citationNumber, citedCaseId, criterionIndex] = citation
    if (citedCaseId !== caseId) return segment
    return (
      <a
        key={`${criterionIndex}-${citationNumber}-${index}`}
        href={`#tap-criterion-${caseId}-${criterionIndex}`}
        aria-label={`View citation ${citationNumber} in Clinical Criteria`}
        className="text-(--text-action-hyperlink) underline"
      >
        [{citationNumber}]
      </a>
    )
  })
}

function TapSourceCard({ source, caseData }: { source: JudiAssistantSource; caseData: TapCase }) {
  const criterionIndex = Number(source.id.split('-').at(-1))
  const criterion = caseData.clinicalCriteria[criterionIndex - 1]
  const sourceName = criterion?.source ?? 'Case source'

  return (
    <a
      href={source.url ?? `#${source.id}`}
      aria-label={`View source ${criterionIndex}: ${sourceName}`}
      className="flex min-w-0 flex-col gap-(--stack-1) rounded-(--radius-md) border border-(--border-surface-base) bg-(--bg-surface-base) p-(--inset-5) text-(--text-surface-base) hover:bg-(--bg-surface-subtle) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)"
    >
      <span className="flex min-w-0 items-center gap-(--inline-2) text-(--text-surface-subtle)">
        <span aria-hidden="true" className="flex size-(--space-20) shrink-0 items-center justify-center rounded-(--radius-sm) bg-(--bg-surface-subtle)">
          <Icon icon={DocumentIcon} size="small" />
        </span>
        <Text variant="body-sm" className="truncate">{sourceName} · [{criterionIndex}]</Text>
      </span>
      <Text variant="body-sm" weight="semibold" className="line-clamp-2">{criterion?.title ?? source.title}</Text>
      {criterion?.evidence && <Text variant="body-sm" className="line-clamp-2 text-(--text-surface-subtle)">{criterion.evidence}</Text>}
    </a>
  )
}

/** TAP-only case content and scripted runtime around Minerva's shared chat UI. */
export function TapAssistantPanel({ caseData, onClose }: TapAssistantPanelProps) {
  const adapter = useMemo(() => createTapDemoAdapter(caseData), [caseData])
  const runtime = useLocalRuntime(adapter)

  return (
    <JudiAssistantPanel
      runtime={runtime}
      onClose={onClose}
      suggestions={TAP_CHAT_PROMPTS}
      emptyTitle="Ask Judi AI."
      emptyDescription="Explore the recommendation, the deciding criteria, and supporting evidence for this case."
      reasoningDetails={STEP_DETAILS}
      renderAnswer={(text) => renderCitationText(text, caseData.id)}
      renderSource={(source) => <TapSourceCard source={source} caseData={caseData} />}
      renderToolCall={({ result }) => {
        const checked = Number((result as { checked?: number } | undefined)?.checked ?? 0)
        return <JudiAssistantReviewStep title="Clinical criteria checked" detail={`${checked} criteria reviewed for this case.`} />
      }}
    />
  )
}
