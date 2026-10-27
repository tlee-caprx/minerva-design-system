import { useState } from 'react'
import { Lozenge, Tab, TabSet } from '@judi-health/minerva-ds'
import { DemoRow } from './DemoRow'

export function TabsSection() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="flex flex-col gap-(--stack-5) p-(--inset-7)">
      <DemoRow label="TabSet">
        <TabSet>
          <Tab label="Overview"  selected={activeTab === 'overview'}  onClick={() => setActiveTab('overview')}  rightSlot={<Lozenge count={3} />} />
          <Tab label="Details"   selected={activeTab === 'details'}   onClick={() => setActiveTab('details')}   rightSlot={<Lozenge count={12} />} />
          <Tab label="History"   selected={activeTab === 'history'}   onClick={() => setActiveTab('history')} />
          <Tab label="Documents" selected={activeTab === 'documents'} onClick={() => setActiveTab('documents')} />
        </TabSet>
      </DemoRow>
    </div>
  )
}
