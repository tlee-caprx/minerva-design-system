import { Steps, Text } from '@judi-health/minerva-ds'

export function StepperSection() {
  return (
    <div className="min-h-full flex flex-col gap-(--stack-5)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--space-4) text-(--text-surface-base)">
          Stepper
        </Text>
        <Text as="p" variant="body-md" className="text-(--text-surface-subtle)">
          Shows case progress. Active steps can return to a completed stage; future steps remain unavailable.
        </Text>
      </div>

      <div className="bg-(--bg-surface-base) p-(--inset-7)">
        <Steps
          steps={[
            { label: 'Intake', active: true, onClick: () => {} },
            { label: 'Review', active: true, onClick: () => {} },
            { label: 'Decision', active: false },
            { label: 'Close', active: false },
          ]}
        />
      </div>
    </div>
  )
}
