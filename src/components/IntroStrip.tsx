const stripItems = [
  'Glow with beauty',
  'Feel the aura',
  'Rött ljus',
  'Blått ljus',
  'Öppet 05:00–00:00',
  '4 kr / minut',
  'Strömsnäsbruk',
] as const

export function IntroStrip() {
  return (
    <div className="intro-strip" aria-hidden="true">
      <div className="intro-strip__track">
        {[0, 1].map((copy) => (
          <div className="intro-strip__group" key={copy}>
            {stripItems.map((item) => (
              <span className="intro-strip__item" key={`${copy}-${item}`}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
