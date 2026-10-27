import { forwardRef, type InputHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { Text } from '../Text'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered to the right of the radio control. */
  label?: ReactNode
  /** Adds top and bottom padding for list or form-row contexts. */
  padding?: boolean
  /** Displays the radio's value without allowing the user to change it. */
  readOnly?: boolean
  className?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    label,
    padding = false,
    disabled = false,
    readOnly = false,
    className = '',
    onClick,
    ...props
  },
  ref
) {
  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    if (readOnly) {
      event.preventDefault()
    }

    onClick?.(event)
  }

  const controlClasses = disabled
    ? 'bg-(--bg-control-default-disabled) shadow-none'
    : readOnly
      ? [
          'bg-(--bg-control-default-readonly)',
          'shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-readonly)]',
          'peer-checked:bg-(--bg-control-selected-readonly)',
        ].join(' ')
    : [
        'bg-(--bg-control-default-idle)',
        'shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]',
        'group-hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)]',
        'peer-checked:bg-(--bg-control-selected-idle)',
        'peer-checked:shadow-none',
        'peer-checked:group-hover:bg-(--bg-control-selected-hover)',
      ].join(' ')

  return (
    <label
      className={[
        'group inline-flex items-center gap-(--inline-2)',
        disabled ? 'cursor-not-allowed' : readOnly ? 'cursor-default' : 'cursor-pointer',
        padding ? 'py-(--inset-3)' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <input
        ref={ref}
        type="radio"
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
          'w-(--space-18) h-(--space-18) rounded-(--radius-full)',
          'transition-colors duration-150',
          controlClasses,
          'peer-focus-visible:outline peer-focus-visible:outline-2',
          'peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--border-control-default-focus)',
          'peer-checked:[&>span]:scale-100',
        ].join(' ')}
      >
        {!disabled && (
          <span
            className={[
              'w-(--space-8) h-(--space-8) rounded-(--radius-full)',
              readOnly ? 'bg-(--icon-control-selected-readonly)' : 'bg-(--icon-control-selected-idle)',
              'scale-0 transition-transform duration-150',
            ].join(' ')}
          />
        )}
      </span>
      {label && (
        <Text
          as="span"
          variant="option-default"
          className={disabled ? 'text-(--text-control-label-disabled)' : 'text-(--text-control-label-idle)'}
        >
          {label}
        </Text>
      )}
    </label>
  )
})
