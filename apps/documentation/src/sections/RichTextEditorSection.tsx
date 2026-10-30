import { useState } from 'react'
import { Text } from '@judi-health/minerva-ds'
import { RichTextEditor } from '@judi-health/minerva-ds/rich-text-editor'

const SAMPLE =
  '<p>Lorem ipsum dolor sit <s>amet consectetur</s>. Aliquet id orci <strong>bibendum dolor</strong>. ' +
  'Quis lacus id <em>quis ipsum</em> quam <a href="https://www.judi.health">aliquam aenean</a>.</p>'

export function RichTextEditorSection() {
  const [notes, setNotes] = useState(SAMPLE)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Rich Text Editor
      </Text>

      <Text as="div" variant="body-sm" className="mb-(--layout-3) text-(--text-surface-subtle)">
        Bold, italic, underline, strikethrough, lists and links. Value is HTML. Imported from
        @judi-health/minerva-ds/rich-text-editor so prototypes that don't use it skip its editor engine.
        Select text and click the link button, or put the cursor in a link to edit or remove it.
      </Text>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(calc(var(--space-40)*7),1fr))] gap-(--layout-2)">
        <div className="flex flex-col gap-(--stack-2)">
          <RichTextEditor label="Label" required tooltip="Helpful context goes here" value={notes} onChange={setNotes} />
          <Text variant="label-md" className="text-(--text-surface-subtle)">HTML output</Text>
          <Text as="code" variant="body-sm" className="block break-all text-(--text-surface-subtle)">{notes || '(empty)'}</Text>
        </div>
        <RichTextEditor
          label="Label"
          required
          tooltip="Helpful context goes here"
          placeholder="Add notes for the reviewer"
          instructions="Helper text goes here."
        />
        <RichTextEditor label="Label" required tooltip="Helpful context goes here" defaultValue={SAMPLE} invalid instructions="Invalid text goes here" />
        <RichTextEditor label="Label" required tooltip="Helpful context goes here" invalid instructions="Invalid text goes here" />
        <RichTextEditor label="Label" required tooltip="Helpful context goes here" defaultValue={SAMPLE} readOnly />
        <RichTextEditor label="Label" required tooltip="Helpful context goes here" readOnly />
        <RichTextEditor label="Label" required tooltip="Helpful context goes here" disabled />
      </div>
    </div>
  )
}
