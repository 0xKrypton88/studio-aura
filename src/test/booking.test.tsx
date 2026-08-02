import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from '../App'
import { assetPath } from '../assets'

describe('Bokningsprogram discovery and base-path link', () => {
  it('lets the user find Bokningsprogram and links to bokning/index.html via Vite BASE_URL', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Bokning' })).toHaveAttribute(
      'href',
      '#bokningsprogram',
    )

    const section = screen.getByTestId('bokningsprogram')
    expect(section).toBeInTheDocument()
    expect(within(section).getByRole('heading', { name: /bokningsprogram/i })).toBeInTheDocument()

    const link = within(section).getByRole('link', { name: /öppna bokningsprogram/i })
    const expectedHref = assetPath('bokning/index.html', import.meta.env.BASE_URL)

    expect(link).toHaveAttribute('href', expectedHref)
    expect(link.getAttribute('href')?.startsWith(import.meta.env.BASE_URL)).toBe(true)
    expect(link.getAttribute('href')).toMatch(/\/bokning\/index\.html$/)

    // GitHub Pages base path must resolve correctly when Vite base is /studio-aura/
    expect(assetPath('bokning/index.html', '/studio-aura/')).toBe(
      '/studio-aura/bokning/index.html',
    )

    expect(within(section).getByText(/lokal prototyp|localStorage|ingen server/i)).toBeInTheDocument()
  })
})

describe('Booking page theme, backlink, and settings contracts', () => {
  it('reads public/bokning/index.html for Studio Aura fonts, backlink, and settings hooks', () => {
    const html = readFileSync(resolve(process.cwd(), 'public/bokning/index.html'), 'utf8')

    // Theme font tokens must match the main site (not Inter/Georgia defaults)
    expect(html).toMatch(/--font-display:\s*['"]Cormorant Garamond['"]/)
    expect(html).toMatch(/--font-body:\s*['"]Figtree['"]/)
    expect(html).toMatch(/fonts\.googleapis\.com\/css2\?family=Cormorant\+Garamond/)
    expect(html).toMatch(/family=Figtree/)

    // Base-path-safe return link for /studio-aura/bokning/index.html
    expect(html).toContain('Tillbaka till Studio Aura')
    expect(html).toMatch(/class="brand-back"[^>]*href="\.\.\/"/)

    // Settings must affect the calendar, not only persist toggles
    expect(html).toMatch(/settings\.showAvailability/)
    expect(html).toMatch(
      /status\s*===\s*["']available["']\s*&&\s*!state\.settings\.showAvailability/,
    )
    expect(html).toMatch(/settings\.compactMode\s*\?\s*["']compact["']/)
    expect(html).toMatch(/\.calendar-panel\.compact\s+\.day-cell/)
  })
})
