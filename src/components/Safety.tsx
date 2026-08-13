import { assetPath } from '../assets'

export function Safety() {
  return (
    <section className="section section--safety" id="sakerhet" aria-labelledby="safety-title">
      <div className="section__inner safety-layout" data-reveal>
        <figure className="safety-visual">
          <img
            src={assetPath('gallery/studio-04.jpg')}
            alt="Fönstertexten Glow with beauty and feel the aura hos Studio Aura"
            width={600}
            height={600}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            En bra upplevelse är också en ansvarsfull upplevelse.
          </figcaption>
        </figure>

        <div>
          <p className="eyebrow">Vår prioritet</p>
          <h2 id="safety-title">Trygghet, 18+ och ansvarsfull solning</h2>
          <p className="lede">
            För att du ska kunna sola tryggt har vår anläggning i Strömsnäsbruk ett
            passagesystem. All information du behöver för tillträde finns vid entrén och här på
            hemsidan. Kamerabevakning sker dygnet runt för ökad trygghet.
          </p>

          <ul className="plain-list">
            <li>
              <strong>Kontrollerad entré</strong>
              <span>Passagesystem ger tillträde efter medlemsregistrering.</span>
            </li>
            <li>
              <strong>Bevakning 24/7</strong>
              <span>Kameraövervakning för att stärka tryggheten i lokalen.</span>
            </li>
            <li>
              <strong>18-årsgräns enligt lag</strong>
              <span>Endast personer som fyllt 18 år får sola hos oss.</span>
            </li>
            <li>
              <strong>Exponering efter hudtyp</strong>
              <span>
                Följ exponeringsschemat i lokalen – rekommenderad tid varierar med hudtyp och
                vana. Börja försiktigt och öka gradvis.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
