import { useState } from 'react'
import { Button, Text, Modal, ModalContent } from '@judi-health/minerva-ds'

export function ModalSection() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Modal
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        528px wide, renders through a portal to the document body with a 40%-black
        backdrop. Closes on the X button, backdrop click, or Escape.
      </Text>

      <div className="flex flex-col items-start gap-(--layout-3)">
        <ModalContent
          onClose={() => {}}
          title="Delete case?"
          leftAction={<Button variant="tertiary">Learn more</Button>}
          rightActions={
            <>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary" destructive>Delete</Button>
            </>
          }
        >
          <Text variant="body-md" className="text-(--text-surface-base)">
            This will permanently delete Case #123456 and all associated documents.
            This action cannot be undone.
          </Text>
        </ModalContent>

        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete case?"
        leftAction={<Button variant="tertiary" onClick={() => setOpen(false)}>Learn more</Button>}
        rightActions={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" destructive onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <Text variant="body-md" className="text-(--text-surface-base)">
          This will permanently delete Case #123456 and all associated documents.
          This action cannot be undone.
        </Text>
      </Modal>
    </div>
  )
}
