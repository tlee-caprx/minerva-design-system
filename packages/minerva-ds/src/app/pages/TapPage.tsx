import { useEffect, useRef, useState, type SVGProps } from 'react'
import { AppLayout } from '../../components/layout/AppLayout'
import { Button } from '../../components/ui/Button'
import { ButtonGroup } from '../../components/ui/ButtonGroup'
import { Tag } from '../../components/ui/Tag'
import { SideNavItem } from '../../components/navigation/SideNav'
import { AIIcon, CheckCircleIcon, DocumentIcon, Icon, LinkOutIcon, WarningCircleIcon, XCircleIcon } from '../../components/ui/Icon'
import { Message } from '../../components/ui/Message'
import { Modal } from '../../components/ui/Modal'
import { Radio } from '../../components/ui/Radio'
import { Text } from '../../components/ui/Text'
import { Divider } from '../../components/ui/Divider'
import { Textarea } from '../../components/ui/Input'
import { TAP_CASES, type TapClinicalCriterion } from '../tap/cases'
import { TapAssistantPanel } from '../tap/TapAssistantPanel'
import { TapCaseFilesPanel } from '../tap/TapCaseFilesPanel'

const CRITERION_STATUS_STYLES = {
  met: {
    icon: CheckCircleIcon,
    className: 'text-(--icon-feedback-success-base)',
  },
  review: {
    icon: WarningCircleIcon,
    className: 'text-(--icon-feedback-warning-base)',
  },
  'not-met': {
    icon: XCircleIcon,
    className: 'text-(--icon-feedback-error-base)',
  },
} as const

const ESCALATION_REASONS = [
  'Additional information is needed',
  'Case information is conflicting or unreliable',
  'Ineligible for TAP',
  'Other',
] as const

const WIDE_DOCUMENT_VIEW = '(min-width: 1280px)'

type EscalationReason = typeof ESCALATION_REASONS[number]

function ClinicalCriterionRow({ criterion }: { criterion: TapClinicalCriterion }) {
  const status = CRITERION_STATUS_STYLES[criterion.status]
  const [isAssessing, setIsAssessing] = useState(false)
  const [assessmentRecorded, setAssessmentRecorded] = useState(false)
  const [assessment, setAssessment] = useState('')
  const [showAssessmentError, setShowAssessmentError] = useState(false)

  const submitAssessment = () => {
    if (!assessment.trim()) {
      setShowAssessmentError(true)
      return
    }

    setShowAssessmentError(false)
    setIsAssessing(false)
    setAssessmentRecorded(true)
  }

  const cancelAssessment = () => {
    setAssessment('')
    setShowAssessmentError(false)
    setIsAssessing(false)
  }

  const undoAssessment = () => {
    setAssessment('')
    setAssessmentRecorded(false)
  }

  return (
    <div className="grid grid-cols-[var(--space-20)_minmax(0,1fr)] items-start gap-x-(--inline-4) gap-y-(--stack-4) p-(--inset-5)">
      <Icon icon={status.icon} size="regular" className={`self-center shrink-0 ${status.className}`} />
      <div className="flex min-w-0 flex-col gap-(--stack-1)">
        <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
          {criterion.title}
        </Text>
        <div className="flex flex-wrap items-baseline gap-x-(--inline-2) gap-y-(--stack-1)">
          <Text variant="body-sm" className="text-(--text-surface-subtle)">
            Evidence: {criterion.evidence}
          </Text>
          {criterion.source && (
            <span className="inline-flex items-baseline gap-(--inline-1)">
              <a href="#clinical-criteria-sources" className="text-(--text-action-hyperlink) underline">
                <Text variant="body-sm">{criterion.source}</Text>
              </a>
              {criterion.citations?.map((citation) => (
                <a
                  key={citation}
                  href={`#clinical-criteria-source-${citation}`}
                  className="text-(--text-action-hyperlink) underline"
                >
                  <Text variant="body-sm">[{citation}]</Text>
                </a>
              ))}
            </span>
          )}
        </div>
      </div>

      {criterion.aiReview && (
        <div className="col-start-2 flex flex-col gap-(--stack-3)">
          <Message variant="warning">
            {criterion.aiReview}
          </Message>
          {assessmentRecorded ? (
            <div className="flex items-center gap-(--inline-2)">
              <Icon icon={CheckCircleIcon} size="regular" className="text-(--icon-feedback-success-base)" />
              <Text variant="body-md" weight="semibold" className="text-(--text-feedback-success-base)">
                Assessment Recorded
              </Text>
              <Button variant="link" onClick={undoAssessment}>Undo</Button>
            </div>
          ) : isAssessing ? (
            <div className="flex flex-col gap-(--stack-3)">
              <Textarea
                label="Assessment"
                required
                placeholder="Describe your review and whether you agree with Judi AI’s assessment."
                value={assessment}
                onChange={(event) => {
                  setAssessment(event.target.value)
                  if (showAssessmentError) setShowAssessmentError(false)
                }}
                invalid={showAssessmentError}
                instructions={showAssessmentError ? 'Enter an assessment before submitting.' : undefined}
              />
              <ButtonGroup>
                <Button variant="primary" onClick={submitAssessment}>Submit Assessment</Button>
                <Button variant="tertiary" onClick={cancelAssessment}>Cancel</Button>
              </ButtonGroup>
            </div>
          ) : (
            <ButtonGroup>
              <Button variant="secondary">Review Evidence</Button>
              <Button variant="tertiary" onClick={() => setIsAssessing(true)}>Record Assessment</Button>
            </ButtonGroup>
          )}
        </div>
      )}
    </div>
  )
}

