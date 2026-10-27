import {
  forwardRef, useEffect, useId, useRef, useState, Children, cloneElement, isValidElement,
  type ButtonHTMLAttributes, type MouseEvent as ReactMouseEvent, type ReactNode,
} from 'react'
import { FieldWrapper } from '../FieldWrapper'
import { MenuPanel } from './MenuPanel'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { Icon, ChevronDownIcon, XCloseIcon } from '../Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DropdownProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'value' | 'onSelect'> {
  /** Label rendered above the field */
  label?: ReactNode
  /** Shows a required asterisk after the label */
  required?: boolean
  /** Shows an info icon after the label with a Tooltip on hover/focus */
  tooltip?: string
  /** Helper text rendered below the field */
  instructions?: ReactNode
  /**
   * Shows the error border and turns instructions red. Persists through
   * hover/focus rather than clearing — focusing the field doesn't fix
   * the underlying validation problem, so the signal should stay visible.
   * Falls back to "Invalid input" if no instructions are given.
   */
  invalid?: boolean
  /** Stays focusable but can't be opened/changed */
  readOnly?: boolean
  /** Display text for the currently selected value */
  value?: string
  placeholder?: string
  /** Called when the clear (×) button is clicked. Omit to hide the clear button entirely. */
  onClear?: () => void
  /**
   * Fires when a MenuItem is clicked, in single-select mode only (mode is
   * detected automatically — if any MenuItem child has `checkbox` set, this
   * is treated as multi-select and Dropdown doesn't auto-close/auto-select
   * at all, since that's a "select multiple, close manually" pattern).
   * Dropdown doesn't own `value` itself — wire this to your own state, same
   * as every other callback-driven component in this system.
   */
  onSelect?: (label: string) => void
  /** Optional pinned search bar shown above the options, e.g. <MenuSearchBar> */
  searchBar?: ReactNode
  /** MenuGroup/MenuItem content shown when open. Omit to render just the trigger with no panel. */
  children?: ReactNode
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

// The panel itself is just MenuPanel wrapping `children` — this doesn't yet
// implement full ARIA listbox semantics (role="listbox"/"option",
// aria-selected, arrow-key navigation, type-ahead). Items are keyboard-
// reachable via Tab since they're plain buttons, but not via the arrow-key
// pattern a real listbox would have. That's a follow-up, not done here.
export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(function Dropdown(
  {
    label,
    required = false,
    tooltip,
    instructions,
    invalid = false,
    disabled = false,
    readOnly = false,
    value,
    placeholder,
    onClear,
    onSelect,
    searchBar,
    children,
    className = '',
    id,
    onClick,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    if (disabled || readOnly) return
    setOpen((o) => !o)
    // The chevron isn't the focusable element — clicking it toggles state but
    // never moves real focus, so :focus-within on the box wouldn't activate
    // without this.
    buttonRef.current?.focus()
  }

  // Close on outside click or Escape — without this, the only way to close
  // the panel would be re-clicking the trigger, which isn't real dropdown behavior.
  useEffect(() => {
    if (!open) return

    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // A MenuItem with `checkbox` set signals multi-select — in that case we
  // leave children untouched entirely (no auto-close, no auto-selected):
  // multi-select is "pick several, close manually", not this pattern.
  const isMultiSelect = Children.toArray(children).some(
    (child) => isValidElement<MenuItemProps>(child) && child.type === MenuItem && child.props.checkbox
  )

  const renderedChildren = isMultiSelect
    ? children
    : Children.map(children, (child) => {
        if (!isValidElement<MenuItemProps>(child) || child.type !== MenuItem) return child
        return cloneElement(child, {
          selected: child.props.label === value,
          onClick: (e: ReactMouseEvent<HTMLButtonElement>) => {
            child.props.onClick?.(e)
            onSelect?.(child.props.label)
            setOpen(false)
            buttonRef.current?.focus()
          },
        })
      })

  return (
    <div ref={containerRef}>
      <FieldWrapper
        inputId={inputId}
        label={label}
        required={required}
        tooltip={tooltip}
        instructions={instructions}
        invalid={invalid}
        disabled={disabled}
        readOnly={readOnly}
        panel={
          open && children ? (
            <MenuPanel searchBar={searchBar}>{renderedChildren}</MenuPanel>
          ) : undefined
        }
        rightIcon={
          <div className="inline-flex items-center gap-(--inline-1)">
            {onClear && value && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClear()
                }}
                aria-label="Clear selection"
                className="inline-flex items-center justify-center cursor-pointer bg-transparent p-0 text-(--icon-control-default) hover:text-(--icon-control-strong)"
              >
                <Icon icon={XCloseIcon} size="small" />
              </button>
            )}
            <span
              onClick={handleToggle}
              className={[
                'inline-flex items-center justify-center',
                disabled ? 'cursor-not-allowed' : readOnly ? 'cursor-default' : 'cursor-pointer',
              ].join(' ')}
            >
              <Icon
                icon={ChevronDownIcon}
                size="regular"
                className={`text-(--icon-control-default) transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
              />
            </span>
          </div>
        }
      >
        <button
          id={inputId}
          ref={(node) => {
            buttonRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={(e) => {
            handleToggle()
            onClick?.(e)
          }}
          className={[
            'flex-1 min-w-0 w-full text-left',
            'bg-transparent outline-none',
            disabled ? 'cursor-not-allowed' : readOnly ? 'cursor-default' : 'cursor-pointer',
            className,
          ].filter(Boolean).join(' ')}
          style={{
            fontSize:   'var(--body-md-size)',
            lineHeight: 'var(--body-md-line-height)',
            fontWeight: 'var(--body-md-weight)',
            color:      disabled ? 'var(--text-control-value-disabled)' : value ? 'var(--text-control-value)' : 'var(--text-control-placeholder)',
          }}
          {...props}
        >
          {value || placeholder}
        </button>
      </FieldWrapper>
    </div>
  )
})
