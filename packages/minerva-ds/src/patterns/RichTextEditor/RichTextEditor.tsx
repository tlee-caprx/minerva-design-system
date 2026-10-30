import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import { FieldWrapper } from '../../components/ui/FieldWrapper'
import {
  BoldIcon, ItalicIcon, LinkIcon, ListOlIcon, ListUlIcon, StrikethroughIcon, UnderlineIcon,
} from '../../components/ui/Icon'
import { LinkPanel } from './LinkPanel'
import { ToolbarButton } from './ToolbarButton'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RichTextEditorProps {
  /** Label rendered above the field */
  label?: ReactNode
  /** Shows a required asterisk after the label */
  required?: boolean
  /** Shows an info icon after the label with a Tooltip on hover/focus */
  tooltip?: string
  /** Helper text rendered below the field */
  instructions?: ReactNode
  /** Error border and red instructions. Falls back to "Invalid input" without instructions. */
  invalid?: boolean
  /** Hides the toolbar and greys the field out */
  disabled?: boolean
  /** Hides the toolbar and shows the content without allowing edits */
  readOnly?: boolean
  /** Content as HTML, for a controlled editor. Pair with `onChange`. */
  value?: string
  /** Starting content as HTML, for an uncontrolled editor */
  defaultValue?: string
  /** Called with the content as HTML on every change */
  onChange?: (html: string) => void
  placeholder?: string
  /** Height of the text area, which scrolls past it. Any CSS length. Defaults to 182px. */
  height?: string
  id?: string
  className?: string
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Shelf({ children, divider = true }: { children: ReactNode; divider?: boolean }) {
  return (
    <div
      className={`flex items-center gap-(--inline-1) ${divider ? 'pr-(--inset-3)' : ''}`}
      style={divider ? { borderRight: 'var(--space-1) solid var(--border-control-default-idle)' } : undefined}
    >
      {children}
    </div>
  )
}

function Toolbar({ editor, onLinkClick }: { editor: Editor; onLinkClick: () => void }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold:        e.isActive('bold'),
      italic:      e.isActive('italic'),
      underline:   e.isActive('underline'),
      strike:      e.isActive('strike'),
      bulletList:  e.isActive('bulletList'),
      orderedList: e.isActive('orderedList'),
      link:        e.isActive('link'),
    }),
  })

  const run = (command: (chain: ReturnType<Editor['chain']>) => ReturnType<Editor['chain']>) =>
    command(editor.chain().focus()).run()

  return (
    <div
      role="toolbar"
      aria-label="Formatting"
      className="flex items-start gap-(--inline-2) p-(--inset-1)"
      style={{ borderBottom: 'var(--space-1) solid var(--border-control-default-idle)' }}
    >
      <Shelf>
        <ToolbarButton label="Bold" icon={BoldIcon} active={state.bold} onClick={() => run((c) => c.toggleBold())} />
        <ToolbarButton label="Italic" icon={ItalicIcon} active={state.italic} onClick={() => run((c) => c.toggleItalic())} />
        <ToolbarButton label="Underline" icon={UnderlineIcon} active={state.underline} onClick={() => run((c) => c.toggleUnderline())} />
        <ToolbarButton label="Strikethrough" icon={StrikethroughIcon} active={state.strike} onClick={() => run((c) => c.toggleStrike())} />
      </Shelf>
      <Shelf>
        <ToolbarButton label="Bulleted list" icon={ListUlIcon} active={state.bulletList} onClick={() => run((c) => c.toggleBulletList())} />
        <ToolbarButton label="Numbered list" icon={ListOlIcon} active={state.orderedList} onClick={() => run((c) => c.toggleOrderedList())} />
      </Shelf>
      <Shelf divider={false}>
        <ToolbarButton label="Link" icon={LinkIcon} active={state.link} onClick={onLinkClick} />
      </Shelf>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RichTextEditor({
  label,
  required = false,
  tooltip,
  instructions,
  invalid = false,
  disabled = false,
  readOnly = false,
  value,
  defaultValue,
  onChange,
  placeholder,
  height = 'calc(var(--space-40) * 4.55)',
  id,
  className = '',
}: RichTextEditorProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const editable = !disabled && !readOnly
  const [linkMode, setLinkMode] = useState<'add' | null>(null)

  // Latest onChange without re-creating the editor when the prop changes.
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Only what the toolbar offers: no headings, code or quotes sneaking
        // in through Markdown shortcuts like "# ".
        heading: false,
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      Placeholder.configure({ placeholder: placeholder ?? '' }),
    ],
    content: value ?? defaultValue ?? '',
    editable,
    editorProps: {
      attributes: {
        id: inputId,
        role: 'textbox',
        'aria-multiline': 'true',
        ...(invalid ? { 'aria-invalid': 'true' } : {}),
        ...(readOnly ? { 'aria-readonly': 'true' } : {}),
        class: 'minerva-rte-content',
      },
    },
    onUpdate: ({ editor: e }) => onChangeRef.current?.(e.isEmpty ? '' : e.getHTML()),
  })

  // Both effects below skip a destroyed editor. React 19's StrictMode re-runs
  // effects after a simulated unmount that has already destroyed this editor
  // instance; useEditor then hands back a fresh one and the effects run again.
  useEffect(() => {
    if (editor.isDestroyed) return
    editor.setEditable(editable)
    if (!editable) setLinkMode(null)
  }, [editor, editable])

  // Controlled: follow `value` when it changes from outside, without echoing
  // the editor's own updates back into it (which would move the cursor).
  useEffect(() => {
    if (value === undefined || editor.isDestroyed) return
    const current = editor.isEmpty ? '' : editor.getHTML()
    if (value !== current) editor.commands.setContent(value, { emitUpdate: false })
  }, [editor, value])

  return (
    <div className={className}>
      <FieldWrapper
        inputId={inputId}
        label={label}
        required={required}
        tooltip={tooltip}
        instructions={instructions}
        invalid={invalid}
        disabled={disabled}
        readOnly={readOnly}
        flush
      >
        {editable && <Toolbar editor={editor} onLinkClick={() => setLinkMode('add')} />}
        <div className="minerva-rte-scroll" style={{ height }}>
          <EditorContent editor={editor} className="h-full" />
        </div>
      </FieldWrapper>

      {editable && (
        <LinkPanel editor={editor} addRequested={linkMode === 'add'} onClose={() => setLinkMode(null)} />
      )}
    </div>
  )
}
