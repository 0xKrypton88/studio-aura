import { useEffect, useId, useRef } from 'react'
import { Icons } from './icons'
import { usePortal } from './PortalProvider'

export function LoginModal() {
  const { loginOpen, closeModals, enterPortal } = usePortal()
  const titleId = useId()
  const noteId = useId()
  const firstFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (loginOpen) {
      const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 50)
      return () => window.clearTimeout(timer)
    }
  }, [loginOpen])

  if (!loginOpen) return null

  return (
    <div
      className="portal-modal-backdrop is-open"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModals()
      }}
    >
      <div
        className="portal-modal portal-modal--login"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="login-modal"
      >
        <div className="portal-modal__head">
          <div>
            <p className="portal-modal__kicker">Studio Aura</p>
            <h2 id={titleId}>Testa Mina sidor</h2>
            <p>En klickbar demo – ingen riktig inloggning sker.</p>
          </div>
          <button
            type="button"
            className="portal-modal__close"
            aria-label="Stäng"
            onClick={closeModals}
          >
            <Icons.close />
          </button>
        </div>
        <div className="portal-modal__body">
          <div className="demo-login-card">
            <span className="portal-avatar" aria-hidden="true">
              MS
            </span>
            <div>
              <strong>Demoanvändare: Maja</strong>
              <span>Saldo, bonus och besök är exempeldata.</span>
            </div>
          </div>
          <div className="portal-field">
            <label htmlFor="demoPhone">Mobilnummer</label>
            <input
              ref={firstFieldRef}
              id="demoPhone"
              inputMode="tel"
              defaultValue="070 123 45 42"
              aria-describedby={noteId}
            />
          </div>
          <div className="demo-note" id={noteId}>
            <Icons.info />
            <span>
              I skarp version kan detta ersättas av SMS-kod eller koppling till befintlig
              kundinloggning.
            </span>
          </div>
          <div className="portal-modal__actions">
            <button type="button" className="btn btn--ghost" onClick={closeModals}>
              Avbryt
            </button>
            <button type="button" className="btn" onClick={enterPortal}>
              Fortsätt till demo
              <Icons.arrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
