import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { useEditorState, type Editor } from '@tiptap/react'
import { Input } from '../../components/ui/Input'
import { Text } from '../../components/ui/Text'
import { CheckMarkIcon, DeleteIcon, EditIcon } from '../../components/ui/Icon'
import { ToolbarButton } from './ToolbarButton'

interface LinkPanelProps {
  editor: Editor
  /** The toolbar's link button was clicked */
  addRequested: boolean
  onClose: () => void
}

// Two modes from the design. "Add link": a URL field with apply and remove.
// "Edit link": shown whenever the cursor sits inside a link, with the URL,
// edit and remove. Portaled with fixed positioning under the selection so the
// editor's scroll area can't clip it.
export function LinkPanel({ editor, addRequested, onClose }: LinkPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [editing, setEditing] = useState(false)
  const [url, setUrl] = useState('')
  const [position, setPosition] = useState<CSSProperties | null>(null)

  const { inLink, href, focused, selectionKey } = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      inLink:       e.isActive('link'),
      href:         (e.getAttributes('link').href as string | undefined) ?? '',
      focused:      e.isFocused,
      selectionKey: `${e.state.selection.from}-${e.state.selection.to}`,
    }),
  })

  const mode: 'add' | 'edit' | null = addRequested || editing ? 'add' : inLink && focused ? 'edit' : null

  // Opening the add form starts from the current link, or a bare protocol.
  // Only on opening, so typing isn't overwritten.
  const wasAdding = useRef(false)
  useEffect(() => {
    if (mode === 'add' && !wasAdding.current) setUrl(href || 'https://')
    wasAdding.current = mode === 'add'
  })

  const close = (refocusEditor: boolean) => {
    setEditing(false)
    onClose()
    if (refocusEditor) editor.commands.focus()
  }

  // Place under the start of the selection, kept inside the viewport, and
  // flipped above when there's no room below. Follows scrolling.
  useLayoutEffect(() => {
    if (!mode) {
      setPosition(null)
      return
    }
    const place = () => {
      const panel = panelRef.current?.getBoundingClientRect()
      if (!panel) return
      const coords = editor.view.coordsAtPos(editor.state.selection.from)
      const margin = 8
      const left = Math.max(margin, Math.min(coords.left, window.innerWidth - panel.width - margin))
      const below = coords.bottom + margin
      const top = below + panel.height <= window.innerHeight ? below : coords.top - margin - panel.height
      setPosition({ top, left })
    }
    place()
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
    }
  }, [mode, selectionKey, editor])

  // Focus the URL field once the panel is placed: it's hidden until then,
  // and hidden fields can't take focus, so autoFocus alone doesn't work.
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (mode === 'add' && position) inputRef.current?.focus()
  }, [mode, position !== null])

  // A click outside the panel and the editor closes the add form.
  useEffect(() => {
    if (mode !== 'add') return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (!panelRef.current?.contains(target) && !editor.view.dom.contains(target)) close(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  })

  const apply = () => {
    const trimmed = url.trim()
    if (!trimmed || trimmed === 'https://' || trimmed === 'http://') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else if (editor.state.selection.empty && !inLink) {
      // Nothing selected: insert the URL itself as the link text.
      editor.chain().focus().insertContent({ type: 'text', text: trimmed, marks: [{ type: 'link', attrs: { href: trimmed } }] }).run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: trimmed }).run()
    }
    close(false)
  }

  const remove = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    close(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      apply()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close(true)
    }
  }

  if (!mode) return null

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-label={mode === 'add' ? 'Add link' : 'Link'}
      className="fixed flex items-center gap-(--inline-2) p-(--inset-3) rounded-(--radius-sm) bg-(--bg-surface-base)"
      style={{
        ...(position ?? { top: 0, left: 0 }),
        // Hidden for the one layout pass before it's measured and placed.
        visibility: position ? 'visible' : 'hidden',
        width: 'calc(var(--space-30) * 10)',
        boxShadow: 'var(--shadow-surface-lg)',
        zIndex: 9000,
      }}
    >
      <div className="flex flex-1 min-w-0 items-center">
        {mode === 'add' ? (
          <div className="flex-1 min-w-0">
            <Input
              ref={inputRef}
              aria-label="Link URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseDown={(e) => e.preventDefault()}
            className="min-w-0 truncate text-(--text-action-hyperlink) hover:underline"
          >
            <Text variant="body-md" className="truncate">{href}</Text>
          </a>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-(--inline-1)">
        {mode === 'add' ? (
          <ToolbarButton label="Apply link" icon={CheckMarkIcon} onClick={apply} padding="md" />
        ) : (
          <ToolbarButton label="Edit link" icon={EditIcon} onClick={() => setEditing(true)} padding="md" />
        )}
        <ToolbarButton label="Remove link" icon={DeleteIcon} onClick={remove} padding="md" />
      </div>
    </div>,
    document.body
  )
}
