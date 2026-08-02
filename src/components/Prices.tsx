import { site } from '../content'

export function Prices() {
  return (
    <section className="section section--prices" id="priser" aria-labelledby="prices-title">
      <div className="section__inner" data-reveal>
        <p className="eyebrow">Våra priser</p>
        <h2 id="prices-title">Enkel, transparent prissättning</h2>
        <p className="lede">
          Aktuella priser för solning. Hör av dig om du har frågor innan du kommer.
        </p>

        <div className="price-row" role="list">
          <div className="price-item" role="listitem">
            <p className="price-item__label">{site.prices.perMinute.label}</p>
            <p className="price-item__amount">{site.prices.perMinute.amount}</p>
            <p className="price-item__detail">{site.prices.perMinute.detail}</p>
          </div>
          <div className="price-item" role="listitem">
            <p className="price-item__label">{site.prices.fifteen.label}</p>
            <p className="price-item__amount">{site.prices.fifteen.amount}</p>
            <p className="price-item__detail">{site.prices.fifteen.detail}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
