import { Children, cloneElement, isValidElement, useState, type MouseEvent, type ReactNode } from 'react'
import { Dropdown, type DropdownProps } from './Dropdown'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { Badge } from '../Badge'
import { Button } from '../Button'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MultiSelectDropdownProps
  extends Omit<DropdownProps, 'value' | 'onSelect' | 'onClear' | 'onChange' | 'children'> {
  /** MenuGroup/MenuItem content — every MenuItem gets `checkbox` forced on. */
  children: ReactNode
  /** Fires whenever the selection changes (toggling an item, or Clear All). */
  onChange?: (selected: string[]) => void
}

// ─── Component ────────────────────────────────────────────────────────────────

// Wraps Dropdown the same way PasswordInput/SearchInput wrap Input — Dropdown
// itself needs no changes, since it already passes multi-select children
// (checkbox=true) through untouched. This owns the selected-items array and
// renders the badge row + Clear All below the trigger, which live outside
// the dropdown box entirely and stay visible even while it's closed.
export function MultiSelectDropdown({ children, onChange, ...props }: MultiSelectDropdownProps) {
  const [selected, setSelected] = useState<string[]>([])

  const setSelectedAndNotify = (next: string[]) => {
    setSelected(next)
    onChange?.(next)
  }

  const toggle = (label: string) => {
    setSelectedAndNotify(
      selected.includes(label) ? selected.filter((l) => l !== label) : [...selected, label]
    )
  }

  const renderedChildren = Children.map(children, (child) => {
    if (!isValidElement<MenuItemProps>(child) || child.type !== MenuItem) return child
    return cloneElement(child, {
      checkbox: true,
      selected: selected.includes(child.props.label),
      onClick: (e: MouseEvent<HTMLButtonElement>) => {
        child.props.onClick?.(e)
        toggle(child.props.label)
      },
    })
  })

  return (
    <div className="flex flex-col">
      <Dropdown {...props}>{renderedChildren}</Dropdown>
      {selected.length > 0 && (
        <>
          <div className="flex flex-wrap gap-(--inline-1) mt-(--stack-2)">
            {selected.map((label) => (
              <Badge key={label} onClose={() => toggle(label)}>{label}</Badge>
            ))}
          </div>
          {/* self-start — without it, flex-col's default align-items:stretch
              makes the button fill the row's width, and since Button centers
              its own text internally, a stretched button just looks centered. */}
          <Button variant="tertiary" className="self-start mt-(--stack-1)" onClick={() => setSelectedAndNotify([])}>
            Clear All
          </Button>
        </>
      )}
    </div>
  )
}
