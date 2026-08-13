import { describe, expect, it } from 'vitest'
import { act, render, screen, within } from '@testing-library/react'
import App from '../App'
import { site } from '../content'

describe('home hero first impression', () => {
  it('puts Studio Aura as the hero brand with tagline and membership CTA', () => {
    render(<App />)

    const brand = screen.getByRole('heading', { level: 1, name: site.name })
    expect(brand).toHaveClass('hero__brand')

    const hero = brand.closest('section')
    expect(hero).toHaveClass('hero')
    expect(within(hero as HTMLElement).getByText(site.tagline)).toBeInTheDocument()
    expect(hero?.querySelector('a[href="#medlemskap"]')).toHaveTextContent(/Börja sola/i)
  })

  it('blends the lounge home with the solar studio in the first viewport', () => {
    render(<App />)

    const hero = document.querySelector('section.hero')
    expect(hero).toBeTruthy()

    const homePhoto = within(hero as HTMLElement).getByTestId('hero-home-photo')
    const solarPhoto = within(hero as HTMLElement).getByTestId('hero-solar-photo')

    expect(homePhoto).toHaveAttribute('src', expect.stringMatching(/studio-02/))
    expect(solarPhoto).toHaveAttribute('src', expect.stringMatching(/studio-01/))
    expect(homePhoto).toHaveAttribute('alt', expect.stringMatching(/lounge|hem|interiör/i))
    expect(solarPhoto).toHaveAttribute('alt', expect.stringMatching(/solarium|sol/i))
  })

  it('keeps the sticky header clear over the hero until the page is scrolled', () => {
    render(<App />)

    const header = document.querySelector('.site-header')
    expect(header).toBeTruthy()
    expect(header).not.toHaveClass('is-scrolled')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 80 })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(header).toHaveClass('is-scrolled')
  })
})

describe('home and solar blend', () => {
  it('continues the home feeling into a lounge and solar pair below the hero', () => {
    render(<App />)

    const blend = screen.getByTestId('home-blend')
    expect(blend).toBeInTheDocument()
    expect(within(blend).getByRole('heading', { level: 2 })).toHaveTextContent(/hem|ljus|aura/i)
    expect(within(blend).getByTestId('home-blend-lounge')).toBeInTheDocument()
    expect(within(blend).getByTestId('home-blend-solar')).toBeInTheDocument()
    expect(blend.textContent).toMatch(/lounge|hem/i)
    expect(blend.textContent).toMatch(/solarium|solljus|solrum/i)
  })
})
