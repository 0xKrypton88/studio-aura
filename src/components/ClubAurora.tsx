import { usePortal } from '../portal/PortalProvider'

const STARFALL_STREAKS = [
  { left: '12%', delay: '0s', duration: '7.5s', length: '2.4rem' },
  { left: '28%', delay: '2.1s', duration: '9s', length: '1.8rem' },
  { left: '47%', delay: '4.4s', duration: '8.2s', length: '2.8rem' },
  { left: '63%', delay: '1.2s', duration: '10s', length: '2rem' },
  { left: '78%', delay: '5.6s', duration: '7.8s', length: '2.6rem' },
  { left: '91%', delay: '3.3s', duration: '9.4s', length: '1.6rem' },
] as const

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
      <div
        className="club-aurora__aurora"
        data-testid="club-aurora-aurora"
        aria-hidden="true"
      />
      <div
        className="club-aurora__stars"
        data-testid="club-aurora-stars"
        aria-hidden="true"
      />
      <div
        className="club-aurora__starfall"
        data-testid="club-aurora-starfall"
        aria-hidden="true"
      >
        {STARFALL_STREAKS.map((streak) => (
          <span
            key={streak.left}
            className="club-aurora__streak"
            style={{
              left: streak.left,
              animationDelay: streak.delay,
              animationDuration: streak.duration,
              ['--streak-length' as string]: streak.length,
            }}
          />
        ))}
      </div>
      <span className="club-aurora__watermark" aria-hidden="true">
        AURORA
      </span>

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

        <article className="club-aurora__card" data-testid="club-aurora-card">
          <span
            className="club-aurora__card-aurora"
            data-testid="club-aurora-card-glow"
            aria-hidden="true"
          />
          <span className="club-aurora__card-pulse" aria-hidden="true" />
          <span
            className="club-aurora__card-orbit"
            data-testid="club-aurora-card-orbit"
            aria-hidden="true"
          />
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
