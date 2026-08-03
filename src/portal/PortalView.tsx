import { useState } from 'react'
import { assetPath } from '../assets'
import { Icons } from './icons'
import { usePortal } from './PortalProvider'
import {
  PANEL_TITLES,
  REFERRAL_CODE,
  formatKr,
  type PortalPanel,
  type Transaction,
} from './state'

function TxIcon({ kind }: { kind: Transaction['kind'] }) {
  if (kind === 'bonus') return <Icons.gift />
  if (kind === 'spend') return <Icons.visit />
  return <Icons.plus />
}

function NavButton({
  panel,
  label,
  badge,
  active,
  onSelect,
}: {
  panel: PortalPanel
  label: string
  badge?: string
  active: boolean
  onSelect: (panel: PortalPanel) => void
}) {
  const Icon =
    panel === 'overview'
      ? Icons.home
      : panel === 'wallet'
        ? Icons.wallet
        : panel === 'visits'
          ? Icons.visit
          : panel === 'benefits'
            ? Icons.gift
            : Icons.user

  return (
    <button
      type="button"
      className={active ? 'portal-nav-btn is-active' : 'portal-nav-btn'}
      aria-current={active ? 'page' : undefined}
      onClick={() => onSelect(panel)}
    >
      <span className="portal-nav-btn__icon">
        <Icon />
      </span>
      {label}
      {badge ? <span className="portal-nav-btn__badge">{badge}</span> : null}
    </button>
  )
}

