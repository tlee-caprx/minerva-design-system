import { forwardRef, useState } from 'react'
import { Input, type InputProps } from './Input'
import { Icon, EyeIcon, EyeSlashIcon } from '../Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type PasswordInputProps = Omit<InputProps, 'type' | 'rightIcon'>

// ─── Component ────────────────────────────────────────────────────────────────

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  props,
  ref
) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      {...props}
      ref={ref}
      type={visible ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="inline-flex items-center justify-center cursor-pointer bg-transparent p-0 text-(--icon-action-secondary-idle) hover:text-(--icon-action-secondary-hover)"
        >
          <Icon icon={visible ? EyeSlashIcon : EyeIcon} size="regular" />
        </button>
      }
    />
  )
})
