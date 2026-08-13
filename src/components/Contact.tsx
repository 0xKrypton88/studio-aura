import { site } from '../content'

export function Contact() {
  return (
    <section className="section section--contact" id="kontakt" aria-labelledby="contact-title">
      <div className="section__inner" data-reveal>
        <p className="eyebrow">Kontakt</p>
        <h2 id="contact-title">Hitta till oss</h2>
        <p className="lede">Öppet varje dag – välkommen när det passar dig.</p>

        <div className="contact-shell">
          <div className="contact-grid">
            <div className="contact-block">
              <h3>Kontakta oss</h3>
              <p>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </p>
              <p>
                <a href={site.emailHref}>{site.email}</a>
              </p>
            </div>

            <div className="contact-block">
              <h3>Adress</h3>
              <p>
                <a href={site.mapsUrl} target="_blank" rel="noreferrer">
                  {site.addressLine}
                  <br />
                  {site.postalLine}
                </a>
              </p>
            </div>

            <div className="contact-block">
              <h3>Öppettider</h3>
              <p>{site.hours}</p>
            </div>
          </div>

          <div className="map-frame">
            <iframe
              title="Karta till Studio Aura"
              src="https://maps.google.com/maps?q=Lagastigsgatan%2063%2C%20287%2031%20Str%C3%B6msn%C3%A4sbruk&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="btn btn--ghost" href={site.mapsUrl} target="_blank" rel="noreferrer">
              Öppna i Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
