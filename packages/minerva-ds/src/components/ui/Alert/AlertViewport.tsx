import { useEffect, useSyncExternalStore, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Alert, type AlertType, type AlertVariant } from './Alert'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShowAlertOptions {
  type: AlertType
  variant: AlertVariant
  message: ReactNode
  /** Milliseconds before it disappears on its own. Defaults to 5000. */
  duration?: number
}

interface ActiveAlert extends Required<ShowAlertOptions> {
  id: number
}

// ─── Store ────────────────────────────────────────────────────────────────────

// Module-level so showAlert() works from any event handler without a
// provider or hook. AlertViewport (rendered by AppLayout) subscribes to it.
const DEFAULT_DURATION = 5000

let alerts: ActiveAlert[] = []
let nextId = 1
const listeners = new Set<() => void>()

function setAlerts(next: ActiveAlert[]) {
  alerts = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Shows a banner or toast over the page and returns its id. A new banner replaces the current one; toasts stack. */
export function showAlert({ type, variant, message, duration = DEFAULT_DURATION }: ShowAlertOptions): number {
  const id = nextId++
  const kept = variant === 'banner' ? alerts.filter((a) => a.variant !== 'banner') : alerts
  setAlerts([...kept, { id, type, variant, message, duration }])
  return id
}

/** Removes a banner or toast before its time runs out. */
export function dismissAlert(id: number) {
  setAlerts(alerts.filter((a) => a.id !== id))
}

// ─── Viewport ─────────────────────────────────────────────────────────────────

function TimedAlert({ alert }: { alert: ActiveAlert }) {
  useEffect(() => {
    const timer = window.setTimeout(() => dismissAlert(alert.id), alert.duration)
    return () => window.clearTimeout(timer)
  }, [alert.id, alert.duration])

  return (
    <Alert type={alert.type} variant={alert.variant} onClose={() => dismissAlert(alert.id)}>
      {alert.message}
    </Alert>
  )
}

/**
 * Where showAlert() renders. AppLayout already includes one; render it
 * yourself only on a page without AppLayout, and only once per page.
 */
export function AlertViewport() {
  const current = useSyncExternalStore(subscribe, () => alerts, () => alerts)
  if (current.length === 0 || typeof document === 'undefined') return null

  const banner = current.find((a) => a.variant === 'banner')
  const toasts = current.filter((a) => a.variant === 'toast')

  // Portaled and fixed so nothing on the page can clip it. The banner sits
  // over the global header rather than pushing the page down. Toasts are
  // centered at the top edge, below the banner when both are showing.
  // Above Modal and Tooltip so feedback from a modal action stays visible.
  // The design's backgrounds are 85% opaque; a solid surface underneath keeps
  // them the color they are in Figma instead of letting the header or page
  // text show through.
  return createPortal(
    <div
      className="fixed inset-x-0 top-0 flex flex-col items-center pointer-events-none"
      style={{ zIndex: 10000 }}
    >
      {banner && (
        <div className="w-full pointer-events-auto bg-(--bg-surface-base)">
          <TimedAlert alert={banner} />
        </div>
      )}
      {toasts.length > 0 && (
        <div className="flex flex-col items-center gap-(--stack-2) max-w-full px-(--inset-5)">
          {toasts.map((toast) => (
            <div key={toast.id} className="flex max-w-full pointer-events-auto rounded-(--radius-sm) bg-(--bg-surface-base)">
              <TimedAlert alert={toast} />
            </div>
          ))}
        </div>
      )}
    </div>,
    document.body
  )
}
