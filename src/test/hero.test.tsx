import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from '../App'
import { site } from '../content'

describe('cinematic hero identity and structure', () => {
  it('keeps Studio Aura as the hero-level brand signal', () => {
    render(<App />)

    const brand = screen.getByRole('heading', { level: 1, name: site.name })
    expect(brand).toBeInTheDocument()
    expect(brand).toHaveAttribute('id', 'hero-brand')
  })

  it('renders the uppercase glow headline with a gold accent detail', () => {
    render(<App />)

    const headline = screen.getByTestId('hero-headline')
    expect(headline.textContent?.replace(/\s+/g, ' ').trim().toUpperCase()).toContain(
      'GLOW WITH BEAUTY & FEEL THE AURA',
    )
    expect(within(headline).getByTestId('hero-headline-accent')).toBeInTheDocument()
  })

  it('includes a compact Swedish eyebrow, truthful description, and dual CTAs', () => {
    render(<App />)

    const hero = screen.getByTestId('hero')
    expect(within(hero).getByTestId('hero-eyebrow').textContent?.length).toBeGreaterThan(0)
    expect(within(hero).getByTestId('hero-description').textContent?.toLowerCase()).toMatch(
      /strömsnäsbruk|solarium|medlem/,
    )
    expect(within(hero).getByRole('link', { name: /börja sola/i })).toHaveAttribute(
      'href',
      '#medlemskap',
    )
    expect(within(hero).getByRole('link', { name: /upptäck|solariet|upplevelsen/i })).toHaveAttribute(
      'href',
      '#tjanster',
    )
  })

  it('exposes desktop grid lines, aura glow, and a liquid-glass feature card', () => {
    render(<App />)

    const grid = screen.getByTestId('hero-grid')
    expect(grid.querySelectorAll('[data-testid="hero-grid-line"]')).toHaveLength(3)

    expect(screen.getByTestId('hero-aura-glow')).toBeInTheDocument()

    const glass = screen.getByTestId('hero-glass-card')
    expect(glass).toBeInTheDocument()
    const glassText = glass.textContent?.toLowerCase() ?? ''
    expect(glassText).toMatch(/05:00|medlem|18\+|access|trygg/)
    expect(glassText).not.toMatch(/codenest|mux|hls|deploy|saas/)
  })

  it('uses existing Studio Aura hero imagery without external video streams', () => {
    render(<App />)

    const hero = screen.getByTestId('hero')
    const image = within(hero).getByTestId('hero-image') as HTMLImageElement
    expect(image.getAttribute('src')).toContain('gallery/hero-atmosphere')
    expect(image.getAttribute('src')).toMatch(new RegExp(`^${import.meta.env.BASE_URL}`))
    expect(hero.innerHTML.toLowerCase()).not.toMatch(/hls\.js|stream\.mux\.com|application\/vnd\.apple\.mpegurl/)
  })
})
