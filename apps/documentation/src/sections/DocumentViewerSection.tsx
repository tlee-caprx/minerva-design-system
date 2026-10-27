import { Text } from '@judi-health/minerva-ds'
import { DocumentViewer } from '@judi-health/minerva-ds/document-viewer'

export function DocumentViewerSection() {
  return (
    <div className="min-h-full flex flex-col gap-(--stack-5)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Document Viewer
        </Text>
        <Text as="p" variant="body-md" className="text-(--text-surface-subtle)">
          A Judi wrapper around EmbedPDF’s ready-made viewer UI. It defaults to light mode and can be used in a utility panel, modal, or full-page document experience.
        </Text>
      </div>
      <DocumentViewer
        src="https://snippet.embedpdf.com/ebook.pdf"
        config={{ tabBar: 'never' }}
        className="h-[640px]"
      />
    </div>
  )
}
