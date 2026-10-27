import { useState } from 'react'
import { DocumentViewer } from '../../components/ui/DocumentViewer'
import { Tab, TabSet } from '../../components/ui/TabSet'

export interface TapCaseFilesPanelProps {
  recommendation: 'approval' | 'denial'
}

/** Case artifacts are grouped behind the document utility so the decision canvas stays focused. */
export function TapCaseFilesPanel({ recommendation }: TapCaseFilesPanelProps) {
  const [activeTab, setActiveTab] = useState<'documents' | 'letter'>('documents')
  const letterSource = recommendation === 'approval'
    ? '/letters/approval-letter-preview.pdf'
    : '/letters/denial-letter-preview.pdf'

  return (
    <aside aria-label="Case files" className="flex h-full min-h-0 flex-col bg-(--bg-surface-base)">
      <TabSet>
        <Tab label="Documents" selected={activeTab === 'documents'} onClick={() => setActiveTab('documents')} />
        <Tab label="Letter" selected={activeTab === 'letter'} onClick={() => setActiveTab('letter')} />
      </TabSet>

      {activeTab === 'documents' ? (
        <DocumentViewer
          key="case-documents"
          src="https://snippet.embedpdf.com/ebook.pdf"
          config={{ tabBar: 'never' }}
          className="min-h-0 flex-1"
        />
      ) : (
        <DocumentViewer
          key={`determination-letter-${recommendation}`}
          src={letterSource}
          config={{ tabBar: 'never' }}
          className="min-h-0 flex-1"
        />
      )}
    </aside>
  )
}
