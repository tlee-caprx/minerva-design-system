import { useState, type ReactNode } from 'react'
import { Button } from '../Button'
import { Collapse } from '../Collapse'
import { AIIcon, AddIcon, HistoryIcon, RemoveIcon } from '../Icon'
import { Tab, TabSet } from '../TabSet'
import { Text } from '../Text'

export interface ClinicalCriteriaTabItem {
  id: string
  label: string
  leftSlot?: ReactNode
}

export interface ClinicalCriteriaItem {
  id: string
  title: string
  content?: ReactNode
  defaultOpen?: boolean
}

export interface ClinicalCriteriaTabProps {
  /** Tabs shown above the criteria content. */
  tabs?: ClinicalCriteriaTabItem[]
  /** Controlled active tab id. */
  activeTab?: string
  /** Initial active tab when uncontrolled. */
  defaultActiveTab?: string
  onTabChange?: (tabId: string) => void
  /** Heading shown above the criteria accordions. */
  versionHistoryLabel?: string
  criteria: ClinicalCriteriaItem[]
  /** Tabs shown in the supporting case-data panel. */
  supportingTabs?: ClinicalCriteriaTabItem[]
  /** Controlled active supporting tab id. */
  activeSupportingTab?: string
  /** Initial active supporting tab when uncontrolled. */
  defaultActiveSupportingTab?: string
  onSupportingTabChange?: (tabId: string) => void
  className?: string
}

const DEFAULT_TABS: ClinicalCriteriaTabItem[] = [
  { id: 'case-details', label: 'Case Details' },
  { id: 'drug-diagnosis', label: 'Drug & Diagnosis' },
  { id: 'test-claim', label: 'Test Claim' },
  { id: 'clinical-criteria', label: 'Clinical Criteria' },
  { id: 'determination', label: 'Determination' },
]

const DEFAULT_SUPPORTING_TABS: ClinicalCriteriaTabItem[] = [
  { id: 'notes', label: 'Notes' },
  { id: 'documents', label: 'Documents' },
  { id: 'communications', label: 'Communications' },
  { id: 'member-history', label: 'Member History' },
  { id: 'ehr-data', label: 'EHR Data' },
  { id: 'case-history', label: 'Case History' },
  { id: 'system-assist', label: 'System Assist', leftSlot: <AIIcon width={14} height={14} /> },
]

export function ClinicalCriteriaTab({
  tabs = DEFAULT_TABS,
  activeTab,
  defaultActiveTab = 'clinical-criteria',
  onTabChange,
  versionHistoryLabel = 'Version History',
  criteria,
  supportingTabs = DEFAULT_SUPPORTING_TABS,
  activeSupportingTab,
  defaultActiveSupportingTab = 'system-assist',
  onSupportingTabChange,
  className = '',
}: ClinicalCriteriaTabProps) {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(defaultActiveTab)
  const [uncontrolledSupportingTab, setUncontrolledSupportingTab] = useState(defaultActiveSupportingTab)
  const [isQuestionOneOpen, setIsQuestionOneOpen] = useState(true)
  const selectedTab = activeTab ?? uncontrolledActiveTab
  const selectedSupportingTab = activeSupportingTab ?? uncontrolledSupportingTab

  const selectTab = (tabId: string) => {
    if (activeTab === undefined) setUncontrolledActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const selectSupportingTab = (tabId: string) => {
    if (activeSupportingTab === undefined) setUncontrolledSupportingTab(tabId)
    onSupportingTabChange?.(tabId)
  }

  return (
    <div className={`flex w-full gap-(--layout-5) ${className}`}>
      <section className="min-w-0 flex-1 bg-(--bg-surface-base)">
        <TabSet>
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.label} selected={tab.id === selectedTab} onClick={() => selectTab(tab.id)} leftSlot={tab.leftSlot} />
          ))}
        </TabSet>

        <div role="tabpanel" className="flex flex-col gap-(--stack-5) p-(--inset-7)">
          <Button variant="tertiary" unpadded leftIcon={HistoryIcon} className="self-start">
            {versionHistoryLabel}
          </Button>

          {criteria.map((criterion) => (
            <Collapse key={criterion.id} style="default" title={criterion.title} defaultOpen={criterion.defaultOpen}>
              {criterion.content ?? null}
            </Collapse>
          ))}
        </div>
      </section>

      <section className="min-w-0 flex-1 bg-(--bg-surface-base)">
        <TabSet>
          {supportingTabs.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              selected={tab.id === selectedSupportingTab}
              onClick={() => selectSupportingTab(tab.id)}
              leftSlot={tab.leftSlot}
            />
          ))}
        </TabSet>

        {selectedSupportingTab === 'system-assist' && (
          <div role="tabpanel" className="p-(--inset-7)">
            <Collapse style="default" title="Acute Migraine Agents Initial Review" defaultOpen>
              <div className="flex flex-col gap-(--stack-4)">
                <Button
                  variant="tertiary"
                  leftIcon={isQuestionOneOpen ? RemoveIcon : AddIcon}
                  aria-expanded={isQuestionOneOpen}
                  onClick={() => setIsQuestionOneOpen((open) => !open)}
                  className="self-start"
                >
                  Question 1
                </Button>
                {isQuestionOneOpen && (
                  <div className="flex flex-col gap-(--stack-4) rounded-(--radius-sm) bg-(--bg-surface-subtle) p-(--inset-7)">
                    <div className="flex flex-col gap-(--stack-1)">
                      <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
                        Is the patient over the age of 18 years old?
                      </Text>
                      <Text variant="body-md" className="text-(--text-surface-base)">
                        Yes
                      </Text>
                    </div>
                    <div className="flex flex-col gap-(--stack-1)">
                      <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
                        Evidence
                      </Text>
                      <Text variant="body-md" className="text-(--text-surface-base)">
                        Patient date of birth is 1990-11-11. As of the current case date of 2026-07-16, the patient is 35 years old, which is over the 18 years of age.
                      </Text>
                    </div>
                    <div className="flex items-center gap-(--inline-1)">
                      <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
                        Extracted from:
                      </Text>
                      <Text variant="body-md" className="text-(--text-surface-base)">
                        Intake Fax, Page 1
                      </Text>
                    </div>
                    <div className="flex items-start gap-(--inline-1)">
                      <Text variant="body-md" weight="semibold" className="shrink-0 text-(--text-surface-base)">
                        Citation:
                      </Text>
                      <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
                        Patient date of birth is 1990-11-11. As of the current case date of 2026-07-16, the patient is 35 years old, which is over the 18 years of age.
                      </Text>
                    </div>
                    <div className="flex items-center gap-(--inline-1)">
                      <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
                        Extracted:
                      </Text>
                      <Text variant="body-md" className="text-(--text-surface-base)">
                        system_extraction @ 7/21/2026 9:30 AM EDT
                      </Text>
                    </div>
                    <div className="flex items-center gap-(--inline-1)">
                      <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
                        Reviewed:
                      </Text>
                      <Text variant="body-md" className="text-(--text-surface-base)">
                        not reviewed
                      </Text>
                    </div>
                  </div>
                )}
              </div>
            </Collapse>
          </div>
        )}
      </section>
    </div>
  )
}
