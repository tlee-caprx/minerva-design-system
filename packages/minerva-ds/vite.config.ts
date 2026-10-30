import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

// Anything listed as a dependency or peer stays an import in the output so the
// consumer's bundler resolves a single copy (React especially).
const externals = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]

export default defineConfig({
  plugins: [
    react(),
    dts({
      include:      ['src'],
      exclude:      ['src/tokens/buildCss.ts'],
      entryRoot:    'src',
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: {
        index:    resolve(__dirname, 'src/index.ts'),
        patterns: resolve(__dirname, 'src/patterns/index.ts'),
        'document-viewer': resolve(__dirname, 'src/patterns/DocumentViewer/index.ts'),
        'rich-text-editor': resolve(__dirname, 'src/patterns/RichTextEditor/index.ts'),
        tokens:   resolve(__dirname, 'src/tokens/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => externals.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        // Keep one file per module so the dist stays readable and scannable by
        // Tailwind's @source in consuming apps.
        preserveModules:     true,
        preserveModulesRoot: 'src',
        entryFileNames:      '[name].js',
      },
    },
  },
})