export function PortalView() {
  const {
    panel,
    balances,
    transactions,
    setPanel,
    openTopup,
    useBonus,
    toggleScenario,
    resetDemo,
    leavePortal,
    copyReferral,
    downloadCsv,
    showToast,
  } = usePortal()
  const [showExtraVisits, setShowExtraVisits] = useState(false)
  const [prefs, setPrefs] = useState({
    sms: true,
    offers: false,
    activity: true,
  })

  const total = balances.paid + balances.bonus
  const safe = balances.scenario === 'safe'
  const logo = assetPath('brand/logo-64.png')

  return (
    <div className="portal-view" aria-label="Demo av kundportal" data-testid="portal-shell">
      <div className="portal-shell">
        <aside className="portal-sidebar">
          <button
            type="button"
            className="portal-brand"
            data-testid="portal-home"
            onClick={leavePortal}
          >
            <img src={logo} width={44} height={44} alt="" />
            <span>
              <strong>Studio Aura</strong>
              <span>Mina sidor</span>
            </span>
          </button>
          <div className="portal-demo-label">
            <span className="live-dot" aria-hidden="true" />
            Interaktiv demo
          </div>
          <nav className="portal-nav" aria-label="Portalmeny">
            <NavButton
              panel="overview"
              label="Översikt"
              active={panel === 'overview'}
              onSelect={setPanel}
            />
            <NavButton
              panel="wallet"
              label="Saldo & bonus"
              active={panel === 'wallet'}
              onSelect={setPanel}
            />
            <NavButton
              panel="visits"
              label="Mina besök"
              badge="18"
              active={panel === 'visits'}
              onSelect={setPanel}
            />
            <NavButton
              panel="benefits"
              label="Förmåner"
              badge="2"
              active={panel === 'benefits'}
              onSelect={setPanel}
            />
            <NavButton
              panel="profile"
              label="Min profil"
              active={panel === 'profile'}
              onSelect={setPanel}
            />
          </nav>
          <div className="portal-side-bottom">
            <button type="button" className="portal-side-link" onClick={resetDemo}>
              <Icons.settings />
              Återställ demo
            </button>
            <button
              type="button"
              className="portal-side-link"
              onClick={() =>
                showToast('Hjälp & kontakt skulle öppnas i den skarpa portalen.')
              }
            >
              <Icons.help />
              Hjälp & kontakt
            </button>
            <button type="button" className="portal-side-link" onClick={leavePortal}>
              <Icons.logout />
              Till hemsidan
            </button>
          </div>
        </aside>

        <main className="portal-main">
          <header className="portal-topbar">
            <button
              type="button"
              className="portal-brand portal-brand--mobile"
              onClick={leavePortal}
              aria-label="Till hemsidan"
            >
              <img src={logo} width={36} height={36} alt="" />
              <span>
                <strong>Studio Aura</strong>
                <span>Mina sidor</span>
              </span>
            </button>
            <div className="portal-page-heading">
              <small>Mina sidor</small>
              <strong>{PANEL_TITLES[panel]}</strong>
            </div>
            <div className="portal-user-menu">
              <button
                type="button"
                className="scenario-btn"
                title="Byt mellan gul och grön aktivitetsstatus"
                onClick={toggleScenario}
              >
                Byt demoscenario
              </button>
              <span className="portal-avatar" aria-label="Testanvändare Maja">
                MS
              </span>
            </div>
          </header>

          <div className="portal-content">
            {panel === 'overview' ? (
              <section
                className="portal-panel is-active"
                aria-labelledby="overview-title"
                data-testid="panel-overview"
              >
                <div className="portal-welcome">
                  <div>
                    <h1 id="overview-title">Hej Maja, välkommen tillbaka.</h1>
                    <p>En snabb lägesbild över din aktivitet och senaste besök.</p>
                  </div>
                  <span className="last-sync">Demo uppdaterad precis nu</span>
                </div>

                <div className="overview-layout">
                  <article
                    className={
                      safe
                        ? 'portal-card status-card status-card--hero safe-mode'
                        : 'portal-card status-card status-card--hero'
                    }
                  >
                    <div className="card-heading">
                      <h2>Din aktivitet</h2>
                      <Icons.trend />
                    </div>
                    <div className={safe ? 'activity-status safe' : 'activity-status warning'}>
                      <span className="status-icon">
                        {safe ? <Icons.check /> : <Icons.alert />}
                      </span>
                      <div>
                        <strong>
                          {safe
                            ? 'Bra avstånd mellan besöken'
                            : 'Lite tätt mellan besöken'}
                        </strong>
                        <p>
                          {safe
                            ? 'Senaste registrerade besöket var fyra dagar sedan. Fortsätt följa exponeringsschemat och känn efter hur huden reagerar.'
                            : 'Senaste registrerade besöket var igår. Vänta tills minst två dygn har gått och följ alltid exponeringsschemat.'}
                        </p>
                      </div>
                    </div>
                    <div className="status-meter">
                      <div className="status-meter-label">
                        <span>Besöksfrekvens senaste 7 dagarna</span>
                        <strong>{safe ? '1 besök' : '3 besök'}</strong>
                      </div>
                      <div className={safe ? 'meter meter--safe' : 'meter'}>
                        <span />
                      </div>
                    </div>
                  </article>

                  <div className="stats-row">
                    <article className="portal-card stat-card">
                      <div className="stat-top">
                        <span>Totalt antal besök</span>
                        <Icons.visit />
                      </div>
                      <div className="stat-value">18</div>
                      <div className="stat-caption">sedan januari</div>
                    </article>
                    <article className="portal-card stat-card">
                      <div className="stat-top">
                        <span>Total soltid</span>
                        <Icons.clock />
                      </div>
                      <div className="stat-value">3 h 42 m</div>
                      <div className="stat-caption">registrerad tid</div>
                    </article>
                    <article className="portal-card stat-card">
                      <div className="stat-top">
                        <span>Genomsnitt</span>
                        <Icons.trend />
                      </div>
                      <div className="stat-value">12 min</div>
                      <div className="stat-caption">per besök</div>
                    </article>
                    <article className="portal-card stat-card">
                      <div className="stat-top">
                        <span>Medlem sedan</span>
                        <Icons.calendar />
                      </div>
                      <div className="stat-value">8 mån</div>
                      <div className="stat-caption">demo-medlemskap</div>
                    </article>
                  </div>

                  <div className="dashboard-lower">
                    <article
                      className={
                        showExtraVisits
                          ? 'portal-card history-card show-extra'
                          : 'portal-card history-card'
                      }
                    >
                      <div className="card-heading">
                        <h3>Senaste besöken</h3>
                        <button
                          type="button"
                          className="small-link"
                          onClick={() => setShowExtraVisits((value) => !value)}
                        >
                          {showExtraVisits ? 'Visa färre' : 'Visa fler'}
                        </button>
                      </div>
                      <div className="visit-list">
                        <div className="visit-row">
                          <div className="visit-date">
                            <strong>Igår · 19.42</strong>
                            <span>Besök registrerat</span>
                          </div>
                          <div className="visit-cell">
                            <span>Tid</span>
                            <strong>12 min</strong>
                          </div>
                          <div className="visit-cell">
                            <span>Kostnad</span>
                            <strong>48 kr</strong>
                          </div>
                          <span className="visit-status">
                            <Icons.check />
                          </span>
                        </div>
                        <div className="visit-row">
                          <div className="visit-date">
                            <strong>3 dagar sedan · 18.05</strong>
                            <span>Besök registrerat</span>
                          </div>
                          <div className="visit-cell">
                            <span>Tid</span>
                            <strong>10 min</strong>
                          </div>
                          <div className="visit-cell">
                            <span>Kostnad</span>
                            <strong>40 kr</strong>
                          </div>
                          <span className="visit-status">
                            <Icons.check />
                          </span>
                        </div>
                        <div className="visit-row">
                          <div className="visit-date">
                            <strong>6 dagar sedan · 20.14</strong>
                            <span>Besök registrerat</span>
                          </div>
                          <div className="visit-cell">
                            <span>Tid</span>
                            <strong>15 min</strong>
                          </div>
                          <div className="visit-cell">
                            <span>Kostnad</span>
                            <strong>60 kr</strong>
                          </div>
                          <span className="visit-status">
                            <Icons.check />
                          </span>
                        </div>
                        <div className="visit-row extra-row">
                          <div className="visit-date">
                            <strong>12 dagar sedan · 17.32</strong>
                            <span>Besök registrerat</span>
                          </div>
                          <div className="visit-cell">
                            <span>Tid</span>
                            <strong>12 min</strong>
                          </div>
                          <div className="visit-cell">
                            <span>Kostnad</span>
                            <strong>48 kr</strong>
                          </div>
                          <span className="visit-status">
                            <Icons.check />
                          </span>
                        </div>
                        <div className="visit-row extra-row">
                          <div className="visit-date">
                            <strong>18 dagar sedan · 19.06</strong>
                            <span>Besök registrerat</span>
                          </div>
                          <div className="visit-cell">
                            <span>Tid</span>
                            <strong>11 min</strong>
                          </div>
                          <div className="visit-cell">
                            <span>Kostnad</span>
                            <strong>44 kr</strong>
                          </div>
                          <span className="visit-status">
                            <Icons.check />
                          </span>
                        </div>
                      </div>
                    </article>

                    <article className="portal-card referral-card">
                      <h3>
                        50 kr till dig.
                        <br />
                        50 kr till din vän.
                      </h3>
                      <p>
                        Dela din kod. Bonusen aktiveras i konceptet när vännen gjort sin första
                        godkända insättning.
                      </p>
                      <div className="referral-code">
                        <strong>{REFERRAL_CODE}</strong>
                        <button
                          type="button"
                          className="copy-btn"
                          aria-label="Kopiera värvningskod"
                          onClick={() => void copyReferral()}
                        >
                          <Icons.copy />
                        </button>
                      </div>
                      <div className="referral-foot">Demo av möjlig värvningsfunktion.</div>
                    </article>
                  </div>
                </div>
              </section>
            ) : null}

            {panel === 'wallet' ? (
              <section
                className="portal-panel is-active"
                aria-labelledby="wallet-title"
                data-testid="panel-wallet"
              >
                <div className="panel-header">
                  <div>
                    <h1 id="wallet-title">Saldo &amp; bonus</h1>
                    <p>Här samlas allt saldo – påfyllning, bonus och historik.</p>
                  </div>
                  <div className="wallet-total-chip" aria-label="Totalt tillgängligt">
                    <span>Totalt</span>
                    <strong>
                      <span data-testid="total-balance">{formatKr(total)}</span> kr
                    </strong>
                  </div>
                </div>

                <div className="wallet-ledger">
                  <article className="portal-card ledger-column ledger-column--paid">
                    <span className="card-overline">Insatt saldo</span>
                    <div className="ledger-amount">
                      <span data-testid="paid-balance">{formatKr(balances.paid)}</span>
                      <small>kr</small>
                    </div>
                    <p className="ledger-copy">
                      Pengar du fyllt på i demot. Används först vid besök i ett skarpt system.
                    </p>
                    <button type="button" className="btn btn-block" onClick={openTopup}>
                      <Icons.plus />
                      Fyll på saldo
                    </button>
                  </article>

                  <article className="portal-card ledger-column ledger-column--bonus">
                    <span className="card-overline">Aura Bonus</span>
                    <div className="ledger-amount">
                      <span data-testid="bonus-balance">{formatKr(balances.bonus)}</span>
                      <small>kr</small>
                    </div>
                    <p className="ledger-copy">
                      Intjänad bonus i demot. Totalt intjänat:{' '}
                      <strong data-testid="earned-bonus">{formatKr(balances.earned)} kr</strong>.
                    </p>
                    <div className="progress-wrap">
                      <div className="progress-bar">
                        <span />
                      </div>
                    </div>
                    <button type="button" className="btn btn--ghost btn-block" onClick={useBonus}>
                      Använd 50 kr Aura Bonus
                    </button>
                  </article>
                </div>

                <article className="portal-card topup-promo topup-promo--banner">
                  <div className="topup-promo__copy">
                    <span className="card-overline">Medlemsförmån i demot</span>
                    <h2>
                      Fyll på 500 kr
                      <span> få 50 kr bonus</span>
                    </h2>
                    <p>
                      Simulera en påfyllning och se hur både saldo, bonus och transaktionslistan
                      uppdateras direkt. Inga pengar dras.
                    </p>
                  </div>
                  <button type="button" className="btn" onClick={openTopup}>
                    Prova påfyllning
                  </button>
                </article>

                <article className="portal-card transaction-card">
                  <div className="card-heading">
                    <h2>Transaktioner</h2>
                    <button type="button" className="small-link" onClick={downloadCsv}>
                      Ladda ned demo
                    </button>
                  </div>
                  <div className="transaction-list">
                    {transactions.map((tx) => (
                      <div className="transaction-row" key={tx.id}>
                        <span
                          className={`tx-icon ${tx.kind === 'bonus' ? 'bonus' : ''} ${tx.kind === 'spend' ? 'spend' : ''}`}
                        >
                          <TxIcon kind={tx.kind} />
                        </span>
                        <div className="tx-copy">
                          <strong>{tx.title}</strong>
                          <span>{tx.detail}</span>
                        </div>
                        <div className="tx-amount">
                          <strong className={tx.amount >= 0 ? 'positive' : 'negative'}>
                            {tx.amount >= 0 ? '+' : '−'}
                            {formatKr(Math.abs(tx.amount))} kr
                          </strong>
                          <span>{tx.dateLabel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
            ) : null}

            {panel === 'visits' ? (
              <section className="portal-panel is-active" aria-labelledby="visits-title">
                <div className="panel-header">
                  <div>
                    <h1 id="visits-title">Mina besök</h1>
                    <p>Översikt över registrerad tid, historik och en lugn aktivitetsöversyn.</p>
                  </div>
                </div>
                <div className="visit-page-grid">
                  <article className="portal-card chart-card">
                    <div className="card-heading">
                      <h2>Besök senaste 8 veckorna</h2>
                      <Icons.trend />
                    </div>
                    <div className="bar-chart" aria-label="Stapeldiagram över besök per vecka" data-testid="visit-bar-chart">
                      {[34, 52, 31, 68, 42, 50, 38, 72].map((height, index) => (
                        <div className="bar-wrap" key={`week-${21 + index}`}>
                          <div
                            className="bar"
                            data-testid="visit-bar"
                            data-height={height}
                            style={{ ['--h' as string]: `${height}%` }}
                          />
                          <span className="bar-label">v.{21 + index}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                  <article className="portal-card insight-card">
                    <div className="card-heading">
                      <h2>Aktivitetsnivå</h2>
                      <Icons.info />
                    </div>
                    <div className="frequency-ring">
                      <div className="ring-copy">
                        <strong>3</strong>
                        <span>besök / 7 dagar</span>
                      </div>
                    </div>
                    <div className="activity-status warning">
                      <span className="status-icon">
                        <Icons.alert />
                      </span>
                      <div>
                        <strong>Ta lite extra paus</strong>
                        <p>
                          Den här indikatorn är ett koncept, inte medicinsk rådgivning. Följ
                          alltid officiella råd och exponeringsschemat.
                        </p>
                      </div>
                    </div>
                  </article>
                  <article className="portal-card visit-table-card">
                    <div className="card-heading">
                      <h2>Full historik</h2>
                      <button
                        type="button"
                        className="small-link"
                        onClick={() =>
                          showToast('Export av besökshistorik är endast förberedd i demot.')
                        }
                      >
                        Exportera
                      </button>
                    </div>
                    <div className="full-visit-row header">
                      <span>Datum</span>
                      <span>Soltid</span>
                      <span>Kostnad</span>
                      <span>Status</span>
                    </div>
                    {[
                      ['Igår, 19.42', '12 min', '48 kr'],
                      ['3 dagar sedan, 18.05', '10 min', '40 kr'],
                      ['6 dagar sedan, 20.14', '15 min', '60 kr'],
                      ['12 dagar sedan, 17.32', '12 min', '48 kr'],
                      ['18 dagar sedan, 19.06', '11 min', '44 kr'],
                    ].map(([date, time, cost]) => (
                      <div className="full-visit-row" key={date}>
                        <strong>{date}</strong>
                        <span>{time}</span>
                        <span>{cost}</span>
                        <span className="positive">Registrerat</span>
                      </div>
                    ))}
                  </article>
                </div>
              </section>
            ) : null}

            {panel === 'benefits' ? (
              <section className="portal-panel is-active" aria-labelledby="benefits-title">
                <div className="panel-header">
                  <div>
                    <h1 id="benefits-title">Dina förmåner</h1>
                    <p>Få och tydliga erbjudanden i stället för ett rörigt poängsystem.</p>
                  </div>
                </div>
                <div className="benefits-grid">
                  <article className="portal-card benefit-card featured">
                    <span className="benefit-icon">
                      <Icons.gift />
                    </span>
                    <h3>500 kr blir 550 kr</h3>
                    <p>Fyll på 500 kr och få 50 kr extra som Aura Bonus.</p>
                    <button type="button" className="btn btn--ghost" onClick={openTopup}>
                      Använd erbjudandet
                    </button>
                  </article>
                  <article className="portal-card benefit-card">
                    <span className="benefit-icon">
                      <Icons.user />
                    </span>
                    <h3>Värva en vän</h3>
                    <p>
                      När vännen gjort sin första godkända insättning får ni 50 kr vardera.
                    </p>
                    <div className="coupon">
                      <span>{REFERRAL_CODE}</span>
                      <button
                        type="button"
                        className="small-link"
                        onClick={() => void copyReferral()}
                      >
                        Kopiera
                      </button>
                    </div>
                  </article>
                  <article className="portal-card benefit-card">
                    <span className="benefit-icon">
                      <Icons.calendar />
                    </span>
                    <h3>Födelsedagsbonus</h3>
                    <p>
                      Ett enkelt exempel på en personlig förmån som kan aktiveras under
                      födelsedagsmånaden.
                    </p>
                    <button
                      type="button"
                      className="small-link"
                      onClick={() =>
                        showToast('Förmånen visas som koncept och är inte aktiverad.')
                      }
                    >
                      Läs villkor
                    </button>
                  </article>
                  <article className="portal-card benefit-card">
                    <span className="benefit-icon">
                      <Icons.shield />
                    </span>
                    <h3>Servicegaranti</h3>
                    <p>
                      Rapportera ett verifierat problem och få snabb återkoppling eller
                      kompensation.
                    </p>
                    <button
                      type="button"
                      className="small-link"
                      onClick={() =>
                        showToast('Ett supportärende skulle öppnas i den skarpa portalen.')
                      }
                    >
                      Rapportera problem
                    </button>
                  </article>
                  <article className="portal-card benefit-card">
                    <span className="benefit-icon">
                      <Icons.spark />
                    </span>
                    <h3>Medlemsjubileum</h3>
                    <p>
                      En mindre bonus när du varit medlem ett år – utan att kopplas till tätare
                      solning.
                    </p>
                    <button
                      type="button"
                      className="small-link"
                      onClick={() =>
                        showToast('Maja har varit medlem i 8 månader i demot.')
                      }
                    >
                      Se medlemsdatum
                    </button>
                  </article>
                  <article className="portal-card benefit-card">
                    <span className="benefit-icon">
                      <Icons.mail />
                    </span>
                    <h3>Personliga nyheter</h3>
                    <p>Välj själv om du vill få relevanta erbjudanden och driftinformation.</p>
                    <button
                      type="button"
                      className="small-link"
                      onClick={() => setPanel('profile')}
                    >
                      Hantera utskick
                    </button>
                  </article>
                </div>
              </section>
            ) : null}

            {panel === 'profile' ? (
              <section className="portal-panel is-active" aria-labelledby="profile-title">
                <div className="panel-header">
                  <div>
                    <h1 id="profile-title">Min profil</h1>
                    <p>Endast den information som behövs för medlemskapet.</p>
                  </div>
                </div>
                <div className="profile-grid">
                  <article className="portal-card profile-card profile-identity">
                    <div className="profile-avatar">MS</div>
                    <h2>Maja Svensson</h2>
                    <p>Demo-medlem · 07X-XXX XX 42</p>
                    <div className="member-since">Medlem sedan 14 november 2025</div>
                    <button
                      type="button"
                      className="btn btn--ghost btn-block"
                      onClick={() =>
                        showToast('Profilredigering är inte aktiverad i mockupen.')
                      }
                    >
                      Redigera uppgifter
                    </button>
                  </article>
                  <article className="portal-card profile-card">
                    <div className="card-heading">
                      <h2>Inställningar</h2>
                      <Icons.settings />
                    </div>
                    <div className="settings-list">
                      {(
                        [
                          ['sms', 'SMS-notiser', 'Driftinformation och viktiga kontohändelser'],
                          ['offers', 'Erbjudanden via SMS', 'Bonus och medlemsförmåner'],
                          [
                            'activity',
                            'Aktivitetsvarning',
                            'Visa en lugn varning vid täta registrerade besök',
                          ],
                        ] as const
                      ).map(([key, title, detail]) => (
                        <div className="setting-row" key={key}>
                          <div>
                            <strong>{title}</strong>
                            <span>{detail}</span>
                          </div>
                          <button
                            type="button"
                            className={prefs[key] ? 'switch is-on' : 'switch'}
                            aria-label={`Växla ${title}`}
                            aria-pressed={prefs[key]}
                            onClick={() => {
                              const next = !prefs[key]
                              setPrefs((current) => ({ ...current, [key]: next }))
                              showToast(
                                next
                                  ? 'Inställningen är på i demot.'
                                  : 'Inställningen är av i demot.',
                              )
                            }}
                          />
                        </div>
                      ))}
                      <div className="setting-row">
                        <div>
                          <strong>E-post</strong>
                          <span>maja.svensson@example.se</span>
                        </div>
                        <span className="setting-value">Verifierad</span>
                      </div>
                      <div className="setting-row">
                        <div>
                          <strong>Integritet</strong>
                          <span>Se hur dina uppgifter används i konceptet</span>
                        </div>
                        <button
                          type="button"
                          className="small-link"
                          onClick={() =>
                            showToast('Integritetspolicyn skulle öppnas här.')
                          }
                        >
                          Visa
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              </section>
            ) : null}
          </div>
        </main>
      </div>

      <nav className="portal-mobile-nav" aria-label="Mobil portalmeny">
        <NavButton
          panel="overview"
          label="Översikt"
          active={panel === 'overview'}
          onSelect={setPanel}
        />
        <NavButton
          panel="wallet"
          label="Saldo"
          active={panel === 'wallet'}
          onSelect={setPanel}
        />
        <NavButton
          panel="visits"
          label="Besök"
          active={panel === 'visits'}
          onSelect={setPanel}
        />
        <NavButton
          panel="benefits"
          label="Förmåner"
          active={panel === 'benefits'}
          onSelect={setPanel}
        />
        <NavButton
          panel="profile"
          label="Profil"
          active={panel === 'profile'}
          onSelect={setPanel}
        />
      </nav>
    </div>
  )
}
