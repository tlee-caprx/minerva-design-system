import { Text, Tooltip, TooltipBubble, Icon, InfoCircleIcon } from '@judi-health/minerva-ds'
import type { TooltipBeak } from '@judi-health/minerva-ds'

const TOOLTIP_BEAKS: TooltipBeak[] = ['top', 'bottom', 'left', 'right', 'none']

export function TooltipSection() {
  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Tooltip
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        Wraps any trigger element. Shows on hover and focus (keyboard accessible),
        with `role="tooltip"` + `aria-describedby` wired up. `beak` controls which
        edge the arrow protrudes from — the tooltip sits on the opposite side.
      </Text>

      <div className="flex flex-wrap gap-(--layout-3) mb-(--layout-3)">
        {TOOLTIP_BEAKS.map((beak) => (
          <div key={beak} className="flex flex-col items-start gap-(--stack-3) p-(--inset-6)">
            <Text variant="label-md" className="text-(--text-surface-subtle)">
              beak: {beak}
            </Text>
            <TooltipBubble content={`This is a tooltip with beak="${beak}".`} beak={beak} />
          </div>
        ))}
      </div>

      <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
        Interactive (hover or focus the icon)
      </Text>
      <div className="flex flex-wrap items-center gap-(--layout-3)">
        {TOOLTIP_BEAKS.map((beak) => (
          <div key={beak} className="inline-flex items-center gap-(--inline-1)">
            <Text variant="body-md" className="text-(--text-surface-base)">
              {beak}
            </Text>
            <Tooltip
              content="This is a tooltip with a bit more text in it, to check wrapping behavior at the max width."
              beak={beak}
            >
              <span tabIndex={0}>
                <Icon icon={InfoCircleIcon} size="small" className="text-(--icon-surface-base)" />
              </span>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  )
}
