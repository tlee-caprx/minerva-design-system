import type { ChatModelAdapter } from '@assistant-ui/react'
import type { TapCase, TapClinicalCriterion } from './cases'

export const TAP_CHAT_PROMPTS = [
  'Why this recommendation?',
  'Show me the deciding criterion.',
  'What should I verify before confirming?',
] as const

const REVIEW_DURATION_MS = 6_000
const THINKING_INTRO_MS = 250
const STREAM_WORDS_PER_CHUNK = 4
const STREAM_CHUNK_DELAY_MS = 60

export interface TapChatReply {
  answer: string
  workSteps: string[]
}

function citations(criterion: TapClinicalCriterion, index: number) {
  return criterion.source ? `{{cite:${index + 1}}}` : ''
}

function evidence(criterion: TapClinicalCriterion, index: number) {
  const source = criterion.source ? ` ${criterion.source}` : ''
  const references = citations(criterion, index)
  return `${criterion.evidence}${source ? ` — ${source}` : ''}${references ? ` ${references}` : ''}`
}

function classifyQuestion(question: string) {
  const normalized = question.toLowerCase().replace(/[^a-z\s]/g, ' ')
  if (/verif|confirm|check|evidence|source|document|citation/.test(normalized)) return 'verify'
  if (/criter|decid|which|met|fail/.test(normalized)) return 'criterion'
  if (/why|reason|recommend|deni|denial|approv/.test(normalized)) return 'recommendation'
  if (/summar|overview|about this case|case brief/.test(normalized)) return 'overview'
  return 'unsupported'
}

export function getTapChatReply(caseData: TapCase, question: string): TapChatReply {
  const intent = classifyQuestion(question)
  const criteria = caseData.clinicalCriteria
  const decidingIndex = criteria.findIndex((criterion) => criterion.status === 'not-met')
  const decidingCriterion = decidingIndex >= 0 ? criteria[decidingIndex] : null
  const flagged = criteria
    .map((criterion, index) => ({ criterion, index }))
    .filter(({ criterion }) => criterion.status === 'review')
  const met = criteria.filter((criterion) => criterion.status === 'met')
  const workSteps = [
    'Reading the current case details',
    'Checking the clinical criteria',
    'Matching the answer to listed evidence',
  ]

  if (intent === 'unsupported') {
    return {
      answer: 'This demo can explain the recommendation, show the deciding criterion, or point to evidence to verify. Try one of the suggested questions.',
      workSteps: ['Checking the questions supported by this demo'],
    }
  }

  if (intent === 'overview') {
    return {
      answer: `${caseData.recommendationSummary}\n\nJudi AI recommends ${caseData.recommendation}. ${met.length} of ${criteria.length} clinical criteria are met.${decidingCriterion ? ` The deciding evidence is: ${evidence(decidingCriterion, decidingIndex)}.` : ''}`,
      workSteps,
    }
  }

  if (intent === 'recommendation') {
    return {
      answer: decidingCriterion
        ? `${caseData.recommendationSummary}\n\nThe deciding criterion is “${decidingCriterion.title}.” The recorded evidence is: ${evidence(decidingCriterion, decidingIndex)}.`
        : `${caseData.recommendationSummary}\n\nAll ${criteria.length} listed clinical criteria are met. ${criteria.map((criterion, index) => `${criterion.title}: ${evidence(criterion, index)}`).join('\n')}`,
      workSteps,
    }
  }

  if (intent === 'criterion') {
    return {
      answer: decidingCriterion
        ? `The deciding criterion is “${decidingCriterion.title}.” It is marked not met because ${evidence(decidingCriterion, decidingIndex)}.${flagged.length ? `\n\nAlso flagged for review: ${flagged.map(({ criterion, index }) => `“${criterion.title}” — ${evidence(criterion, index)}`).join('; ')}.` : ''}`
        : `No criterion is marked not met. All ${criteria.length} criteria are met:\n${criteria.map((criterion, index) => `• ${criterion.title} — ${evidence(criterion, index)}`).join('\n')}`,
      workSteps,
    }
  }

  const evidenceToCheck = decidingCriterion
    ? [{ criterion: decidingCriterion, index: decidingIndex }, ...flagged]
    : criteria.map((criterion, index) => ({ criterion, index }))

  return {
    answer: `Before confirming, verify the evidence behind the ${caseData.recommendation} recommendation:\n${evidenceToCheck.map(({ criterion, index }) => `• ${criterion.title}: ${evidence(criterion, index)}`).join('\n')}\n\nThese citations take you to the matching evidence rows in Clinical Criteria.`,
    workSteps,
  }
}

