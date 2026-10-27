import type { ReactNode } from 'react'
import { Button } from '../Button'
import { Text } from '../Text'

export interface NotificationProps {
  /** Heading rendered above the notification content. */
  title?: ReactNode
  /** Content displayed below the notification header. */
  children?: ReactNode
  onMarkAllAsRead?: () => void
  onViewAll?: () => void
  className?: string
}

export function Notification({
  title = 'Notifications',
  children,
  onMarkAllAsRead,
  onViewAll,
  className = '',
}: NotificationProps) {
  return (
    <section className={`w-[400px] rounded-(--radius-sm) bg-(--bg-surface-base) p-(--inset-6) shadow-(--shadow-surface-md) ${className}`}>
      <div className="flex items-center justify-between gap-(--inline-3)">
        <Text as="h2" variant="heading-sm" className="text-(--text-surface-base)">
          {title}
        </Text>
        <div className="flex shrink-0 items-center gap-(--inline-2)">
          <Button variant="tertiary" onClick={onMarkAllAsRead}>
            Mark All As Read
          </Button>
          <Button variant="tertiary" onClick={onViewAll}>
            View All
          </Button>
        </div>
      </div>
      {children && <div className="mt-(--stack-4)">{children}</div>}
    </section>
  )
}
