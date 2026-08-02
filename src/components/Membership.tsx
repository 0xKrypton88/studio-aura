import { useState, type FormEvent } from 'react'
import { site } from '../content'

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  over18: boolean
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  over18: false,
}

function buildMailto(values: FormState) {
  const subject = encodeURIComponent('Medlemsförfrågan – Studio Aura')
  const body = encodeURIComponent(
    [
      'Hej Studio Aura,',
      '',
      'Jag vill bli medlem och bekräftar att jag är över 18 år.',
      '',
      `Förnamn: ${values.firstName}`,
      `Efternamn: ${values.lastName}`,
      `E-post: ${values.email}`,
      `Telefon: ${values.phone}`,
      '',
      'Skickat via studioaura.se medlemsformulär (ingen serverlagring).',
    ].join('\n'),
  )
  return `${site.emailHref}?subject=${subject}&body=${body}`
}

export function Membership() {
  const [values, setValues] = useState<FormState>(initialState)
  const [ready, setReady] = useState(false)
  const [mailto, setMailto] = useState('')

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setMailto(buildMailto(values))
    setReady(true)
  }

  return (
    <section
      className="section section--membership"
      id="medlemskap"
      aria-labelledby="membership-title"
    >
      <div className="section__inner" data-reveal>
        <p className="eyebrow">Bli medlem</p>
        <h2 id="membership-title">Så blir du medlem</h2>
        <p className="lede">
          Tre tydliga steg till egen tillgång – utan krångel.
        </p>

        <ol className="steps">
          <li>
            <span className="steps__index">1</span>
            <div>
              <h3>Fyll i förfrågan</h3>
              <p>Skicka dina uppgifter via formuläret eller e-post.</p>
            </div>
          </li>
          <li>
            <span className="steps__index">2</span>
            <div>
              <h3>Få accessnummer</h3>
              <p>Efter registrering får du telefonnumret som låser upp dörren.</p>
            </div>
          </li>
          <li>
            <span className="steps__index">3</span>
            <div>
              <h3>Ring vid ankomst</h3>
              <p>Ring numret när du är på plats – sedan är studion öppen för dig.</p>
            </div>
          </li>
        </ol>

        <aside className="notice" role="note">
          <strong>Viktigt:</strong> Tar en medlem med en oregistrerad gäst debiteras{' '}
          {site.guestFee}. Alla som ska sola behöver vara registrerade medlemmar och fylla
          18 år.
        </aside>

        {!ready ? (
          <form
            className="membership-form"
            data-testid="membership-form"
            onSubmit={onSubmit}
            noValidate={false}
          >
            <p className="membership-form__intro">
              Fyll i dina uppgifter för att påbörja medlemskapet. Eftersom sidan saknar
              formulärbackend skickas inget till en server här – du slutför via din egen
              e-postklient i nästa steg.
            </p>

            <div className="field-grid">
              <label className="field">
                <span>Förnamn</span>
                <input
                  name="firstName"
                  autoComplete="given-name"
                  required
                  value={values.firstName}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Efternamn</span>
                <input
                  name="lastName"
                  autoComplete="family-name"
                  required
                  value={values.lastName}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>E-post</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Telefon</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  required
                  value={values.phone}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </label>
            </div>

            <label className="check">
              <input
                type="checkbox"
                name="over18"
                required
                checked={values.over18}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, over18: e.target.checked }))
                }
              />
              <span>Jag bekräftar att jag är över 18 år.</span>
            </label>

            <button type="submit" className="btn">
              Skicka medlemsförfrågan
            </button>
          </form>
        ) : (
          <div
            className="membership-status"
            data-testid="membership-status"
            data-state="ready-to-contact"
            role="status"
          >
            <h3>Nästa steg: skicka via din e-post</h3>
            <p>
              Dina uppgifter skickas inte till en server från den här sidan – det finns ingen
              formulärbackend. Öppna din e-postklient med knappen nedan för att skicka
              medlemsförfrågan till {site.email}, eller ring oss direkt.
            </p>
            <div className="membership-status__actions">
              <a className="btn" data-testid="membership-mailto" href={mailto}>
                Öppna e-postförfrågan
              </a>
              <a className="btn btn--ghost" href={site.phoneHref}>
                Ring {site.phoneDisplay}
              </a>
              <button
                type="button"
                className="text-link"
                onClick={() => setReady(false)}
              >
                Ändra uppgifter
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
