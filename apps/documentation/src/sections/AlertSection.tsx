import { Alert, Button, Text, showAlert } from '@judi-health/minerva-ds'
import type { AlertType } from '@judi-health/minerva-ds'
import { DemoRow } from './DemoRow'

const ALERT_TYPES: AlertType[] = ['success', 'warning', 'error', 'general']

const label = (type: AlertType) => `${type.charAt(0).toUpperCase()}${type.slice(1)}`

export function AlertSection() {
  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Alert
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        Temporary feedback over the page. Call showAlert() from an event handler: a banner covers the
        global header with a dismiss button, toasts stack at the top center. Both disappear after 5 seconds.
      </Text>

      <div className="flex flex-col gap-(--stack-5)">
        <DemoRow label="Show a banner">
          {ALERT_TYPES.map((type) => (
            <Button
              key={type}
              variant="secondary"
              onClick={() => showAlert({ type, variant: 'banner', message: `${label(type)} banner message` })}
            >
              {label(type)}
            </Button>
          ))}
        </DemoRow>

        <DemoRow label="Show a toast">
          {ALERT_TYPES.map((type) => (
            <Button
              key={type}
              variant="secondary"
              onClick={() => showAlert({ type, variant: 'toast', message: `${label(type)} toast message` })}
            >
              {label(type)}
            </Button>
          ))}
        </DemoRow>

        <div className="flex flex-col gap-(--stack-2)">
          <Text variant="label-md" className="text-(--text-surface-subtle)">Banner</Text>
          {ALERT_TYPES.map((type) => (
            <Alert key={type} type={type} variant="banner" onClose={() => {}}>
              Message text goes here
            </Alert>
          ))}
        </div>

        <div className="flex flex-col items-start gap-(--stack-2)">
          <Text variant="label-md" className="text-(--text-surface-subtle)">Toast</Text>
          {ALERT_TYPES.map((type) => (
            <Alert key={type} type={type} variant="toast">
              Message text goes here
            </Alert>
          ))}
        </div>
      </div>
    </div>
  )
}
