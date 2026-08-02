import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

async function fillValidMembershipForm(
  user: ReturnType<typeof userEvent.setup>,
) {
  await user.type(screen.getByLabelText(/förnamn/i), 'Anna')
  await user.type(screen.getByLabelText(/efternamn/i), 'Andersson')
  await user.type(screen.getByLabelText(/e-post/i), 'anna@example.com')
  await user.type(screen.getByLabelText(/telefon/i), '0701234567')
  await user.click(screen.getByLabelText(/över 18 år/i))
}

describe('membership and contact truthful no-backend flow', () => {
  it('renders membership form with required fields and 18+ confirmation', () => {
    render(<App />)

    const form = screen.getByTestId('membership-form')
    expect(form).toBeInTheDocument()
    expect(screen.getByLabelText(/förnamn/i)).toBeRequired()
    expect(screen.getByLabelText(/efternamn/i)).toBeRequired()
    expect(screen.getByLabelText(/e-post/i)).toBeRequired()
    expect(screen.getByLabelText(/telefon/i)).toBeRequired()
    expect(screen.getByLabelText(/över 18 år/i)).toBeRequired()
  })

  it('does not claim server registration; offers mailto contact path after submit', async () => {
    const user = userEvent.setup()
    render(<App />)

    await fillValidMembershipForm(user)
    await user.click(screen.getByRole('button', { name: /skicka medlemsförfrågan/i }))

    const status = screen.getByTestId('membership-status')
    expect(status).toBeInTheDocument()
    expect(status).toHaveAttribute('data-state', 'ready-to-contact')

    const text = status.textContent ?? ''
    expect(text.toLowerCase()).toMatch(/ingen server|inget formulärbackend|skickas inte till en server/)
    expect(text.toLowerCase()).not.toMatch(/du är nu registrerad|registreringen är mottagen/)

    const mailLink = screen.getByTestId('membership-mailto')
    expect(mailLink).toHaveAttribute('href')
    const href = mailLink.getAttribute('href') ?? ''
    expect(href.startsWith('mailto:Studioaura21@gmail.com')).toBe(true)
    expect(decodeURIComponent(href)).toMatch(/Anna/)
    expect(decodeURIComponent(href)).toMatch(/Andersson/)
  })

  it('blocks submit without 18+ confirmation and keeps status idle', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/förnamn/i), 'Anna')
    await user.type(screen.getByLabelText(/efternamn/i), 'Andersson')
    await user.type(screen.getByLabelText(/e-post/i), 'anna@example.com')
    await user.type(screen.getByLabelText(/telefon/i), '0701234567')
    await user.click(screen.getByRole('button', { name: /skicka medlemsförfrågan/i }))

    expect(screen.queryByTestId('membership-status')).not.toBeInTheDocument()
    expect(screen.getByLabelText(/över 18 år/i)).toBeInvalid()
  })

  it('exposes verified phone and email contact links', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /0722 740 122/i })).toHaveAttribute(
      'href',
      'tel:+46722740122',
    )
    expect(
      screen.getByRole('link', { name: /Studioaura21@gmail.com/i }),
    ).toHaveAttribute('href', 'mailto:Studioaura21@gmail.com')
  })
})
