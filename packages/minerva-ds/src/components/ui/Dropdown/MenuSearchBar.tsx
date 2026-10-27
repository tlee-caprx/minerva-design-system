import { SearchInput, type SearchInputProps } from '../Input'

// ─── Types ────────────────────────────────────────────────────────────────────

export type MenuSearchBarProps = SearchInputProps

// ─── Component ────────────────────────────────────────────────────────────────

// Pinned strip at the top of a dropdown's options panel — wraps the existing
// SearchInput rather than a new search field, bottom border only (divides it
// from the options below it).
export function MenuSearchBar(props: MenuSearchBarProps) {
  return (
    <div
      className="w-full p-(--inset-3) bg-(--bg-surface-base)"
      style={{ borderBottom: 'var(--space-1) solid var(--border-surface-inverse)' }}
    >
      <SearchInput {...props} />
    </div>
  )
}
