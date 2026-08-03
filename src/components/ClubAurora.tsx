import { usePortal } from '../portal/PortalProvider'

export function ClubAurora() {
  const { openLogin } = usePortal()

  return (
    <section
      className="section club-aurora"
      id="aura-club"
      data-testid="club-aurora"
      aria-labelledby="club-title"
    >
      <div className="club-aurora__glow" aria-hidden="true" />
      <div className="section__inner club-aurora__inner" data-reveal>
        <div className="club-aurora__copy">
          <p className="eyebrow club-aurora__eyebrow">Club Aurora</p>
          <h2 id="club-title">En egen värld, mitt i Studio Aura.</h2>
          <p className="lede club-aurora__lede">
            En avgränsad demoyta för hur Mina sidor kan kännas – privat översikt, tydligt saldo
            och lugna förmåner. Inga riktiga konton, köp eller bokningar.
          </p>
          <ul className="club-aurora__list">
            <li>
              <strong>Aura Credit</strong>
              <span>500 kr påfyllning kan ge 50 kr bonus i demot.</span>
            </li>
            <li>
              <strong>Referral Privilege</strong>
              <span>50 kr till dig och 50 kr till din vän – som koncept.</span>
            </li>
            <li>
              <strong>Private Overview</strong>
              <span>Saldo, besök och aktivitet samlade på ett ställe.</span>
            </li>
          </ul>
          <div className="club-aurora__actions">
            <button type="button" className="btn btn--ghost club-aurora__btn" onClick={openLogin}>
              Utforska Club Aurora
            </button>
          </div>
        </div>

        <article className="club-aurora__card">
          <span className="club-aurora__chip">VIP concept</span>
          <div className="club-aurora__card-amount">
            500
            <span>+ 50</span>
          </div>
          <p>Aurora Signature</p>
          <strong>PRIVATE MEMBER · 000184</strong>
          <button type="button" className="btn" onClick={openLogin}>
            Gå in
          </button>
        </article>
      </div>
    </section>
  )
}
