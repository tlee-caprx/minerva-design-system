import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../Button'
import { EllipsisVerticalIcon, Icon } from '../Icon'
import { MenuItem, MenuPanel } from '../Dropdown'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableRowAction {
  label: string
  onClick: () => void
  /** Red label, for deleting or other irreversible actions */
  destructive?: boolean
  disabled?: boolean
}

export interface TableRowActionsProps {
  /** Menu items, in order. Put destructive actions last. */
  actions: TableRowAction[]
  /** Accessible label for the ⋮ button, e.g. "Actions for case 100385" */
  label?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

// ⋮ button that opens the same MenuPanel/MenuItem list Dropdown uses. Put it
// in a TableCell with type="action" so the column pins right and clicks
// don't fire the row's onClick.
export function TableRowActions({ actions, label = 'Row actions' }: TableRowActionsProps) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<CSSProperties | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const close = (returnFocus: boolean) => {
    setOpen(false)
    setPosition(null)
    if (returnFocus) triggerRef.current?.focus()
  }

  // Portaled with fixed positioning, same reasoning as Tooltip: the table's
  // scroll container would clip an in-place panel. Right-aligned to the
  // trigger, below it unless that runs off the bottom of the viewport.
  useLayoutEffect(() => {
    if (!open) return
    const trigger = triggerRef.current?.getBoundingClientRect()
    const menu = menuRef.current?.getBoundingClientRect()
    if (!trigger || !menu) return
    const fitsBelow = trigger.bottom + menu.height <= window.innerHeight
    setPosition(
      fitsBelow
        ? { top: trigger.bottom, left: trigger.right, transform: 'translateX(-100%)' }
        : { top: trigger.top, left: trigger.right, transform: 'translate(-100%, -100%)' }
    )
  }, [open])

  // Focus the first item once placed, so arrow keys work straight away.
  useEffect(() => {
    if (position) menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')?.focus({ preventScroll: true })
  }, [position])

  // Close on outside click, and on scroll or resize since a fixed panel
  // would otherwise drift away from its row.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (!menuRef.current?.contains(target) && !triggerRef.current?.contains(target)) close(false)
    }
    const onScrollOrResize = (e: Event) => {
      if (e.target instanceof Node && menuRef.current?.contains(e.target)) return
      close(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [open])

  const handleMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? [])
    const index = items.indexOf(document.activeElement as HTMLButtonElement)
    const focusAt = (i: number) => items[(i + items.length) % items.length]?.focus({ preventScroll: true })
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); focusAt(index + 1); break
      case 'ArrowUp':   e.preventDefault(); focusAt(index - 1); break
      case 'Home':      e.preventDefault(); focusAt(0); break
      case 'End':       e.preventDefault(); focusAt(items.length - 1); break
      case 'Escape':    e.preventDefault(); close(true); break
      case 'Tab':       close(false); break
    }
  }

  return (
    <>
      <Button
        ref={triggerRef}
        variant="tertiary"
        iconOnly
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close(false) : setOpen(true))}
      >
        <Icon icon={EllipsisVerticalIcon} size="regular" />
      </Button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={label}
            onKeyDown={handleMenuKeyDown}
            // Hidden for the one layout pass before it's measured and placed.
            // The gap comes from the stack token as padding, so it stays out
            // of the JS positioning math. Below Tooltip's z-index so a
            // tooltip can still show over an open menu.
            className={`fixed w-max ${position?.transform === 'translateX(-100%)' ? 'pt-(--stack-1)' : 'pb-(--stack-1)'}`}
            style={{
              ...(position ?? { top: 0, left: 0 }),
              visibility: position ? 'visible' : 'hidden',
              minWidth: 'calc(var(--space-40) * 4)',
              zIndex: 9000,
            }}
          >
            <MenuPanel>
              {actions.map((action) => (
                <MenuItem
                  key={action.label}
                  role="menuitem"
                  label={action.label}
                  destructive={action.destructive}
                  disabled={action.disabled}
                  onClick={() => {
                    close(true)
                    action.onClick()
                  }}
                />
              ))}
            </MenuPanel>
          </div>,
          document.body
        )}
    </>
  )
}
