import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { GlobalHeader } from '../../navigation/GlobalHeader'
import { ActionBar } from '../../navigation/ActionBar'
import { SideNav } from '../../navigation/SideNav'
import type { BreadcrumbItem } from '../../navigation/Breadcrumb'
import { judiLogoSrc } from '../../ui/Icon/icons/judi-logo'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AppLayoutProps {
  // ── Layout variant ──────────────────────────────────────────────────────────
  /** Which header to render — defaults to "minerva" */
  variant?: 'minerva' | 'evolution'

  // ── Shared header props ──────────────────────────────────────────────────────
  /** Full logo shown on sm+ screens — defaults to the Judi logo */
  logoSrc?: string
  /** Icon-only logo shown on mobile */
  logoIconSrc?: string
  /** Alt text for the logo — defaults to "Judi" */
  logoAlt?: string
  /** Where the logo links — defaults to "/" */
  logoHref?: string
  /** Module or app name shown next to the logo */
  appName?: string
  /** Optional content rendered before the bell icon — available in both variants */
  headerActions?: ReactNode
  /** Called when the notifications icon is clicked */
  onNotificationsClick?: () => void

  // ── Minerva-only header props ────────────────────────────────────────────────
  /** Called when the account button is clicked (Minerva only) */
  onAccountClick?: () => void
  /** Label for the account button (Minerva only) — defaults to "Account" */
  accountLabel?: string

  // ── Evolution-only header props ──────────────────────────────────────────────
  /** Called when the AI assistant icon is clicked (Evolution only) */
  onAiClick?: () => void
  /** Called when the keyboard shortcuts icon is clicked (Evolution only) */
  onKeyboardClick?: () => void

  // ── ActionBar ───────────────────────────────────────────────────────────────
  /** Breadcrumb trail */
  breadcrumbs?: BreadcrumbItem[]
  /** Page / module title */
  title?: string
  /** When provided, renders a ← Back button to the left of the title */
  onBackClick?: () => void
  /** Optional second row of content beneath the title row */
  secondaryContent?: ReactNode
  /** Action buttons for the far right of the ActionBar */
  actions?: ReactNode
  /** Optional content rendered inline to the right of the title (e.g. Tag, MetaItem) */
  titleMeta?: ReactNode
  /** When true, renders a green ✓ "Case Completed" indicator inline with the title */
  completed?: boolean

  // ── SideNav ─────────────────────────────────────────────────────────────────
  /** Nav items rendered inside the SideNav. Omit this prop entirely if the design has no side navigation — the SideNav will not render at all. */
  sideNavContent?: ReactNode
  /** Initial open state of the SideNav — defaults to true */
  defaultSideNavOpen?: boolean
  /** Persistent utility controls rendered at the far right, outside the scrolling page body. */
  rightUtilityContent?: ReactNode
  /** Content for the utility panel that slides in to the left of the utility rail. */
  rightPanelContent?: ReactNode
  /** Controls whether the utility panel is visible. */
  rightPanelOpen?: boolean
  /** Default width for the utility panel when open. */
  rightPanelDefaultWidth?: number
  /** Smallest allowed width for a resizable utility panel. */
  rightPanelMinWidth?: number

  // ── Page content ────────────────────────────────────────────────────────────
  /**
   * Optional full-width component rendered between the ActionBar and the page body.
   * Renders flush to all edges — use for tab bars, filter strips, contextual toolbars.
   */
  subBar?: ReactNode
  /**
   * When true, removes the default 40px padding from the page body.
   * Use for full-bleed layouts (e.g. split views, tables that extend edge-to-edge).
   */
  noPadding?: boolean
  children?: ReactNode
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AppLayout({
  variant            = 'minerva',
  // Shared header
  logoSrc            = judiLogoSrc,
  logoIconSrc,
  logoAlt,
  logoHref,
  appName,
  onNotificationsClick,
  onAccountClick,
  // Minerva-only
  headerActions,
  accountLabel,
  // Evolution-only
  onAiClick,
  onKeyboardClick,
  // ActionBar
  breadcrumbs,
  title,
  onBackClick,
  secondaryContent,
  actions,
  titleMeta,
  completed,
  // SideNav
  sideNavContent,
  defaultSideNavOpen = true,
  rightUtilityContent,
  rightPanelContent,
  rightPanelOpen = false,
  rightPanelDefaultWidth = 480,
  rightPanelMinWidth = 360,
  // Content
  subBar,
  noPadding          = false,
  children,
  className          = '',
}: AppLayoutProps) {
  const [sideNavOpen, setSideNavOpen] = useState(defaultSideNavOpen)

  const header = (
    <GlobalHeader
      variant={variant}
      logoSrc={logoSrc}
      logoIconSrc={logoIconSrc}
      logoAlt={logoAlt}
      logoHref={logoHref}
      appName={appName}
      onMenuClick={() => setSideNavOpen(prev => !prev)}
      showMenuButton={Boolean(sideNavContent)}
      onNotificationsClick={onNotificationsClick}
      onAccountClick={onAccountClick}
      headerActions={headerActions}
      accountLabel={accountLabel}
      onAiClick={onAiClick}
      onKeyboardClick={onKeyboardClick}
    />
  )

  const actionBar = (
    <ActionBar
      breadcrumbs={breadcrumbs}
      title={title}
      onBackClick={onBackClick}
      secondaryContent={secondaryContent}
      actions={actions}
      titleMeta={titleMeta}
      completed={completed}
    />
  )

  const sideNav = sideNavContent ? (
    <SideNav
      isOpen={sideNavOpen}
      onToggle={() => setSideNavOpen(prev => !prev)}
    >
      {sideNavContent}
    </SideNav>
  ) : null

  return (
    <div className={`flex flex-col h-screen overflow-hidden bg-(--bg-surface-base) ${className}`}>

      {variant === 'evolution' ? (

        // ── Evolution — SideNav spans full height alongside ActionBar + content ──
        <>
          <div className="sticky top-0 z-50">{header}</div>
          <div className="flex flex-1 overflow-hidden">
            {sideNavOpen && sideNav}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
              {actionBar}
              {subBar && <div className="shrink-0">{subBar}</div>}
              <main aria-label="Page content" className={`flex-1 overflow-auto bg-(--bg-surface-subtle) ${noPadding ? '' : 'p-(--layout-4)'}`}>
                {children}
              </main>
            </div>
            {rightPanelContent && (
              <RightUtilityPanel open={rightPanelOpen} defaultWidth={rightPanelDefaultWidth} minWidth={rightPanelMinWidth}>
                {rightPanelContent}
              </RightUtilityPanel>
            )}
            {rightUtilityContent && <RightUtilityRail>{rightUtilityContent}</RightUtilityRail>}
          </div>
        </>

      ) : (

        // ── Minerva — SideNav sits below ActionBar ────────────────────────────────
        <>
          <div className="sticky top-0 z-50">
            {header}
            {actionBar}
            {subBar && <div className="shrink-0">{subBar}</div>}
          </div>
          <div className="flex flex-1 overflow-hidden">
            {sideNav}
            <main aria-label="Page content" className={`flex-1 overflow-auto bg-(--bg-surface-subtle) ${noPadding ? '' : 'p-(--layout-4)'}`}>
              {children}
            </main>
            {rightPanelContent && (
              <RightUtilityPanel open={rightPanelOpen} defaultWidth={rightPanelDefaultWidth} minWidth={rightPanelMinWidth}>
                {rightPanelContent}
              </RightUtilityPanel>
            )}
            {rightUtilityContent && <RightUtilityRail>{rightUtilityContent}</RightUtilityRail>}
          </div>
        </>

      )}

    </div>
  )
}

function RightUtilityRail({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="Utility navigation"
      className="flex h-full w-(--space-48) shrink-0 flex-col items-center gap-(--stack-2) bg-(--bg-surface-base) px-(--inset-2) py-(--inset-3)"
      style={{ borderLeft: 'var(--space-1) solid var(--border-surface-base)' }}
    >
      {children}
    </aside>
  )
}

function RightUtilityPanel({
  children,
  open,
  defaultWidth,
  minWidth,
}: {
  children: ReactNode
  open: boolean
  defaultWidth: number
  minWidth: number
}) {
  const panelRef = useRef<HTMLElement>(null)
  const [width, setWidth] = useState(defaultWidth)

  const getMaxWidth = () => Math.max(minWidth, Math.floor((panelRef.current?.parentElement?.clientWidth ?? window.innerWidth) / 2))
  const clampWidth = (nextWidth: number) => Math.min(getMaxWidth(), Math.max(minWidth, nextWidth))

  const startResize = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = width

    const onPointerMove = (moveEvent: PointerEvent) => {
      setWidth(clampWidth(startWidth + startX - moveEvent.clientX))
    }
    const stopResize = () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', stopResize)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopResize)
  }

  const resizeBy = (amount: number) => setWidth((currentWidth) => clampWidth(currentWidth + amount))

  return (
    <aside
      ref={panelRef}
      aria-label="Utility panel"
      aria-hidden={!open}
      className={`relative shrink-0 overflow-hidden ${open ? 'transition-[width] duration-200 ease-out' : 'transition-[width] duration-200 ease-out'}`}
      style={{ width: open ? `${width}px` : '0px' }}
    >
      <div
        className={`relative h-full bg-(--bg-surface-base) transition-transform duration-200 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: `${width}px`, borderLeft: 'var(--space-1) solid var(--border-surface-base)' }}
      >
        <div
          role="separator"
          aria-label="Resize utility panel"
          aria-orientation="vertical"
          aria-valuemin={minWidth}
          aria-valuemax={getMaxWidth()}
          aria-valuenow={width}
          tabIndex={open ? 0 : -1}
          onPointerDown={startResize}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              resizeBy(16)
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault()
              resizeBy(-16)
            }
          }}
          className="absolute inset-y-0 left-0 z-10 w-(--space-4) -translate-x-1/2 cursor-col-resize bg-transparent hover:bg-(--border-control-emphasis) focus-visible:bg-(--border-control-default-focus) focus-visible:outline-none"
        />
        {children}
      </div>
    </aside>
  )
}