function RailAIIcon(props: SVGProps<SVGSVGElement>) {
  return <AIIcon tinted {...props} />
}

export interface TapPageProps {
  onExit: () => void
}

export function TapPage({ onExit }: TapPageProps) {
  const [caseIndex, setCaseIndex] = useState(0)
  const [utilityMode, setUtilityMode] = useState<'documents' | 'ai' | null>(() =>
    typeof window !== 'undefined' && window.matchMedia(WIDE_DOCUMENT_VIEW).matches ? 'documents' : null
  )
  const hasChosenUtilityMode = useRef(false)
  const [hasOpenedAssistant, setHasOpenedAssistant] = useState(false)
  const [isEscalationOpen, setIsEscalationOpen] = useState(false)
  const [escalationReason, setEscalationReason] = useState<EscalationReason | null>(null)
  const [escalationExplanation, setEscalationExplanation] = useState('')
  const [showEscalationErrors, setShowEscalationErrors] = useState(false)
  const activeCase = TAP_CASES[caseIndex]
  const advanceCase = () => setCaseIndex((index) => (index + 1) % TAP_CASES.length)

  useEffect(() => {
    const viewport = window.matchMedia(WIDE_DOCUMENT_VIEW)
    const handleViewportChange = () => {
      if (!viewport.matches) {
        setUtilityMode((mode) => (mode === 'documents' ? null : mode))
      } else if (!hasChosenUtilityMode.current) {
        setUtilityMode((mode) => mode ?? 'documents')
      }
    }

    viewport.addEventListener('change', handleViewportChange)
    return () => viewport.removeEventListener('change', handleViewportChange)
  }, [])

  const closeEscalation = () => {
    setIsEscalationOpen(false)
    setEscalationReason(null)
    setEscalationExplanation('')
    setShowEscalationErrors(false)
  }

  const submitEscalation = () => {
    if (!escalationReason || !escalationExplanation.trim()) {
      setShowEscalationErrors(true)
      return
    }

    closeEscalation()
  }

  return (
    <AppLayout
      appName="TAP"
      title={`Case ID ${activeCase.id}`}
      titleMeta={<Tag variant="error">Urgent</Tag>}
      rightPanelOpen={utilityMode !== null}
      rightPanelContent={
        <>
          {hasOpenedAssistant && (
            <div className={utilityMode === 'ai' ? 'h-full' : 'hidden'}>
              <TapAssistantPanel key={activeCase.id} caseData={activeCase} onClose={() => {
                hasChosenUtilityMode.current = true
                setUtilityMode(null)
              }} />
            </div>
          )}
          {utilityMode === 'documents' && <TapCaseFilesPanel recommendation={activeCase.recommendation} />}
        </>
      }
      rightUtilityContent={
        <>
          <SideNavItem
            label="Documents"
            icon={DocumentIcon}
            compact
            active={utilityMode === 'documents'}
            onClick={() => {
              hasChosenUtilityMode.current = true
              setUtilityMode((mode) => (mode === 'documents' ? null : 'documents'))
            }}
          />
          <SideNavItem
            label="Judi AI"
            icon={RailAIIcon}
            compact
            active={utilityMode === 'ai'}
            onClick={() => {
              hasChosenUtilityMode.current = true
              setHasOpenedAssistant(true)
              setUtilityMode((mode) => (mode === 'ai' ? null : 'ai'))
            }}
          />
        </>
      }
      actions={
        <ButtonGroup>
          <Button variant="tertiary" onClick={onExit}>Exit</Button>
          <Button variant="secondary" onClick={() => setIsEscalationOpen(true)}>Escalate</Button>
          <Button variant="secondary" onClick={advanceCase}>Override</Button>
          <Button variant="primary" onClick={advanceCase}>Confirm</Button>
        </ButtonGroup>
      }
    >
      <div className="flex flex-col gap-(--layout-2)">
        <Message
          variant={activeCase.recommendation === 'approval' ? 'success' : 'error'}
          header={`Judi AI Recommends ${activeCase.recommendation === 'approval' ? 'Approval' : 'Denial'}`}
        >
          {activeCase.recommendationSummary}
        </Message>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,32rem),1fr))] items-stretch gap-(--inline-4)">
          <section
            aria-label="Member"
            className="h-full rounded-(--radius-md) bg-(--bg-surface-base) p-(--inset-7) shadow-[inset_0_0_0_var(--space-1)_var(--border-surface-base)]"
          >
          <div className="flex flex-col gap-(--stack-3)">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-(--inline-3)">
              <div className="flex min-w-0 items-center gap-(--inline-3)">
                <Text as="h2" variant="heading-xs" className="min-w-0 truncate whitespace-nowrap text-(--text-surface-base)">
                  {activeCase.member.name}
                </Text>
                <div className="flex min-w-0 flex-1 items-center gap-(--inline-1)">
                  <Tag variant="success" className="min-w-0 max-w-1/2 shrink truncate whitespace-nowrap">{activeCase.member.status}</Tag>
                  <Tag variant="system-alt" className="min-w-0 max-w-1/2 shrink truncate whitespace-nowrap">{activeCase.member.role}</Tag>
                </div>
              </div>
              <Button variant="tertiary" iconOnly aria-label="Open member details">
                <Icon icon={LinkOutIcon} className="text-(--icon-action-hyperlink)" />
              </Button>
            </div>

            <dl className="flex flex-col gap-(--stack-4)">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-(--inline-4) gap-y-(--stack-3)">
                <div className="flex flex-col gap-(--stack-1)">
                  <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">DOB/AGE</Text>
                  <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">{activeCase.member.dateOfBirthAndAge}</Text>
                </div>
                <div className="flex flex-col gap-(--stack-1)">
                  <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">GENDER</Text>
                  <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">{activeCase.member.gender}</Text>
                </div>
                <div className="flex flex-col gap-(--stack-1)">
                  <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">PHONE</Text>
                  <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">{activeCase.member.phone}</Text>
                </div>
                <div className="flex flex-col gap-(--stack-1)">
                  <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">MEMBER ID</Text>
                  <dd className="m-0">
                    <button type="button" className="inline text-left bg-transparent p-0 text-(--text-action-hyperlink)">
                      <Text variant="body-md" underline>{activeCase.member.memberId}</Text>
                      <Icon icon={LinkOutIcon} size="small" className="ml-(--inline-1) inline-block align-middle text-(--icon-action-hyperlink)" />
                    </button>
                  </dd>
                </div>
              </div>

              <div className="flex flex-col gap-(--stack-1)">
                <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">ADDRESS</Text>
                <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">{activeCase.member.address}</Text>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-(--inline-4)">
                <div className="flex flex-col gap-(--stack-1)">
                  <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">PLAN</Text>
                  <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">{activeCase.member.plan}</Text>
                </div>
                <div className="flex flex-col gap-(--stack-1)">
                  <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">FORMULARY</Text>
                  <dd className="m-0">
                    <button type="button" className="inline text-left bg-transparent p-0 text-(--text-action-hyperlink)">
                      <Text variant="body-md" underline>{activeCase.member.formulary}</Text>
                      <Icon icon={LinkOutIcon} size="small" className="ml-(--inline-1) inline-block align-middle text-(--icon-action-hyperlink)" />
                    </button>
                  </dd>
                </div>
              </div>

              <div className="flex flex-col gap-(--stack-1)">
                <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">PLAN BENEFIT</Text>
                <dd className="m-0">
                  <button type="button" className="inline text-left bg-transparent p-0 text-(--text-action-hyperlink)">
                    <Text variant="body-md" underline>{activeCase.member.planBenefit}</Text>
                    <Icon icon={LinkOutIcon} size="small" className="ml-(--inline-1) inline-block align-middle text-(--icon-action-hyperlink)" />
                  </button>
                </dd>
              </div>
            </dl>
            </div>
          </section>
          <aside
            aria-label="Requested drug"
            className="h-full rounded-(--radius-md) bg-(--bg-surface-base) p-(--inset-7) shadow-[inset_0_0_0_var(--space-1)_var(--border-surface-base)]"
          >
          <div className="flex flex-col gap-(--stack-3)">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-(--inline-3)">
              <Text as="h2" variant="heading-xs" className="min-w-0 text-(--text-surface-base)">
                {activeCase.requestedDrug.name} {activeCase.requestedDrug.quantityDaysSupply.replace('Qty/DS: ', '')}
              </Text>
              <Button variant="tertiary" iconOnly aria-label="Open requested drug details">
                <Icon icon={LinkOutIcon} className="text-(--icon-action-hyperlink)" />
              </Button>
            </div>

            <dl className="flex flex-col gap-(--stack-4)">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-x-(--inline-4) gap-y-(--stack-3)">
              <div className="flex flex-col gap-(--stack-1)">
                <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">NDC</Text>
                <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">{activeCase.requestedDrug.ndc}</Text>
              </div>
              <div className="flex flex-col gap-(--stack-1)">
                <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">GPI</Text>
                <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">{activeCase.requestedDrug.gpi}</Text>
              </div>
              <div className="flex flex-col gap-(--stack-1)">
                <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">MSC</Text>
                <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">{activeCase.requestedDrug.msc}</Text>
              </div>
            </div>

            <div className="flex flex-col gap-(--stack-1)">
              <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">DIAGNOSIS</Text>
              <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">{activeCase.diagnosis}</Text>
            </div>

            <div className="flex flex-col gap-(--stack-1)">
              <Text as="dt" variant="tag-label" className="text-(--text-surface-subtle)">INSTRUCTIONS</Text>
              <Text as="dd" variant="body-md" className="m-0 text-(--text-surface-base)">
                {activeCase.requestedDrug.instructions}
              </Text>
            </div>
          </dl>
          </div>
          </aside>
        </div>

        <section
          aria-labelledby="clinical-criteria-heading"
          className="rounded-(--radius-md) bg-(--bg-surface-base) p-(--inset-7) shadow-[inset_0_0_0_var(--space-1)_var(--border-surface-base)]"
        >
          <div className="flex flex-col gap-(--stack-4)">
            <div className="flex flex-col gap-(--stack-1)">
              <Text id="clinical-criteria-heading" as="h2" variant="heading-xs" className="text-(--text-surface-base)">
                Clinical Criteria
              </Text>
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                Criteria guidelines for {activeCase.clinicalCriteriaName}
              </Text>
            </div>

            <Message
              variant="informational"
              icon={AIIcon}
              ai
              header={activeCase.clinicalCriteria.some((criterion) => criterion.status === 'review') ? 'Clinical review required' : 'Judi AI criteria assessment'}
            >
              {activeCase.clinicalCriteriaSummary}
            </Message>

            <div id="clinical-criteria-sources" className="flex flex-col">
              {activeCase.clinicalCriteria.map((criterion, index) => (
                <div id={`tap-criterion-${activeCase.id}-${index + 1}`} key={`${activeCase.id}-${criterion.title}`}>
                  <ClinicalCriterionRow criterion={criterion} />
                  {index < activeCase.clinicalCriteria.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Modal
        open={isEscalationOpen}
        onClose={closeEscalation}
        title="Escalate Case"
        leftAction={<Button variant="tertiary" onClick={closeEscalation}>Cancel</Button>}
        rightActions={<Button variant="primary" onClick={submitEscalation}>Escalate</Button>}
      >
        <div className="flex flex-col gap-(--stack-5)">
          <Text variant="body-md" className="text-(--text-surface-subtle)">
            Send this case to PAT for additional review.
          </Text>
          <fieldset className="flex flex-col gap-(--stack-3)">
            <legend>
              <Text variant="label-md" className="text-(--text-control-label-idle)">
                Reason
              </Text>
            </legend>
            <div className="flex flex-col gap-(--stack-3)">
              {ESCALATION_REASONS.map((reason) => (
                <Radio
                  key={reason}
                  name="escalation-reason"
                  label={reason}
                  checked={escalationReason === reason}
                  onChange={() => {
                    setEscalationReason(reason)
                    if (showEscalationErrors) setShowEscalationErrors(false)
                  }}
                />
              ))}
            </div>
            {showEscalationErrors && !escalationReason && (
              <Text variant="body-sm" className="mt-(--stack-1) text-(--text-feedback-error-base)">
                Select a reason before sending the case to PAT.
              </Text>
            )}
          </fieldset>
          <Textarea
            label="Explanation"
            required
            placeholder="Explain why this case should be sent to PAT."
            value={escalationExplanation}
            onChange={(event) => {
              setEscalationExplanation(event.target.value)
              if (showEscalationErrors) setShowEscalationErrors(false)
            }}
            invalid={showEscalationErrors && !escalationExplanation.trim()}
            instructions={showEscalationErrors && !escalationExplanation.trim() ? 'Enter an explanation before sending the case to PAT.' : undefined}
          />
        </div>
      </Modal>
    </AppLayout>
  )
}

