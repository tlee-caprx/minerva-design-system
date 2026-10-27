import { Fragment, useEffect, useState, type ReactNode } from 'react'
import {
  Icon,
  AIIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  LinkIcon,
} from '../Icon'
import { Text } from '../Text'
import { Button } from '../Button'
import { ButtonGroup } from '../ButtonGroup'
import { Divider } from '../Divider'
import { Chip } from '../Chip'
import { Textarea } from '../Input'

// ─── Feedback reason chips ──────────────────────────────────────────────────────

const POSITIVE_REASONS = ['Accurate answer', 'Helpful sources', 'Saved time', 'Easy to verify', 'Other']
const NEGATIVE_REASONS = ['Wrong answer', 'Sources not relevant', 'Missing information', 'Misleading evidence', 'Other']

// ─── Types ────────────────────────────────────────────────────────────────────

export type AIRecommendationCardVariant =
  | 'recommendation'
  /** Judi AI recommends approving the current request. */
  | 'approval'
  /** Judi AI recommends denying the current request. */
  | 'denial'
  | 'agrees'
  | 'disagrees'
  | 'answered'
  /** User clicked "Keep Answer" on a disagrees card */
  | 'answer-kept'
  /** User clicked "Update to Judi AI Answer" on a disagrees card — aligned, so green */
  | 'ai-answer-updated'
  /** No supporting evidence found — warns before fax generation */
  | 'not-enough-information'
  /**
   * A fax outreach draft has been generated but not sent. The intermediate
   * state between not-enough-information and waiting-on-prescriber: sending
   * is an explicit user action (Send via Fax), which is what makes the
   * transition to waiting-on-prescriber observable.
   */
  | 'outbound-draft-ready'
  /** Fax generated and sent — awaiting prescriber response; never collapsible */
  | 'waiting-on-prescriber'

export interface AIRecommendationComparison {
  recommended: string
  current: string
}

export interface AIRecommendationCitation {
  /** The supporting quote or AI-generated summary — 1-2 sentences */
  excerpt: string
  /** Source document type, e.g. "Clinical Evidence", "Intake Form" */
  docType: string
  pages: number[]
  /**
   * When the AI extracted this citation, e.g. "12/12/2045 12:34 PM EST" —
   * always shown, regardless of whether the source document has its own
   * inherent timestamp, so every citation carries a consistent audit trail.
   */
  timestamp: string
  /** Opens the source cited by the inline [N] reference. */
  onViewInDocument?: () => void
}

/** A claim in an AI-generated summary, with references to the cited sources. */
export interface AIRecommendationSummarySegment {
  text: string
  /** One-based indexes into the card's `citations` array. */
  citations?: number[]
}

/** Prescriber metadata shown under the title on `waiting-on-prescriber` cards */
export interface AIRecommendationPrescriberMeta {
  name: string
  fax: string
  /** e.g. "11/24/26 at 02:14PM" */
  sentAt: string
}

export interface AIRecommendationCardProps {
  variant: AIRecommendationCardVariant
  /** Optional title override for a contextual recommendation state. */
  title?: ReactNode
  /** Whether to show the contextual link icon beside the title. */
  showTitleLinkIcon?: boolean
  /**
   * Header-right actions, e.g. "Start New Case"/"Attach To Case" or "Keep
   * Answer"/"Update to Judi AI Answer" — contextual per card, not fixed per
   * variant. Pass plain <Button> elements; this wraps them in a ButtonGroup
   * itself, so you don't need to.
   */
  actions?: ReactNode
  /** AI-generated summary. Pass segments to attach citations to individual claims. */
  summary: string | AIRecommendationSummarySegment[]
  /**
   * The recommended-vs-current answer block. Only ever rendered for
   * `disagrees` — deliberately suppressed for every other variant even if
   * passed, since "agrees" already implies they match (nothing to compare).
   */
  comparison?: AIRecommendationComparison
  /** Supporting sources rendered as inline, clickable [N] references after
   *  the AI-generated summary. */
  citations?: AIRecommendationCitation[]
  /** Prescriber metadata row — rendered for `waiting-on-prescriber` */
  prescriber?: AIRecommendationPrescriberMeta
  /** Supplemental case metadata rendered above the AI summary. */
  metadata?: ReactNode
  /** Overrides the variant's default feedback visibility. */
  showFeedback?: boolean
  /** Called when the user submits the "Was this helpful?" feedback form */
  onFeedbackSubmit?: (feedback: { helpful: boolean; reasons: string[]; details: string }) => void
  /**
   * Transient loading mode: renders a title-row-only shell with a pulsing AI
   * mark and status text. The parent owns the async work and the next card
   * state.
   */
  loading?: boolean
  /** Status line shown while `loading` — e.g. "Judi AI is updating to its answer…" */
  loadingText?: string
  /**
   * Overrides the variant's default collapse state on first mount. Defaults
   * per variant: `agrees` starts collapsed (it agrees — no reason to take up
   * space); everything else starts expanded. `waiting-on-prescriber` can
   * never be collapsed at all.
   */
  defaultCollapsed?: boolean
  className?: string
}

