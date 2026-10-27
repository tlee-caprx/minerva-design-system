import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { Icon, CheckMarkIcon } from '../Icon'
import { Text } from '../Text'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered to the right of the checkbox. Omit for an unlabeled checkbox. */
  label?: ReactNode
  /** Adds top/bottom padding so the row height matches Button (36px) — e.g. table rows, list rows */
  padding?: boolean
  /**
   * Shows a dash instead of a checkmark — represents a group that's partially
   * selected. Set imperatively on the DOM node (not a real HTML attribute) and
   * takes visual precedence over `checked` if both are true. Ignored when `disabled`.
   */
  indeterminate?: boolean
  /**
   * Visually and functionally read-only — stays focusable and keeps its value,
   * but can't be toggled. Native `readOnly` is a no-op on checkboxes in every
   * browser, so toggling is blocked manually here rather than relying on it.
   */
  readOnly?: boolean
  /** Shows the error border and the message below the checkbox. Ignored when `disabled`. */
  error?: boolean
  /** Message shown below the checkbox when `error` is true. */
  errorMessage?: ReactNode
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    padding       = false,
    indeterminate = false,
    readOnly      = false,
    disabled      = false,
    error         = false,
    errorMessage  = 'Required',
    onClick,
    className     = '',
    ...props
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = !disabled && indeterminate
  }, [indeterminate, disabled])

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (readOnly) e.preventDefault()
    onClick?.(e)
  }

  // ─── Box appearance — disabled > error > readOnly > indeterminate > interactive ─
  const boxClasses = disabled
    ? 'bg-(--bg-control-default-disabled) shadow-none'
    : error
    ? [
        'bg-(--bg-control-default-idle)',
        'shadow-[inset_0_0_0_var(--space-1)_var(--border-feedback-error-base)]',
        // Checking the box satisfies the validation — error clears immediately.
        'peer-checked:bg-(--bg-control-selected-idle)',
        'peer-checked:shadow-none',
      ].join(' ')
    : readOnly
    ? [
        'bg-(--bg-control-default-readonly)',
        'shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-readonly)]',
      ].join(' ')
    : indeterminate
    ? [
        'bg-(--bg-control-selected-idle)',
        'group-hover:bg-(--bg-control-selected-hover)',
        'shadow-none',
      ].join(' ')
    : [
        'bg-(--bg-control-default-idle)',
        'shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]',
        'group-hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)]',
        'peer-checked:bg-(--bg-control-selected-idle)',
        'peer-checked:shadow-none',
        'peer-checked:group-hover:bg-(--bg-control-selected-hover)',
        'peer-checked:group-hover:shadow-none',
      ].join(' ')

  const markColorClass = readOnly
    ? 'text-(--icon-control-selected-readonly)'
    : 'text-(--icon-control-selected-idle)'

  return (
    <div className="flex flex-col gap-(--stack-1) [&:has(:checked)_.checkbox-error-message]:hidden">
      <label
        className={[
          'group inline-flex items-center gap-(--inline-2)',
          disabled ? 'cursor-not-allowed' : readOnly ? 'cursor-default' : 'cursor-pointer',
          padding ? 'py-(--inset-3)' : '',
          className,
        ].filter(Boolean).join(' ')}
      >
        <input
          type="checkbox"
          ref={(node) => {
            inputRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly || undefined}
          onClick={handleClick}
          className="peer sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={[
            'inline-flex items-center justify-center shrink-0',
            'w-(--space-18) h-(--space-18)',
            'rounded-(--radius-sm)',
            'transition-colors duration-150',
            boxClasses,
            // ─── Focus ──────────────────────────────────────────────────────
            'peer-focus-visible:outline peer-focus-visible:outline-2',
            'peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--border-control-default-focus)',
            // ─── Checkmark visibility (hidden until checked) ──────────────────
            '[&>svg]:opacity-0 [&>svg]:transition-opacity [&>svg]:duration-150',
            'peer-checked:[&>svg]:opacity-100',
          ].join(' ')}
        >
          {!disabled && (
            indeterminate
              ? <span className={`w-(--space-12) h-(--space-2) rounded-(--radius-sm) ${readOnly ? 'bg-(--icon-control-selected-readonly)' : 'bg-(--icon-control-selected-idle)'}`} />
              : <Icon icon={CheckMarkIcon} size="small" className={markColorClass} />
          )}
        </span>
        {label && (
          <Text
            as="span"
            variant="option-default"
            className={disabled ? 'text-(--text-control-label-disabled)' : 'text-(--text-surface-base)'}
          >
            {label}
          </Text>
        )}
      </label>
      {error && !disabled && (
        <Text as="span" variant="body-sm" className="checkbox-error-message text-(--text-feedback-error-base)">
          {errorMessage}
        </Text>
      )}
    </div>
  )
})
