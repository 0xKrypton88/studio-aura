import { assetPath } from '../assets'

export function HomeBlend() {
  return (
    <section
      className="section section--home"
      id="hem"
      data-testid="home-blend"
      aria-labelledby="home-blend-title"
    >
      <div className="section__inner home-blend" data-reveal>
        <div className="home-blend__copy">
          <p className="eyebrow">Välkommen hem</p>
          <h2 id="home-blend-title">Ett hem för ljus</h2>
          <p className="lede">
            Loungen tar emot dig som ett hem — varmt trä, stilla ljus, en plats att landa.
            Bakom den känslan väntar solrummet: rött och blått ljus i samma session, utan
            medicinska löften. Samma hus. Samma aura.
          </p>
          <dl className="home-blend__pair">
            <div>
              <dt>Hemmet</dt>
              <dd>En lounge att andas ut i, innan och efter din stund.</dd>
            </div>
            <div>
              <dt>Solrummet</dt>
              <dd>Modern solning med rött och blått ljus — mjukt, privat, ditt.</dd>
            </div>
          </dl>
        </div>

        <div className="home-blend__visual">
          <figure className="home-blend__frame home-blend__frame--lounge">
            <img
              data-testid="home-blend-lounge"
              src={assetPath('gallery/studio-07.jpg')}
              alt="Lounge hos Studio Aura med ljus, keramik och stilla detaljer"
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Lounge</figcaption>
          </figure>
          <figure className="home-blend__frame home-blend__frame--solar">
            <img
              data-testid="home-blend-solar"
              src={assetPath('gallery/studio-06.jpg')}
              alt="Solarium med varmt ljus hos Studio Aura"
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Solarium</figcaption>
          </figure>
          <figure className="home-blend__frame home-blend__frame--glow">
            <img
              src={assetPath('gallery/studio-05.jpg')}
              alt="Sol är liv — glöd och skönhet i Studio Auras uttryck"
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Glow</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
