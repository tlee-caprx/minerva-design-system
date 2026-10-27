import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { FieldWrapper } from '../FieldWrapper'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
  /**
   * Content anchored to the left edge of the field (e.g. a search icon).
   * Accepts any ReactNode, not just a bare icon, so variants like Password
   * can put an interactive button here instead of a decorative glyph.
   */
  leftIcon?: ReactNode
  /** Same as leftIcon, anchored to the right edge (e.g. Password's eye toggle). */
  rightIcon?: ReactNode
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    required = false,
    tooltip,
    instructions,
    invalid = false,
    leftIcon,
    rightIcon,
    disabled = false,
    readOnly = false,
    className = '',
    id,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <FieldWrapper
      inputId={inputId}
      label={label}
      required={required}
      tooltip={tooltip}
      instructions={instructions}
      invalid={invalid}
      disabled={disabled}
      readOnly={readOnly}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    >
      <input
        id={inputId}
        ref={ref}
        disabled={disabled}
        readOnly={readOnly}
        className={[
          'flex-1 min-w-0 w-full',
          'bg-transparent outline-none',
          readOnly ? 'caret-transparent cursor-default' : '',
          disabled ? 'cursor-not-allowed' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{
          fontSize:   'var(--body-md-size)',
          lineHeight: 'var(--body-md-line-height)',
          fontWeight: 'var(--body-md-weight)',
          color:      'var(--text-control-value)',
        }}
        {...props}
      />
    </FieldWrapper>
  )
})
