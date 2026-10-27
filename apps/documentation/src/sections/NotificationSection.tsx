import { Button, Tag, Text, Notification } from '@judi-health/minerva-ds'

export function NotificationSection() {
  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Notification
      </Text>
      <div className="bg-(--bg-surface-subtle) p-(--inset-7)">
        <Notification>
          <div className="flex flex-col gap-(--stack-2) px-(--inset-3) py-(--inset-6)">
            <div className="flex flex-col gap-(--stack-1)">
              <div className="flex items-center gap-(--inline-1)">
                <Text variant="body-sm" weight="semibold" className="text-(--text-surface-base)">
                  01/01/2026 02:41PM EST
                </Text>
                <span aria-label="Unread" className="h-(--space-8) w-(--space-8) rounded-(--radius-full) bg-(--bg-action-primary-idle)" />
              </div>
              <Tag variant="system" className="self-start">Judi AI</Tag>
            </div>
            <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">
              Judi AI has completed work on Case #123456
            </Text>
            <Text variant="body-md" className="text-(--text-surface-base)">
              Work on Case #123456 is done and the case locked back to you. Please review and take a look at the changes.
            </Text>
            <div className="flex items-center gap-(--inline-2)">
              <Button variant="link">Mark As Read</Button>
              <Button variant="link">Open</Button>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  )
}
