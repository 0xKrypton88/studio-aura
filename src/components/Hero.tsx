import { assetPath } from '../assets'
import { site } from '../content'
import { usePortal } from '../portal'

export function Hero() {
  const { openLogin } = usePortal()

  return (
    <section className="hero" id="top" aria-labelledby="hero-brand">
      <div className="hero__media" aria-hidden="true">
        <img
          className="hero__image"
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
        <div className="hero__glow" />
      </div>

      <div className="hero__content">
        <img
          className="hero__logo"
          src={assetPath('studio-aura-logo.png')}
          width={220}
          height={220}
          alt=""
          decoding="async"
        />
        <h1 id="hero-brand" className="hero__brand">
          {site.name}
        </h1>
        <p className="hero__tagline">{site.tagline}</p>
        <div className="hero__actions">
          <a className="btn" href="#medlemskap">
            Börja sola hos oss
          </a>
          <button type="button" className="btn btn--ghost" onClick={openLogin}>
            Mina sidor
          </button>
        </div>
      </div>

      <a className="hero__scroll" href="#tjanster">
        <span className="hero__scroll-label">Utforska</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}
