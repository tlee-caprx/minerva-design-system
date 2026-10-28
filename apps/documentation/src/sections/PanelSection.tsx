import { useState } from 'react'
import { MetaItem, Panel, Tab, TabSet, Tag, Text } from '@judi-health/minerva-ds'

function SectionLabel({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-(--stack-3) flex flex-col gap-(--stack-1)">
      <Text as="div" variant="label-lg" className="text-(--text-surface-subtle)">{title}</Text>
      <Text as="div" variant="body-sm" className="text-(--text-surface-subtle)">{description}</Text>
    </div>
  )
}

export function PanelSection() {
  const [activeTab, setActiveTab] = useState<'summary' | 'history' | 'documents'>('summary')

  return (
    <div className="min-h-full flex flex-col gap-(--layout-3)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--stack-4) text-(--text-surface-base)">
          Panel
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          A card for grouping content: surface fill, 1px inside stroke, small shadow, 4px radius, 24px padding.
          Put anything inside; there are no built-in header or footer slots.
        </Text>
      </div>

      <div>
        <SectionLabel title="Panel" description="The default card." />
        <Panel>
          <div className="flex flex-col gap-(--stack-3)">
            <div className="flex items-center gap-(--inline-3)">
              <Text as="h3" variant="heading-sm" className="text-(--text-surface-base)">Case 100385</Text>
              <Tag variant="warning">Pending</Tag>
            </div>
            <Text variant="body-md" className="text-(--text-surface-base)">
              Phentermine HCI 15MG Capsule · Qty: 2 · Days: 28
            </Text>
          </div>
        </Panel>
      </div>

      <div>
        <SectionLabel title="Nested panel" description='variant="nested": subtle fill and no stroke, for grouping content inside a Panel.' />
        <Panel>
          <div className="flex flex-col gap-(--stack-4)">
            <Text as="h3" variant="heading-sm" className="text-(--text-surface-base)">Member</Text>
            <div className="grid grid-cols-2 gap-(--inline-4)">
              <Panel variant="nested">
                <MetaItem label="Name" value="Walter White" />
              </Panel>
              <Panel variant="nested">
                <MetaItem label="Member ID" value="1234567" />
              </Panel>
            </div>
          </div>
        </Panel>
      </div>

      <div>
        <SectionLabel title="Tabbed panel" description="Pass a TabSet as tabs: it sits flush on top of the panel body, and the whole panel keeps its 4px corners." />
        <Panel
          tabs={
            <TabSet>
              <Tab label="Summary" selected={activeTab === 'summary'} onClick={() => setActiveTab('summary')} />
              <Tab label="History" selected={activeTab === 'history'} onClick={() => setActiveTab('history')} />
              <Tab label="Documents" selected={activeTab === 'documents'} onClick={() => setActiveTab('documents')} />
            </TabSet>
          }
        >
          <Text variant="body-md" className="text-(--text-surface-base)">
            {activeTab === 'summary' && 'Initial review requested 01/23/2025. Awaiting pharmacist review.'}
            {activeTab === 'history' && 'Case created 01/23/2025 · Assigned to Skyler White 01/24/2025.'}
            {activeTab === 'documents' && 'Prior authorization form.pdf · Chart notes.pdf'}
          </Text>
        </Panel>
      </div>
    </div>
  )
}
