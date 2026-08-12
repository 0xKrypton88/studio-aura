import { useEffect, useId, useState } from 'react'
import { assetPath } from '../assets'
import { navItems, site } from '../content'
import { usePortal } from '../portal'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navId = useId()
  const { openLogin } = usePortal()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.body.classList.add('nav-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('nav-open')
    }
  }, [open])

  const headerClass = [
    'site-header',
    scrolled || open ? 'is-scrolled' : '',
    open ? 'is-nav-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <div className="site-header__inner">
        <a className="brand-mark" href="#top" aria-label={`${site.name} – till toppen`}>
          <img
            src={assetPath('brand/logo-192.png')}
            width={44}
            height={44}
            alt=""
            decoding="async"
          />
          <span className="brand-mark__text">{site.name}</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          data-testid="nav-toggle"
          aria-controls={navId}
          aria-expanded={open}
          aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle__bars" aria-hidden="true" />
        </button>

        <nav
          id={navId}
          className={open ? 'site-nav is-open' : 'site-nav'}
          data-testid="site-nav"
          aria-label="Huvudmeny"
        >
          <ul className="site-nav__list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="site-nav__actions">
            <button
              type="button"
              className="btn btn--ghost btn--small"
              data-testid="open-mina-sidor"
              onClick={() => {
                setOpen(false)
                openLogin()
              }}
            >
              Mina sidor
            </button>
            <a className="btn btn--small" href="#medlemskap" onClick={() => setOpen(false)}>
              Börja sola
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
