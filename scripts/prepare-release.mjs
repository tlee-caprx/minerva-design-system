// Stages the built @judi-health/minerva-ds package into a standalone folder
// whose root is the package itself. That folder becomes the `release` branch,
// which is what designers install with:
//
//   npm install github:tlee-caprx/minerva-design-system#release
//
// npm can't install a subfolder of a git repo, so the package has to live at
// the root of whatever ref is installed. Run `npm run build` first.
//
// Usage: node scripts/prepare-release.mjs <outDir>

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const pkgDir = resolve(import.meta.dirname, '../packages/minerva-ds')
const outDir = resolve(process.argv[2] ?? 'release')

if (!existsSync(join(pkgDir, 'dist/index.js'))) {
  console.error('packages/minerva-ds/dist is missing — run `npm run build` first.')
  process.exit(1)
}

const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))

// Consumers only need runtime metadata. Dropping scripts and devDependencies
// keeps npm from trying to rebuild the package on install.
delete pkg.scripts
delete pkg.devDependencies

for (const entry of readdirSafe(outDir)) {
  if (entry !== '.git') rmSync(join(outDir, entry), { recursive: true, force: true })
}
mkdirSync(outDir, { recursive: true })

for (const file of pkg.files) cpSync(join(pkgDir, file), join(outDir, file), { recursive: true })
cpSync(join(pkgDir, 'README.md'), join(outDir, 'README.md'))
writeFileSync(join(outDir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')

console.log(`Staged ${pkg.name}@${pkg.version} in ${outDir}`)

function readdirSafe(dir) {
  try {
    return existsSync(dir) ? readdirSync(dir) : []
  } catch {
    return []
  }
}
