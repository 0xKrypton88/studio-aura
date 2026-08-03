import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

const STORAGE_KEYS = ['aura-paid', 'aura-bonus', 'aura-earned', 'aura-scenario'] as const

beforeEach(() => {
  for (const key of STORAGE_KEYS) localStorage.removeItem(key)
  window.history.replaceState(null, '', '/studio-aura/')
  document.body.dataset.view = 'site'
})

afterEach(() => {
  for (const key of STORAGE_KEYS) localStorage.removeItem(key)
  document.body.dataset.view = 'site'
  document.body.classList.remove('modal-open')
})

async function openLoginAndEnterPortal(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByTestId('open-mina-sidor'))
  const dialog = screen.getByRole('dialog', { name: /testa mina sidor/i })
  expect(dialog).toBeVisible()
  expect(within(dialog).getByText(/ingen riktig inloggning sker/i)).toBeInTheDocument()
  await user.click(within(dialog).getByRole('button', { name: /fortsätt till demo/i }))
}

describe('Mina sidor kundportal demo', () => {
  it('exposes Mina sidor on desktop and opens a truthful demo login modal', async () => {
    const user = userEvent.setup()
    render(<App />)

    const openButton = screen.getByTestId('open-mina-sidor')
    expect(openButton).toHaveAccessibleName(/mina sidor/i)

    await user.click(openButton)

    const dialog = screen.getByRole('dialog', { name: /testa mina sidor/i })
    expect(dialog).toBeVisible()
    expect(within(dialog).getByText(/ingen riktig inloggning sker/i)).toBeInTheDocument()
    expect(within(dialog).getByText(/demoanvändare:\s*maja/i)).toBeInTheDocument()
    expect(within(dialog).getByLabelText(/mobilnummer/i)).toBeInTheDocument()
    expect(document.body).toHaveClass('modal-open')
  })

  it('closes the login modal on Escape without entering the portal', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('open-mina-sidor'))
    expect(screen.getByRole('dialog', { name: /testa mina sidor/i })).toBeVisible()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: /testa mina sidor/i })).not.toBeInTheDocument()
    expect(document.body.dataset.view).not.toBe('portal')
    expect(screen.queryByTestId('portal-shell')).not.toBeInTheDocument()
  })

  it('enters the portal after demo login and shows overview balances separately', async () => {
    const user = userEvent.setup()
    render(<App />)

    await openLoginAndEnterPortal(user)

    expect(document.body.dataset.view).toBe('portal')
    const portal = screen.getByTestId('portal-shell')
    expect(portal).toBeInTheDocument()
    expect(within(portal).getByRole('heading', { name: /hej maja/i })).toBeInTheDocument()
    expect(within(portal).getByTestId('paid-balance')).toHaveTextContent('420')
    expect(within(portal).getByTestId('bonus-balance')).toHaveTextContent('85')
    expect(within(portal).getByTestId('total-balance')).toHaveTextContent('505')
    expect(screen.getByText(/interaktiv demo/i)).toBeInTheDocument()
  })

  it('navigates portal panels including saldo, besök, förmåner and profil', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openLoginAndEnterPortal(user)

    const portal = screen.getByTestId('portal-shell')
    const menu = within(portal).getByRole('navigation', { name: 'Portalmeny' })

    await user.click(within(menu).getByRole('button', { name: /saldo & bonus/i }))
    expect(within(portal).getByRole('heading', { name: /saldo & bonus/i })).toBeInTheDocument()

    await user.click(within(menu).getByRole('button', { name: /mina besök/i }))
    expect(within(portal).getByRole('heading', { name: /mina besök/i })).toBeInTheDocument()
    expect(within(portal).getByText(/inte medicinsk rådgivning/i)).toBeInTheDocument()

    await user.click(within(menu).getByRole('button', { name: /förmåner/i }))
    expect(within(portal).getByRole('heading', { name: /dina förmåner/i })).toBeInTheDocument()

    await user.click(within(menu).getByRole('button', { name: /min profil/i }))
    expect(within(portal).getByRole('heading', { name: /min profil/i })).toBeInTheDocument()
    expect(within(portal).getByText(/maja svensson/i)).toBeInTheDocument()
  })

  it('simulates top-up without claiming a real payment', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openLoginAndEnterPortal(user)

    const portal = screen.getByTestId('portal-shell')
    await user.click(within(portal).getAllByRole('button', { name: /fyll på saldo/i })[0])

    const topup = screen.getByRole('dialog', { name: /fyll på saldo/i })
    expect(within(topup).getByText(/inga pengar dras/i)).toBeInTheDocument()
    await user.click(within(topup).getByRole('button', { name: /simulera insättning/i }))

    expect(screen.queryByRole('dialog', { name: /fyll på saldo/i })).not.toBeInTheDocument()
    expect(within(portal).getByTestId('paid-balance')).toHaveTextContent('920')
    expect(within(portal).getByTestId('bonus-balance')).toHaveTextContent('135')
    expect(localStorage.getItem('aura-paid')).toBe('920')
  })

  it('resets demo state from the portal sidebar', async () => {
    localStorage.setItem('aura-paid', '999')
    localStorage.setItem('aura-bonus', '10')
    localStorage.setItem('aura-earned', '200')
    localStorage.setItem('aura-scenario', 'safe')

    const user = userEvent.setup()
    render(<App />)
    await openLoginAndEnterPortal(user)

    const portal = screen.getByTestId('portal-shell')
    expect(within(portal).getByTestId('paid-balance')).toHaveTextContent('999')

    await user.click(within(portal).getByRole('button', { name: /återställ demo/i }))
    expect(within(portal).getByTestId('paid-balance')).toHaveTextContent('420')
    expect(within(portal).getByTestId('bonus-balance')).toHaveTextContent('85')
    expect(localStorage.getItem('aura-paid')).toBe('420')
    expect(localStorage.getItem('aura-scenario')).toBe('warning')
  })

  it('returns to the public site from the portal', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openLoginAndEnterPortal(user)

    await user.click(screen.getByTestId('portal-home'))
    expect(document.body.dataset.view).toBe('site')
    expect(screen.queryByTestId('portal-shell')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /studio aura/i })).toBeInTheDocument()
  })

  it('keeps Club Aurora as a bounded public accent with portal entry', async () => {
    const user = userEvent.setup()
    render(<App />)

    const club = screen.getByTestId('club-aurora')
    expect(club).toBeInTheDocument()
    expect(within(club).getByRole('heading', { name: /egen värld/i })).toBeInTheDocument()

    await user.click(within(club).getByRole('button', { name: /^gå in$/i }))
    expect(screen.getByRole('dialog', { name: /testa mina sidor/i })).toBeVisible()
  })
})
