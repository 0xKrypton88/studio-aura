export function Services() {
  return (
    <section className="section section--services" id="tjanster" aria-labelledby="services-title">
      <div className="section__inner" data-reveal>
        <p className="eyebrow">Solarium</p>
        <h2 id="services-title">Rött och blått ljus i samma session</h2>
        <p className="lede">
          Hos Studio Aura kombinerar vi traditionell solning med röda och blå lampor –
          en modern studioatmosfär, utan medicinska löften.
        </p>

        <div className="light-split">
          <article className="light-panel light-panel--red">
            <span className="light-panel__orb" aria-hidden="true" />
            <h3>Röda lampor</h3>
            <p>
              Rött ljus används ofta för att stödja hudens upplevda spänst och glöd genom att
              stimulera kollagenrelaterade processer i huden. Många upplever också en mer
              avslappnande session med ökad cirkulationskänsla.
            </p>
          </article>
          <article className="light-panel light-panel--blue">
            <span className="light-panel__orb" aria-hidden="true" />
            <h3>Blå lampor</h3>
            <p>
              Blått ljus förknippas med mer jämn hudton och kan bidra till en renare känsla i
              huden. Det används ofta i skönhetssammanhang vid orenheter – utan att ersätta
              hudvård eller vårdkontakt vid besvär.
            </p>
          </article>
        </div>

        <p className="section__note">
          Tillsammans ger rött och blått ljus en modern solstudio-upplevelse: blått ljus för
          mer omedelbar känsla, rött ljus för ett lugnare, långsiktigare arbete med hudens
          uttryck. Välkommen in och känn skillnaden själv.
        </p>
      </div>
    </section>
  )
}
