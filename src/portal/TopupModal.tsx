import { useEffect, useId, useRef } from 'react'
import { Icons } from './icons'
import { usePortal } from './PortalProvider'
import { TOPUP_OPTIONS, formatKr } from './state'

export function TopupModal() {
  const {
    topupOpen,
    closeModals,
    selectedTopup,
    setSelectedTopup,
    confirmTopup,
  } = usePortal()
  const titleId = useId()
  const firstOptionRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (topupOpen) {
      const timer = window.setTimeout(() => firstOptionRef.current?.focus(), 50)
      return () => window.clearTimeout(timer)
    }
  }, [topupOpen])

  if (!topupOpen) return null

  const total = selectedTopup.amount + selectedTopup.bonus

  return (
    <div
      className="portal-modal-backdrop is-open"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModals()
      }}
    >
      <div
        className="portal-modal portal-modal--topup"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="topup-modal"
      >
        <div className="portal-modal__head">
          <div>
            <h2 id={titleId}>Fyll på saldo</h2>
            <p>Testläge – inga pengar dras.</p>
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
          <div className="topup-options">
            {TOPUP_OPTIONS.map((option, index) => {
              const selected =
                option.amount === selectedTopup.amount &&
                option.bonus === selectedTopup.bonus
              return (
                <button
                  key={option.amount}
                  ref={index === 1 ? firstOptionRef : undefined}
                  type="button"
                  className={selected ? 'topup-option is-selected' : 'topup-option'}
                  onClick={() => setSelectedTopup(option)}
                >
                  {option.bonus > 0 ? (
                    <span className="bonus-pill">+{option.bonus} bonus</span>
                  ) : null}
                  <strong>{formatKr(option.amount)} kr</strong>
                  <span>
                    {option.bonus > 0
                      ? `${formatKr(option.amount + option.bonus)} kr totalt`
                      : `${formatKr(option.amount)} kr saldo`}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="topup-summary">
            <div>
              <span>Du får totalt</span>
              <strong>{formatKr(total)} kr</strong>
            </div>
            <span>
              {formatKr(selectedTopup.amount)} saldo
              {selectedTopup.bonus ? ` + ${selectedTopup.bonus} bonus` : ''}
            </span>
          </div>
          <div className="demo-note">
            <Icons.info />
            <span>
              Det här simulerar endast portalupplevelsen. Betalning och synk mot nuvarande
              system ingår inte.
            </span>
          </div>
          <div className="portal-modal__actions">
            <button type="button" className="btn btn--ghost" onClick={closeModals}>
              Avbryt
            </button>
            <button type="button" className="btn" onClick={confirmTopup}>
              Simulera insättning
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
