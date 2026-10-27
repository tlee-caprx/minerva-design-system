// ─── Types ────────────────────────────────────────────────────────────────────

export interface MenuGroupProps {
  label: string
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

// Same typography recipe as SideNavGroup (label-lg + the space-18/space-1
// primitive workarounds already established there for line-height/letter-
// spacing, since no semantic label variant covers 18px/1px) — this version
// just adds its own fill/padding. Width is w-full — fills whatever the
// menu panel's own width ends up being (e.g. matched to a Dropdown trigger).
export function MenuGroup({ label, className = '' }: MenuGroupProps) {
  return (
    <div className={`w-full py-(--inset-1) px-(--inset-5) bg-(--bg-surface-base) ${className}`}>
      <span
        className="uppercase text-(--text-surface-base)"
        style={{
          fontSize:      'var(--label-lg-size)',
          lineHeight:    'var(--space-18)',
          fontWeight:    'var(--label-lg-weight)',
          letterSpacing: 'var(--space-1)',
        }}
      >
        {label}
      </span>
    </div>
  )
}
