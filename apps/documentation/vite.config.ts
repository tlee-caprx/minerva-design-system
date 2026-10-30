import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Resolve the design system from source so edits to packages/minerva-ds hot
// reload here without a rebuild. Designers outside this repo use the built package.
const ds = resolve(import.meta.dirname, '../../packages/minerva-ds/src')

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: /^@judi-health\/minerva-ds$/,          replacement: `${ds}/index.ts` },
      { find: /^@judi-health\/minerva-ds\/patterns$/, replacement: `${ds}/patterns/index.ts` },
      { find: /^@judi-health\/minerva-ds\/document-viewer$/, replacement: `${ds}/patterns/DocumentViewer/index.ts` },
      { find: /^@judi-health\/minerva-ds\/rich-text-editor$/, replacement: `${ds}/patterns/RichTextEditor/index.ts` },
      { find: /^@judi-health\/minerva-ds\/tokens$/,   replacement: `${ds}/tokens/index.ts` },
    ],
  },
})
