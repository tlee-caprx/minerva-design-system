import type { CSSProperties } from 'react'
import { PDFViewer } from '@embedpdf/react-pdf-viewer'
import type { PDFViewerConfig } from '@embedpdf/react-pdf-viewer'

export interface DocumentViewerProps {
  /** URL or application path for the PDF document. */
  src: string
  /** EmbedPDF options beyond the document source and default light theme. */
  config?: Omit<PDFViewerConfig, 'src'>
  /** Size the viewer from its host layout; EmbedPDF needs an explicit height. */
  className?: string
  style?: CSSProperties
}

/**
 * Judi's standard PDF viewing surface. It retains EmbedPDF's ready-made UI
 * while providing a consistent light-mode starting point for Judi products.
 */
export function DocumentViewer({ src, config, className = '', style }: DocumentViewerProps) {
  const { theme, ...viewerConfig } = config ?? {}

  return (
    <div className={`overflow-hidden bg-(--bg-surface-base) ${className}`} style={style}>
      <PDFViewer
        className="h-full w-full"
        config={{
          ...viewerConfig,
          src,
          theme: {
            preference: 'light',
            ...theme,
          },
        }}
      />
    </div>
  )
}
