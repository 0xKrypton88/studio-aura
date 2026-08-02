import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { assetPath } from '../assets'

describe('site navigation and mobile menu', () => {
  it('resolves every local image through the configured deployment base path', () => {
    const { container } = render(<App />)
    const sources = Array.from(container.querySelectorAll('img')).map((image) =>
      image.getAttribute('src'),
    )

    expect(assetPath('/gallery/example.jpg', '/studio-aura/')).toBe(
      '/studio-aura/gallery/example.jpg',
    )
    expect(sources.length).toBeGreaterThan(0)
    expect(sources.every((source) => source?.startsWith(import.meta.env.BASE_URL))).toBe(true)
  })

  it('exposes landmark navigation with section anchors', () => {
    render(<App />)

    const nav = screen.getByTestId('site-nav')
    expect(nav).toHaveAttribute('aria-label', 'Huvudmeny')

    for (const href of [
      '#tjanster',
      '#sakerhet',
      '#priser',
      '#medlemskap',
      '#galleri',
      '#kontakt',
    ]) {
      const link = nav.querySelector(`a[href="${href}"]`)
      expect(link).toBeTruthy()
      expect(link?.closest('nav')).toBe(nav)
    }

    expect(within(nav).getAllByRole('link').length).toBeGreaterThanOrEqual(6)
  })

  it('toggles the mobile menu via data-testid="nav-toggle" and closes on link click', async () => {
    const user = userEvent.setup()
    render(<App />)

    const toggle = screen.getByTestId('nav-toggle')
    const nav = screen.getByTestId('site-nav')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(nav).not.toHaveClass('is-open')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(nav).toHaveClass('is-open')

    const memberLink = nav.querySelector('a[href="#medlemskap"]')
    expect(memberLink).toBeTruthy()
    await user.click(memberLink as HTMLAnchorElement)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(nav).not.toHaveClass('is-open')
  })

  it('closes the open menu when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const toggle = screen.getByTestId('nav-toggle')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
