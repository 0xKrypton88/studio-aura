import { site } from '../content'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-brand">
      <div className="hero__media" aria-hidden="true">
        <img
          className="hero__image"
          src="/gallery/hero-atmosphere.jpg"
          srcSet="/gallery/hero-atmosphere-sm.jpg 960w, /gallery/hero-atmosphere.jpg 1920w"
          sizes="100vw"
          alt=""
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__wash" />
      </div>

      <div className="hero__content">
        <img
          className="hero__logo"
          src="/studio-aura-logo.png"
          width={220}
          height={220}
          alt=""
          decoding="async"
        />
        <p className="hero__eyebrow">Solarium i Strömsnäsbruk</p>
        <h1 id="hero-brand" className="hero__brand">
          {site.name}
        </h1>
        <p className="hero__tagline">{site.tagline}</p>
        <div className="hero__actions">
          <a className="btn" href="#medlemskap">
            Börja sola hos oss
          </a>
          <a className="btn btn--ghost" href="#tjanster">
            Upptäck solariet
          </a>
        </div>
      </div>
    </section>
  )
}
