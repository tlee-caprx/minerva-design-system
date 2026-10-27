import { useState } from 'react'
import { Button, Text, Checkbox, Collapse, Modal } from '@judi-health/minerva-ds'
import type { CollapseStyle } from '@judi-health/minerva-ds'

const COLLAPSE_STYLES: CollapseStyle[] = ['default', 'underline', 'blank', 'underline-flush', 'blank-flush', 'unpadded']

export function CollapseSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Collapse
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        Two independent props: `style` (stroke/radius/padding treatment) and `trigger`
        (chevron vs. checkbox). Header is one clickable/keyboard-operable trigger —
        actions on the right stop propagation so they don't toggle it.
      </Text>

      <div className="flex flex-col gap-(--stack-5) max-w-[560px]">
        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            Style variants (chevron trigger)
          </Text>
          <div className="flex flex-col gap-(--stack-4)">
            {COLLAPSE_STYLES.map((style) => (
              <Collapse key={style} style={style} title={`${style} — click to expand`} defaultOpen={style === 'default'}>
                <Text variant="body-md" className="text-(--text-surface-subtle)">
                  This is the body content for the "{style}" style. It can contain any
                  content — text, buttons, forms, whatever the consumer needs.
                </Text>
              </Collapse>
            ))}
          </div>
        </div>

        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            Checkbox trigger
          </Text>
          <div className="flex flex-col gap-(--stack-4)">
            <Collapse style="default" trigger="checkbox" title="Default, checkbox trigger" defaultOpen>
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                The checkbox is a visual-only state indicator — the whole header is
                still the single click/keyboard target, same as the chevron variant.
              </Text>
            </Collapse>
            <Collapse style="unpadded" trigger="checkbox" title="Unpadded, checkbox trigger">
              <Text variant="body-md" className="text-(--text-surface-subtle)">
                Unpadded body content — 16px top/bottom, no left/right padding.
              </Text>
            </Collapse>
          </div>
        </div>

        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            With header actions
          </Text>
          <Collapse
            style="default"
            title="Section with actions"
            actions={
              <Button variant="tertiary" onClick={() => setModalOpen(true)}>
                Action
              </Button>
            }
          >
            <Text variant="body-md" className="text-(--text-surface-subtle)">
              Clicking "Action" above does not toggle this section open/closed — it
              stops propagation before it reaches the header's click handler. It opens
              the Modal component instead.
            </Text>
          </Collapse>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Modal title"
          leftAction={<Button variant="tertiary" onClick={() => setModalOpen(false)}>Tertiary</Button>}
          rightActions={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Secondary</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>Primary</Button>
            </>
          }
        >
          <Text variant="body-md" className="text-(--text-surface-base)">
            This modal was opened from the "Action" button inside the Collapse demo above.
          </Text>
        </Modal>
      </div>
    </div>
  )
}
