import { assetPath } from '../assets'
import { site } from '../content'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img
            src={assetPath('brand/logo-192.png')}
            width={56}
            height={56}
            alt=""
            decoding="async"
          />
          <div>
            <p className="site-footer__name">{site.name}</p>
            <p>Ett hem för ljus i Strömsnäsbruk</p>
          </div>
        </div>
        <p className="site-footer__meta">
          {site.addressLine}, {site.postalLine} · {site.hours}
        </p>
        <p className="site-footer__tagline">{site.tagline}</p>
        <p className="site-footer__legal">
          © {new Date().getFullYear()} {site.name}. 18-årsgräns enligt lag.
        </p>
      </div>
    </footer>
  )
}
