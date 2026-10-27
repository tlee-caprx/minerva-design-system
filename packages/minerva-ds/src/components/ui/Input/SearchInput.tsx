import { forwardRef, useEffect, useRef, useState, type ChangeEvent } from 'react'
import { Input, type InputProps } from './Input'
import { Icon, SearchIcon, XCloseIcon } from '../Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchInputProps = Omit<InputProps, 'type' | 'leftIcon' | 'rightIcon'>

// ─── Component ────────────────────────────────────────────────────────────────

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { onChange, value, defaultValue, ...props },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [hasValue, setHasValue] = useState(() => Boolean(value ?? defaultValue))

  // Stay in sync if used as a controlled input and the value changes externally
  // (e.g. a parent "reset" action) rather than through this field's own onChange.
  useEffect(() => {
    if (value !== undefined) setHasValue(Boolean(value))
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0)
    onChange?.(e)
  }

  const handleClear = () => {
    const input = inputRef.current
    if (!input) return
    // Set via the native setter and dispatch a real "input" event so React's
    // onChange fires correctly whether this field is controlled or not —
    // directly assigning input.value wouldn't notify a controlled parent.
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    setter?.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.focus()
  }

  return (
    <Input
      {...props}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      type="text"
      ref={(node) => {
        inputRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      leftIcon={<Icon icon={SearchIcon} size="regular" className="text-(--icon-control-default)" />}
      rightIcon={
        hasValue ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="inline-flex items-center justify-center cursor-pointer bg-transparent p-0 text-(--icon-control-default) hover:text-(--icon-control-strong)"
          >
            <Icon icon={XCloseIcon} size="small" />
          </button>
        ) : undefined
      }
    />
  )
})
