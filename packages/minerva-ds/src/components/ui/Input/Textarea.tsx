import { forwardRef, useId, type TextareaHTMLAttributes, type ReactNode } from 'react'
import { FieldWrapper } from '../FieldWrapper'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

// Fixed height (4 lines), no auto-grow — see the Input build discussion for why:
// avoids layout shift and the cross-browser complexity of measuring scrollHeight.
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    required = false,
    tooltip,
    instructions,
    invalid = false,
    disabled = false,
    readOnly = false,
    className = '',
    id,
    rows = 4,
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
    >
      <textarea
        id={inputId}
        ref={ref}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        className={[
          'flex-1 min-w-0 w-full resize-none',
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
