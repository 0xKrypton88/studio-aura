import { galleryImages } from '../content'

export function Gallery() {
  return (
    <section className="section section--gallery" id="galleri" aria-labelledby="gallery-title">
      <div className="section__inner" data-reveal>
        <p className="eyebrow">Galleri</p>
        <h2 id="gallery-title">Känslan i studion</h2>
        <p className="lede">En glimt av miljön hos Studio Aura.</p>

        <ul className="gallery-mosaic">
          {galleryImages.map((image) => (
            <li key={image.src}>
              <figure>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
