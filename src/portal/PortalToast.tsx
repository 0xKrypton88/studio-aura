import { Icons } from './icons'
import { usePortal } from './PortalProvider'

export function PortalToast() {
  const { toast } = usePortal()
  if (!toast) return null

  return (
    <div className="portal-toast is-showing" role="status" aria-live="polite">
      <Icons.check />
      <span>{toast}</span>
    </div>
  )
}