function waitForStep(duration: number, signal: AbortSignal) {
  if (signal.aborted) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const finish = () => {
      clearTimeout(timer)
      signal.removeEventListener('abort', finish)
      resolve()
    }
    const timer = setTimeout(finish, duration)
    signal.addEventListener('abort', finish, { once: true })
  })
}

/** The local runtime receives the same case fixture as TAP and never calls a model or network API. */
export function createTapDemoAdapter(caseData: TapCase): ChatModelAdapter {
  return {
    async *run({ messages, abortSignal }) {
      const latestQuestion = [...messages].reverse().find((message) => message.role === 'user')
      const question = latestQuestion?.content
        .filter((part) => part.type === 'text')
        .map((part) => part.text)
        .join(' ') ?? ''
      const reply = getTapChatReply(caseData, question)
      const answerWithLinks = reply.answer.replace(
        /\{\{cite:(\d+)\}\}/g,
        (_, criterionIndex: string) => `[${criterionIndex}](#tap-criterion-${caseData.id}-${criterionIndex})`,
      )
      const citedIndices = [...new Set(
        [...reply.answer.matchAll(/\{\{cite:(\d+)\}\}/g)].map((match) => Number(match[1])),
      )]
      const sources = citedIndices.map((criterionIndex) => {
        const criterion = caseData.clinicalCriteria[criterionIndex - 1]
        return {
          type: 'source' as const,
          sourceType: 'url' as const,
          id: `tap-criterion-${caseData.id}-${criterionIndex}`,
          url: `#tap-criterion-${caseData.id}-${criterionIndex}`,
          title: `${criterion.source} · ${criterion.title}`,
        }
      })
      const reviewTool = {
        type: 'tool-call' as const,
        toolCallId: `review-criteria-${caseData.id}-${latestQuestion?.id ?? 'prompt'}`,
        toolName: 'reviewClinicalCriteria',
        args: { caseId: caseData.id },
        argsText: JSON.stringify({ caseId: caseData.id }),
        result: { checked: caseData.clinicalCriteria.length },
      }
      const reducedMotion = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const completedSteps = reply.workSteps.join('\n')

      if (reducedMotion) {
        yield { content: [{ type: 'reasoning', text: completedSteps }, reviewTool, { type: 'text', text: answerWithLinks }, ...sources] }
        return
      }

      // Mount the thinking header before revealing the first review step.
      yield { content: [{ type: 'reasoning', text: '\n' }] }
      await waitForStep(THINKING_INTRO_MS, abortSignal)

      for (let index = 0; index < reply.workSteps.length; index += 1) {
        if (abortSignal.aborted) return
        yield { content: [{ type: 'reasoning', text: reply.workSteps.slice(0, index + 1).join('\n') }] }
        await waitForStep((REVIEW_DURATION_MS - THINKING_INTRO_MS) / reply.workSteps.length, abortSignal)
      }

      // Keep Markdown citation links whole while revealing a few words at a time.
      const words = answerWithLinks.match(/\[\d+\]\(#tap-criterion-[^)]+\)|\S+\s*/g) ?? []
      let visibleText = ''
      for (let index = 0; index < words.length; index += STREAM_WORDS_PER_CHUNK) {
        if (index > 0) await waitForStep(STREAM_CHUNK_DELAY_MS, abortSignal)
        if (abortSignal.aborted) return
        visibleText += words.slice(index, index + STREAM_WORDS_PER_CHUNK).join('')
        yield {
          content: [
            { type: 'reasoning', text: completedSteps },
            reviewTool,
            { type: 'text', text: visibleText },
            ...(index + STREAM_WORDS_PER_CHUNK >= words.length ? sources : []),
          ],
        }
      }
    },
  }
}
