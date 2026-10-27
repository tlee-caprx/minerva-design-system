export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps {
  orientation?: DividerOrientation
  className?: string
}

export function Divider({ orientation = 'horizontal', className = '' }: DividerProps) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`shrink-0 ${isHorizontal ? 'w-full' : 'self-stretch'} ${className}`}
      style={
        isHorizontal
          ? { borderBottom: 'var(--space-1) solid var(--border-surface-base)' }
          : { borderRight: 'var(--space-1) solid var(--border-surface-base)' }
      }
    />
  )
}
