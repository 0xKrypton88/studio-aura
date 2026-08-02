import { assetPath } from '../assets'
import { site } from '../content'

export function Hero() {
  return (
    <section
      className="hero"
      id="top"
      data-testid="hero"
      aria-labelledby="hero-brand"
    >
      <div className="hero__media" aria-hidden="true">
        <img
          className="hero__image"
          data-testid="hero-image"
          src={assetPath('gallery/hero-atmosphere.jpg')}
          srcSet={`${assetPath('gallery/hero-atmosphere-sm.jpg')} 960w, ${assetPath('gallery/hero-atmosphere.jpg')} 1920w`}
          sizes="100vw"
          alt=""
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__wash" />
        <div className="hero__grid" data-testid="hero-grid">
          <span className="hero__grid-line" data-testid="hero-grid-line" />
          <span className="hero__grid-line" data-testid="hero-grid-line" />
          <span className="hero__grid-line" data-testid="hero-grid-line" />
        </div>
        <div className="hero__aura" data-testid="hero-aura-glow">
          <svg
            className="hero__aura-svg"
            viewBox="0 0 1200 220"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="aura-stroke" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgba(168,148,92,0)" />
                <stop offset="35%" stopColor="rgba(168,148,92,0.55)" />
                <stop offset="50%" stopColor="rgba(196,174,110,0.85)" />
                <stop offset="65%" stopColor="rgba(168,148,92,0.55)" />
                <stop offset="100%" stopColor="rgba(168,148,92,0)" />
              </linearGradient>
              <filter id="aura-blur" x="-20%" y="-120%" width="140%" height="340%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
            <ellipse
              cx="600"
              cy="110"
              rx="420"
              ry="36"
              fill="rgba(70, 90, 48, 0.35)"
              filter="url(#aura-blur)"
            />
            <path
              d="M80 110 C 280 70, 420 150, 600 110 S 920 70, 1120 110"
              fill="none"
              stroke="url(#aura-stroke)"
              strokeWidth="1.25"
            />
          </svg>
        </div>
      </div>

      <div className="hero__layout">
        <div className="hero__content">
          <img
            className="hero__logo"
            src={assetPath('studio-aura-logo.png')}
            width={220}
            height={220}
            alt=""
            decoding="async"
          />
          <p className="hero__eyebrow" data-testid="hero-eyebrow">
            Solarium · Strömsnäsbruk
          </p>
          <h1 id="hero-brand" className="hero__brand">
            {site.name}
          </h1>
          <p className="hero__headline" data-testid="hero-headline">
            Glow with beauty & feel the aura
            <span className="hero__headline-accent" data-testid="hero-headline-accent">
              .
            </span>
          </p>
          <p className="hero__description" data-testid="hero-description">
            Solarium med röda och blå lampor i Strömsnäsbruk. Bli medlem och sola tryggt –
            öppet varje dag 05:00–00:00.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#medlemskap">
              Börja sola hos oss
            </a>
            <a className="btn btn--ghost" href="#tjanster">
              Upptäck solariet
            </a>
          </div>
        </div>

        <aside className="hero__glass" data-testid="hero-glass-card" aria-label="Studiofakta">
          <p className="hero__glass-eyebrow">Medlemsaccess</p>
          <p className="hero__glass-title">Öppet varje dag</p>
          <p className="hero__glass-value">{site.hours.replace('Alla dagar ', '')}</p>
          <p className="hero__glass-body">
            Kontrollerad entré, kameraövervakning 24/7 och 18+ enligt lag – för en trygg
            solupplevelse.
          </p>
        </aside>
      </div>
    </section>
  )
}
