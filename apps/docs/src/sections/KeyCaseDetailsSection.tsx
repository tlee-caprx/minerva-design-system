import { Text } from '@judi-health/minerva-ds'
import { KeyCaseDetails } from '@judi-health/minerva-ds/patterns'

export function KeyCaseDetailsSection() {
  return (
    <div className="min-h-full flex flex-col gap-(--stack-5)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Key Case Details
        </Text>
        <Text as="p" variant="body-md" className="text-(--text-surface-subtle)">
          A collapsible, full-width contextual bar for member, prescriber, drug, origin, and plan-benefit details.
        </Text>
      </div>
      <KeyCaseDetails />
    </div>
  )
}
