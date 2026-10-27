import { Button, Text, Message, Icon, AIIcon } from '@judi-health/minerva-ds'
import type { MessageVariant } from '@judi-health/minerva-ds'

const MESSAGE_VARIANTS: MessageVariant[] = ['informational', 'error', 'warning', 'success']

export function MessageSection() {
  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Message
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        Icon, content (optional header + body), optional action — 8px between each. Pass a custom icon when the message needs a contextual visual, such as Judi AI.
        Pass a `Button variant="tertiary" unpadded` for the action so it sits flush
        at exactly the text's line-height.
      </Text>

      <div className="flex flex-col gap-(--stack-4) max-w-[560px]">
        {MESSAGE_VARIANTS.map((variant) => (
          <Message
            key={variant}
            variant={variant}
            header={`${variant.charAt(0).toUpperCase()}${variant.slice(1)} message`}
            action={
              <Button variant="tertiary" unpadded>
                Action
              </Button>
            }
          >
            This is the body text for a {variant} message — it explains the context
            or next step in a bit more detail than the header alone.
          </Message>
        ))}

        <Message
          variant="informational"
          icon={AIIcon}
          ai
          header="AI message"
          action={<Button variant="tertiary" unpadded>Action</Button>}
        >
          An AI-specific message can reuse the informational treatment with the Judi AI icon.
        </Message>

        <Message variant="informational">
          Messages work without a header too — just icon, body text, and optional action.
        </Message>
      </div>
    </div>
  )
}
