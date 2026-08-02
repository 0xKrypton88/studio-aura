import { assetPath } from '../assets'

const bookingHref = assetPath('bokning/index.html')

export function BookingProgram() {
  return (
    <section
      className="section section--booking"
      id="bokningsprogram"
      data-testid="bokningsprogram"
      aria-labelledby="booking-title"
    >
      <div className="section__inner section__inner--narrow" data-reveal>
        <p className="eyebrow">För studion</p>
        <h2 id="booking-title">Bokningsprogram</h2>
        <p className="lede">
          Utforska Studio Auras bokningskalender – en fristående lokal prototyp för översikt,
          tider och kundflöde. Data sparas i localStorage i din webbläsare; ingen server eller
          backend är inkopplad.
        </p>
        <a className="btn" href={bookingHref}>
          Öppna bokningsprogram
        </a>
      </div>
    </section>
  )
}
