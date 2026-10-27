import type { ReactNode } from 'react'
import { Icon, InfoCircleIcon } from '../Icon'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

// Internal chrome shared by Input and Textarea — label/tooltip/asterisk row,
// the bordered box with all its states, and the instructions row. Not part
// of the public component API; each control renders its own native element
// (<input>, <textarea>, ...) as children.

export interface FieldWrapperProps {
  inputId: string
  label?: ReactNode
  required?: boolean
  tooltip?: string
  instructions?: ReactNode
  invalid?: boolean
  disabled?: boolean
  readOnly?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  /**
   * Rendered absolutely-positioned directly below the box (e.g. a Dropdown's
   * MenuPanel) — anchored to the box specifically, not the whole label/box/
   * instructions stack, so it's correctly positioned regardless of whether
   * a label or instructions are present above/below it.
   */
  panel?: ReactNode
  children: ReactNode
}

export function FieldWrapper({
  inputId,
  label,
  required = false,
  tooltip,
  instructions,
  invalid = false,
  disabled = false,
  readOnly = false,
  leftIcon,
  rightIcon,
  panel,
  children,
}: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-(--stack-1)">
      {label && (
        <div className="inline-flex items-center gap-(--inline-1)">
          <label htmlFor={inputId}>
            <Text as="span" variant="label-md" className="text-(--text-control-label-idle)">
              {label}
            </Text>
            {required && (
              <Text as="span" variant="label-md" className="text-(--text-control-label-idle)">
                {' *'}
              </Text>
            )}
          </label>
          {tooltip && (
            <Tooltip content={tooltip}>
              <span tabIndex={0}>
                <Icon icon={InfoCircleIcon} size="small" className="text-(--text-control-label-idle)" />
              </span>
            </Tooltip>
          )}
        </div>
      )}
      <div
        className={[
          'relative flex items-center',
          'py-(--inset-3) px-(--inset-3) gap-(--inline-2)',
          'rounded-(--radius-sm)',
          'transition-colors duration-150',
          disabled
            ? 'bg-(--bg-control-default-disabled) shadow-none cursor-not-allowed'
            : invalid
            ? [
                'bg-(--bg-control-default-invalid)',
                // No glow, no hover/focus variance — the error signal stays put.
                'shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-critical-idle)]',
              ].join(' ')
            : readOnly
            ? [
                'bg-(--bg-control-default-readonly)',
                'shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-readonly)]',
              ].join(' ')
            : [
                'bg-(--bg-control-default-idle)',
                'shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]',
                'hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)]',
                'focus-within:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-focus),var(--shadow-input-engaged)]',
                // Focus must win over hover when both apply — hover: and focus-within: are
                // equal specificity, so without this, hovering a focused field could clear
                // the focus glow depending on Tailwind's generated rule order.
                'focus-within:hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-focus),var(--shadow-input-engaged)]',
              ].join(' '),
        ].filter(Boolean).join(' ')}
      >
        {leftIcon && <span className="shrink-0 inline-flex items-center justify-center">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0 inline-flex items-center justify-center">{rightIcon}</span>}
        {panel && (
          // left-0 + right-0 forces this to span the box's exact width, so
          // whatever's inside (MenuPanel) can just be w-full and automatically
          // match the trigger — no measuring/JS needed.
          <div className="absolute left-0 right-0 top-full z-50 mt-(--stack-1)">
            {panel}
          </div>
        )}
      </div>
      {(instructions || invalid) && (
        <Text
          as="span"
          variant="body-sm"
          className={invalid ? 'text-(--text-feedback-error-base)' : 'text-(--text-control-instructions)'}
        >
          {invalid ? (instructions ?? 'Invalid input') : instructions}
        </Text>
      )}
    </div>
  )
}