// ─── Variant → title / background / collapse behavior ──────────────────────────

const TITLES: Record<AIRecommendationCardVariant, string> = {
  recommendation:          'Judi AI Recommendation',
  approval:                'Judi AI Recommends Approval',
  denial:                  'Judi AI Recommends Denial',
  agrees:                  'Judi AI Agrees',
  disagrees:               'Judi AI Disagrees',
  answered:                'Answered by Judi AI',
  'answer-kept':           'Original Answer Kept',
  'ai-answer-updated':     "Updated to Judi AI's Answer",
  'not-enough-information': 'Not Enough Information',
  'outbound-draft-ready':  'Outbound Draft Ready',
  'waiting-on-prescriber': 'Waiting on Prescriber',
}

const BACKGROUNDS: Record<AIRecommendationCardVariant, string> = {
  recommendation:           'var(--gradient-ai-default)',
  approval:                 'var(--gradient-ai-agree)',
  denial:                   'var(--gradient-ai-disagree)',
  agrees:                   'var(--gradient-ai-agree)',
  disagrees:                'var(--gradient-ai-disagree)',
  answered:                 'var(--gradient-ai-default)',
  'answer-kept':            'var(--gradient-ai-disagree)',
  'ai-answer-updated':      'var(--gradient-ai-agree)',
  'not-enough-information': 'var(--gradient-ai-disagree)',
  'outbound-draft-ready':   'var(--gradient-ai-disagree)',
  'waiting-on-prescriber':  'var(--gradient-ai-disagree)',
}

const COLLAPSIBLE: Record<AIRecommendationCardVariant, boolean> = {
  recommendation:           true,
  approval:                 false,
  denial:                   false,
  agrees:                   true,
  // Always carries Keep Answer/Update actions — those own the title row, and
  // the card resolves into answer-kept / ai-answer-updated instead
  disagrees:                false,
  answered:                 true,
  'answer-kept':            true,
  'ai-answer-updated':      true,
  'not-enough-information': true,
  // Carries Send via Fax — actions own the title row
  'outbound-draft-ready':   false,
  // Awaiting a prescriber response — the user must act on this, so it stays open
  'waiting-on-prescriber':  false,
}

const DEFAULT_COLLAPSED: Record<AIRecommendationCardVariant, boolean> = {
  recommendation:           false,
  approval:                 false,
  denial:                   false,
  // Agrees with the user — nothing to compare, so don't take up the space
  agrees:                   true,
  disagrees:                false,
  answered:                 false,
  'answer-kept':            false,
  'ai-answer-updated':      false,
  'not-enough-information': false,
  'outbound-draft-ready':   false,
  'waiting-on-prescriber':  false,
}

/** Only `waiting-on-prescriber` skips the feedback section */
const HAS_FEEDBACK: Record<AIRecommendationCardVariant, boolean> = {
  recommendation:           true,
  approval:                 false,
  denial:                   false,
  agrees:                   true,
  disagrees:                true,
  answered:                 true,
  'answer-kept':            true,
  'ai-answer-updated':      true,
  'not-enough-information': true,
  'outbound-draft-ready':   true,
  'waiting-on-prescriber':  false,
}

// ─── Not-enough-information warning notices ───────────────────────────────────

const WARNING_NOTICES = [
  'Clicking Generate Outbound Communication will generate a fax outreach draft. Please review it before sending it out.',
  'Prescriber has opted out of AI phone calls.',
]

