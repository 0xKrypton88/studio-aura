import { assetPath } from '../assets'
import { site } from '../content'
import { usePortal } from '../portal'

export function Hero() {
  const { openLogin } = usePortal()

  return (
    <section className="hero" id="top" aria-labelledby="hero-brand">
      <div className="hero__atmosphere" aria-hidden="true">
        <img
          src={assetPath('gallery/hero-atmosphere.jpg')}
          srcSet={`${assetPath('gallery/hero-atmosphere-sm.jpg')} 960w, ${assetPath('gallery/hero-atmosphere.jpg')} 1920w`}
          sizes="50vw"
          alt=""
          width={1920}
          height={1280}
          decoding="async"
        />
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">
            <span className="hero__live" aria-hidden="true" />
            Öppet varje dag · 05:00–00:00
          </p>
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
          <p className="hero__lead">
            Ett varmt hem för ljus i Strömsnäsbruk — loungevärme möter rött och blått
            solljus.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#medlemskap">
              Börja sola hos oss
            </a>
            <button type="button" className="btn btn--ghost" onClick={openLogin}>
              Mina sidor
            </button>
          </div>
          <ul className="hero__facts">
            <li>{site.prices.perMinute.amount} / minut</li>
            <li>{site.addressLine}</li>
            <li>18+ enligt lag</li>
          </ul>
        </div>

        <div className="hero__visual">
          <div className="hero__orbit" aria-hidden="true" />
          <figure className="hero__photo hero__photo--home">
            <img
              data-testid="hero-home-photo"
              src={assetPath('gallery/studio-02.jpg')}
              alt="Lounge och väntrum hos Studio Aura"
              width={1200}
              height={1200}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          <figure className="hero__photo hero__photo--solar">
            <img
              data-testid="hero-solar-photo"
              src={assetPath('gallery/studio-01.jpg')}
              alt="Solarium med rött och blått ljus"
              width={1200}
              height={1200}
              decoding="async"
            />
          </figure>
          <aside className="hero__chip" aria-hidden="true">
            <span>Minutpris</span>
            <strong>{site.prices.perMinute.amount}</strong>
            <small>15 min · {site.prices.fifteen.amount}</small>
          </aside>
        </div>
      </div>

      <a className="hero__scroll" href="#hem">
        <span className="hero__scroll-label">Välkommen in</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}
