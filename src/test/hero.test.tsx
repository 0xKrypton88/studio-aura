import { describe, expect, it } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import App from '../App'
import { site } from '../content'

describe('home hero first impression', () => {
  it('puts Studio Aura as the hero brand with tagline and membership CTA', () => {
    render(<App />)

    const brand = screen.getByRole('heading', { level: 1, name: site.name })
    expect(brand).toHaveClass('hero__brand')

    const hero = brand.closest('section')
    expect(hero).toHaveClass('hero')
    expect(hero).toContainElement(screen.getByText(site.tagline))
    expect(hero?.querySelector('a[href="#medlemskap"]')).toHaveTextContent(/Börja sola/i)
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