// ─── Loading pixel-grid (Drive pattern) ───────────────────────────────────────
// 3×3 cells flash along a chevron wavefront: column position plus distance
// from the middle row, ×90ms stagger. The 650ms per-cell cycle is shorter
// than the total sweep (max delay 360ms), so two fronts are always in flight.
// Cells carry the brand-gradient blues (gradient-050 stops, theme-aware via
// --ai-glow-core/halo) as a diagonal linear gradient. Reduced motion: the
// media query in tailwind.css freezes cells to dim.

const DRIVE_DELAYS = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3)
  const c = i % 3
  return (c + Math.abs(r - 1)) * 90
})

export function LoaderGrid() {
  return (
    <span aria-hidden="true" className="grid shrink-0" style={{ gridTemplateColumns: 'repeat(3, 4px)', gap: '1.5px' }}>
      {DRIVE_DELAYS.map((delay, index) => (
        <span
          key={index}
          className="pixel-cell rounded-(--radius-xs)"
          style={{
            width:     '4px',
            height:    '4px',
            backgroundImage: 'linear-gradient(135deg, var(--ai-loader-from) 0%, var(--ai-loader-to) 100%)',
            opacity:   0.15,
            animation: `pixel-on 650ms ease-in-out ${delay}ms infinite`,
          }}
        />
      ))}
    </span>
  )
}

/** Live elapsed timer in mono tabular figures — "12.3s", flips to "1m 04.5s" past a minute */
function ElapsedTimer() {
  const [ds, setDs] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setDs((d) => d + 1), 100)
    return () => clearInterval(t)
  }, [])
  const total = ds / 10
  return (
    <span
      className="shrink-0 text-(--text-surface-subtle)"
      style={{
        fontFamily: 'monospace',
        fontSize:   'var(--label-sm-size)',
        lineHeight: 'var(--label-sm-line-height)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {total < 60 ? `${total.toFixed(1)}s` : `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`}
    </span>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AIRecommendationCard({
  variant,
  title,
  showTitleLinkIcon = true,
  actions,
  summary,
  comparison,
  citations,
  prescriber,
  metadata,
  onFeedbackSubmit,
  showFeedback: showFeedbackOverride,
  loading = false,
  loadingText,
  defaultCollapsed,
  className = '',
}: AIRecommendationCardProps) {
  const [showCitations, setShowCitations] = useState(false)
  const [activeCitation, setActiveCitation] = useState<number | null>(null)
  const [collapsed, setCollapsed] = useState(defaultCollapsed ?? DEFAULT_COLLAPSED[variant])
  const showComparison = variant === 'disagrees' && comparison
  const collapsible = COLLAPSIBLE[variant] && !actions
  const showFeedback = showFeedbackOverride ?? HAS_FEEDBACK[variant]

  useEffect(() => {
    if (collapsed) setShowCitations(false)
  }, [collapsed])

  // Wait for the source list to render before navigating from an inline [N]
  // reference to the matching source item.
  useEffect(() => {
    if (!showCitations || activeCitation === null) return
    document.getElementById(`ai-citation-${activeCitation}`)?.scrollIntoView({ block: 'nearest' })
    setActiveCitation(null)
  }, [activeCitation, showCitations])

  const showCitation = (citationNumber: number) => {
    setActiveCitation(citationNumber)
    setShowCitations(true)
  }

  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)
  const [reasons, setReasons] = useState<string[]>([])
  const [details, setDetails] = useState('')
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleThumb = (direction: 'up' | 'down') => {
    // Clicking the already-active thumb un-clicks it — resets back to neutral
    // and hides the form/confirmation rather than toggling to the other one.
    setFeedback((prev) => (prev === direction ? null : direction))
    setReasons([])
    setDetails('')
    setAttemptedSubmit(false)
    setSubmitted(false)
  }

  const toggleReason = (reason: string) => {
    setReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]))
  }

  const handleFeedbackSubmit = () => {
    if (!details.trim()) {
      setAttemptedSubmit(true)
      return
    }
    setSubmitted(true)
    onFeedbackSubmit?.({ helpful: feedback === 'up', reasons, details })
  }

  // ── Loading mode: title-row-only shell with pixel-grid loader + shimmer text ─

  if (loading) {
    return (
      <div
        className={`flex items-center gap-(--inline-3) p-(--inset-7) rounded-(--radius-sm) bg-(--bg-surface-base) ${className}`}
        style={{ backgroundImage: BACKGROUNDS[variant] }}
        role="status"
        aria-live="polite"
      >
        {/* Drive loader — 3×3 pixel grid, chevron wavefront sweeping right.
            The 650ms cell cycle is shorter than the full sweep, so two
            fronts stay in flight. Cells carry the brand-gradient blues. */}
        <LoaderGrid />
        {/* Shimmer sweep — Figma-specified stops: #323C5A 0/40/80%,
            #A0B4DC 60%, #8CA5CD 100%. background-size 200% + a leftward
            position loop slides the highlight band across the text. */}
        <span
          className="min-w-0 truncate"
          style={{
            fontSize:     'var(--body-md-size)',
            lineHeight:   'var(--body-md-line-height)',
            fontWeight:   'var(--body-md-weight)',
            backgroundImage: 'linear-gradient(90deg, #323C5A 0%, #323C5A 40%, #A0B4DC 60%, #323C5A 80%, #8CA5CD 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color:        'transparent',
            animation:    'judi-shimmer 2.4s linear infinite',
          }}
        >
          {loadingText ?? 'Judi AI is making updates…'}
        </span>
        <ElapsedTimer />
      </div>
    )
  }

  // ── Full card ────────────────────────────────────────────────────────────────

  return (
    <div
      className={`flex flex-col p-(--inset-7) rounded-(--radius-sm) bg-(--bg-surface-base) transition-colors duration-500 ${className}`}
      style={{ backgroundImage: BACKGROUNDS[variant] }}
    >
      {/* Icon sits in the title row so it centers against the title (and any
          actions) rather than top-aligning against the whole card. Content
          below is indented by icon width + gap so it lines up with the
          title's left edge instead of the icon's. */}
      <div className="flex items-center gap-(--inline-2)">
        {/* Rendered directly (not via <Icon>) so the tinted prop passes
            through — Icon's props are plain SVGProps and would strip it */}
        <AIIcon
          width={20}
          height={20}
          tinted={variant !== 'recommendation' && variant !== 'answered'}
          className={`shrink-0 ${
            variant === 'approval' || variant === 'agrees' || variant === 'ai-answer-updated'
              ? 'text-(--icon-feedback-success-base)'
              : variant === 'denial' ||
                variant === 'disagrees' ||
                variant === 'answer-kept' ||
                variant === 'not-enough-information' ||
                variant === 'outbound-draft-ready' ||
                variant === 'waiting-on-prescriber'
              ? 'text-(--icon-feedback-warning-base)'
              : ''
          }`}
        />
        <div className="flex flex-1 min-w-0 items-center gap-(--inline-1)">
          <Text
            as="h3"
            variant="body-md"
            weight="semibold"
            className={`min-w-0 truncate ${
              variant === 'approval' || variant === 'agrees' || variant === 'ai-answer-updated'
                ? 'text-(--text-feedback-success-base)'
                : variant === 'denial' ||
                  variant === 'disagrees' ||
                  variant === 'answer-kept' ||
                  variant === 'not-enough-information' ||
                  variant === 'outbound-draft-ready' ||
                  variant === 'waiting-on-prescriber'
                ? 'text-(--text-feedback-warning-base)'
                : 'text-(--text-surface-base)'
            }`}
          >
            {title ?? TITLES[variant]}
          </Text>
          {showTitleLinkIcon && <Icon icon={LinkIcon} size="small" className="text-(--icon-action-hyperlink) shrink-0" />}
        </div>
        {/* Actions are entirely caller-owned: the surrounding feature decides
            what they do and renders the next card state. */}
        {(() => {
          return actions && !collapsed ? (
            <ButtonGroup className="shrink-0">
              {actions}
            </ButtonGroup>
          ) : null
        })()}
        {collapsible && (
          <Button
            variant="tertiary"
            // unpadded — strips tertiary's vertical inset-3 touch-target so
            // the title row's height stays driven by its content, not the
            // button (which was making collapsed cards look bottom-heavy)
            unpadded
            rightIcon={collapsed ? ChevronDownIcon : ChevronUpIcon}
            onClick={() => setCollapsed((v) => !v)}
            aria-expanded={!collapsed}
            className="shrink-0"
          >
            {collapsed ? 'View Details' : 'Hide Details'}
          </Button>
        )}
      </div>

      {/* Expandable body — grid-rows trick animates height fluidly without
          JS measurement: 0fr collapsed → 1fr expanded. The inner wrapper
          keeps content from squishing during the transition. Spacing lives
          on a margin INSIDE the animated region (not the parent gap) so a
          collapsed card doesn't keep a phantom gap below the title row. */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: collapsed ? '0fr' : '1fr' }}
      >
        <div className="overflow-hidden">
          {!collapsed && (
            <div
              className="flex flex-col gap-(--stack-3) mt-(--stack-3)"
              style={{
                paddingLeft: 'calc(var(--space-20) + var(--inline-2))',
                animation: 'judi-fade-in 300ms ease-out',
              }}
            >
          {prescriber && (
            <div className="flex items-center flex-wrap gap-(--inline-2)">
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                {prescriber.name}
              </Text>
              <Divider orientation="vertical" />
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                Fax: ({prescriber.fax})
              </Text>
              <Divider orientation="vertical" />
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                {prescriber.sentAt}
              </Text>
            </div>
          )}

          {metadata}

          {showComparison && (
            <div className="grid grid-cols-2 gap-(--inline-5) w-full">
              <div className="flex flex-col gap-(--stack-1)">
                <Text variant="body-sm" className="text-(--text-surface-subtle)">
                  Judi AI Recommended Answer:
                </Text>
                <Text variant="body-md" weight="semibold" className="text-(--text-feedback-success-base)">
                  {comparison.recommended}
                </Text>
              </div>
              <div className="flex flex-col gap-(--stack-1)">
                <Text variant="body-sm" className="text-(--text-surface-subtle)">
                  Current Answer:
                </Text>
                <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
                  {comparison.current}
                </Text>
              </div>
            </div>
          )}

          <Text as="p" variant="body-md" className="text-(--text-surface-subtle)">
            {typeof summary === 'string'
              ? summary
              : summary.map((segment, segmentIndex) => (
                  <span key={segmentIndex}>
                    {segment.text}
                    {segment.citations?.map((citationNumber) => {
                      const citation = citations?.[citationNumber - 1]
                      if (!citation) return null
                      return (
                        <a
                          key={citationNumber}
                          href={`#ai-citation-${citationNumber}`}
                          onClick={() => showCitation(citationNumber)}
                          aria-label={`Show source ${citationNumber}: ${citation.docType}, page ${citation.pages.join(', ')}`}
                          className="inline-flex no-underline hover:underline text-(--text-action-hyperlink)"
                          style={{
                            marginInlineStart: 'var(--space-2)',
                            verticalAlign: 'super',
                            fontSize: 'var(--label-sm-size)',
                            lineHeight: 'var(--label-sm-line-height)',
                            fontWeight: 'var(--label-sm-weight)',
                          }}
                        >
                          [{citationNumber}]
                        </a>
                      )
                    })}
                  </span>
                ))}
          </Text>

          {citations && citations.length > 0 && (
            <div className="flex flex-col gap-(--stack-3)">
              <div className="flex items-center justify-between gap-(--inline-4)">
                <div className="flex items-center gap-(--inline-2)">
                  <Text variant="body-sm" className="text-(--text-surface-base)">
                    Sources
                  </Text>
                  <span
                    className="inline-flex items-center justify-center rounded-(--radius-sm) px-(--inset-2) py-(--space-2) bg-(--bg-surface-subtle)"
                    style={{ border: '1px solid var(--border-surface-base)' }}
                  >
                    <Text as="span" variant="label-md" className="text-(--text-surface-subtle)">
                      {citations.length}
                    </Text>
                  </span>
                </div>
                <Button
                  variant="tertiary"
                  rightIcon={showCitations ? ChevronUpIcon : ChevronDownIcon}
                  onClick={() => setShowCitations((visible) => !visible)}
                >
                  {showCitations ? 'Hide Citations' : 'Show Citations'}
                </Button>
              </div>

              {showCitations && (
                <div className="flex flex-col gap-(--space-6)">
                  {citations.map((citation, index) => (
                    <Fragment key={index}>
                      {index > 0 && <Divider />}
                      <div id={`ai-citation-${index + 1}`} className="flex flex-col gap-(--stack-2) p-(--inset-5)">
                        <Text variant="body-md" className="text-(--text-surface-subtle)">
                          {citation.excerpt}
                        </Text>
                        <div className="flex items-center justify-between gap-(--inline-4)">
                          <div className="flex flex-1 min-w-0 items-center gap-(--inline-1)">
                            <Icon icon={DocumentIcon} size="small" className="text-(--icon-surface-base) shrink-0" />
                            <div className="flex flex-1 min-w-0 items-center flex-wrap gap-(--inline-2)">
                              <Text variant="body-sm" weight="semibold" className="text-(--text-surface-base)">
                                {citation.docType}
                              </Text>
                              <Divider orientation="vertical" />
                              <Text variant="body-sm" className="text-(--text-surface-subtle)">
                                Page {citation.pages.join(', ')}
                              </Text>
                              <Divider orientation="vertical" />
                              <Text variant="body-sm" className="text-(--text-surface-subtle)">
                                Citation {index + 1}
                              </Text>
                              <Divider orientation="vertical" />
                              <Text variant="body-sm" className="text-(--text-surface-subtle)">
                                {citation.timestamp}
                              </Text>
                            </div>
                          </div>
                          {citation.onViewInDocument && (
                            <Button variant="link" onClick={citation.onViewInDocument} className="shrink-0">
                              View in Document
                            </Button>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Not-enough-information warnings — divider above only; the
              feedback section supplies its own divider below */}
          {variant === 'not-enough-information' && (
            <>
              <Divider />
              <div className="flex flex-col gap-(--stack-3)">
                {WARNING_NOTICES.map((notice) => (
                  <div key={notice} className="flex items-center gap-(--space-6)">
                    <Icon
                      icon={WarningCircleIcon}
                      size="small"
                      className="text-(--icon-surface-base) shrink-0"
                    />
                    <Text variant="body-sm" className="text-(--text-surface-subtle)">
                      {notice}
                    </Text>
                  </div>
                ))}
              </div>
            </>
          )}

          {(showFeedback || (citations && citations.length > 0)) && <Divider />}

          {showFeedback && (
            <div className="flex flex-col gap-(--stack-3)">
              <div className="flex items-center justify-between w-full">
                <Text variant="body-sm" className="text-(--text-surface-base)">
                  Was this helpful?
                </Text>
                <div className="flex items-center gap-(--inline-2)">
                  <button
                    type="button"
                    aria-label="This was helpful"
                    aria-pressed={feedback === 'up'}
                    onClick={() => handleThumb('up')}
                    className="inline-flex items-center justify-center cursor-pointer bg-transparent p-0"
                    style={{ border: 'none' }}
                  >
                    <Icon
                      icon={ThumbsUpIcon}
                      size="small"
                      className={feedback === 'up' ? 'text-(--icon-feedback-success-base)' : 'text-(--icon-surface-base)'}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label="This was not helpful"
                    aria-pressed={feedback === 'down'}
                    onClick={() => handleThumb('down')}
                    className="inline-flex items-center justify-center cursor-pointer bg-transparent p-0"
                    style={{ border: 'none' }}
                  >
                    <Icon
                      icon={ThumbsDownIcon}
                      size="small"
                      className={feedback === 'down' ? 'text-(--icon-feedback-error-base)' : 'text-(--icon-surface-base)'}
                    />
                  </button>
                </div>
              </div>

              {feedback && !submitted && (
                <div className="flex flex-col gap-(--stack-3)">
                  <div className="flex flex-wrap gap-(--space-6)">
                    {(feedback === 'up' ? POSITIVE_REASONS : NEGATIVE_REASONS).map((reason) => (
                      <Chip key={reason} selected={reasons.includes(reason)} onClick={() => toggleReason(reason)}>
                        {reason}
                      </Chip>
                    ))}
                  </div>
                  <Textarea
                    label="Details"
                    required
                    placeholder="Tell us more..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    invalid={attemptedSubmit && !details.trim()}
                    instructions={
                      attemptedSubmit && !details.trim()
                        ? 'Details are required.'
                        : 'Please provide as much information as possible to help us better train our model'
                    }
                  />
                  <Button variant="primary" className="self-start" onClick={handleFeedbackSubmit}>
                    Submit
                  </Button>
                </div>
              )}

              {submitted && (
                <div className="flex items-center gap-(--inline-2)">
                  <Icon icon={CheckCircleIcon} size="regular" className="text-(--icon-feedback-success-base)" />
                  <Text variant="body-md" className="text-(--text-feedback-success-base)">
                    Thank you for the feedback
                  </Text>
                </div>
              )}
              </div>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
