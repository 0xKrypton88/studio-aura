export type PortalPanel = 'overview' | 'wallet' | 'visits' | 'benefits' | 'profile'
export type ActivityScenario = 'warning' | 'safe'

export type TopupOption = {
  amount: number
  bonus: number
}

export type Transaction = {
  id: string
  kind: 'bonus' | 'spend' | 'deposit'
  title: string
  detail: string
  amount: number
  dateLabel: string
}

export type PortalBalances = {
  paid: number
  bonus: number
  earned: number
  scenario: ActivityScenario
}

export const PORTAL_STORAGE = {
  paid: 'aura-paid',
  bonus: 'aura-bonus',
  earned: 'aura-earned',
  scenario: 'aura-scenario',
} as const

export const DEFAULT_BALANCES: PortalBalances = {
  paid: 420,
  bonus: 85,
  earned: 185,
  scenario: 'warning',
}

export const PANEL_TITLES: Record<PortalPanel, string> = {
  overview: 'Översikt',
  wallet: 'Saldo & bonus',
  visits: 'Mina besök',
  benefits: 'Förmåner',
  profile: 'Min profil',
}

export const REFERRAL_CODE = 'AURA-MAJA50'

export const TOPUP_OPTIONS: TopupOption[] = [
  { amount: 200, bonus: 0 },
  { amount: 500, bonus: 50 },
  { amount: 1000, bonus: 150 },
]

export type DemoVisitKind = 'salon' | 'solar'

export type DemoVisit = {
  id: string
  when: string
  whenTable: string
  service: string
  kind: DemoVisitKind
  duration: string
  cost: string
  extra?: boolean
}

export const DEMO_VISITS: DemoVisit[] = [
  {
    id: 'v1',
    when: 'Igår · 19.42',
    whenTable: 'Igår, 19.42',
    service: 'Solarium',
    kind: 'solar',
    duration: '12 min',
    cost: '48 kr',
  },
  {
    id: 'v2',
    when: '3 dagar sedan · 18.05',
    whenTable: '3 dagar sedan, 18.05',
    service: 'Klippning',
    kind: 'salon',
    duration: '50 min',
    cost: '495 kr',
  },
  {
    id: 'v3',
    when: '6 dagar sedan · 20.14',
    whenTable: '6 dagar sedan, 20.14',
    service: 'Färg',
    kind: 'salon',
    duration: '1 h 45 m',
    cost: '1 250 kr',
  },
  {
    id: 'v4',
    when: '12 dagar sedan · 17.32',
    whenTable: '12 dagar sedan, 17.32',
    service: 'Solarium',
    kind: 'solar',
    duration: '12 min',
    cost: '48 kr',
    extra: true,
  },
  {
    id: 'v5',
    when: '18 dagar sedan · 19.06',
    whenTable: '18 dagar sedan, 19.06',
    service: 'Klippning',
    kind: 'salon',
    duration: '45 min',
    cost: '450 kr',
    extra: true,
  },
]

export const VISIT_CHART_HEIGHTS = [34, 52, 31, 68, 42, 50, 38, 72] as const

export const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    kind: 'bonus',
    title: 'Värvningsbonus',
    detail: 'Din vän registrerade sin första insättning',
    amount: 50,
    dateLabel: '14 juli',
  },
  {
    id: 'tx-2',
    kind: 'spend',
    title: 'Klippning',
    detail: 'Dam, 50 minuter',
    amount: -495,
    dateLabel: '12 juli',
  },
  {
    id: 'tx-3',
    kind: 'deposit',
    title: 'Insättning',
    detail: 'Påfyllning via befintligt system',
    amount: 500,
    dateLabel: '5 juli',
  },
  {
    id: 'tx-4',
    kind: 'bonus',
    title: 'Påfyllningsbonus',
    detail: '500 kr gav 50 kr Aura Bonus',
    amount: 50,
    dateLabel: '5 juli',
  },
]

export function formatKr(value: number): string {
  return value.toLocaleString('sv-SE')
}

export function readStoredBalances(): PortalBalances {
  const readNumber = (key: string, fallback: number): number => {
    const raw = localStorage.getItem(key)
    if (raw === null || raw === '') return fallback
    const value = Number(raw)
    return Number.isFinite(value) ? value : fallback
  }

  const scenario = localStorage.getItem(PORTAL_STORAGE.scenario)

  return {
    paid: readNumber(PORTAL_STORAGE.paid, DEFAULT_BALANCES.paid),
    bonus: readNumber(PORTAL_STORAGE.bonus, DEFAULT_BALANCES.bonus),
    earned: readNumber(PORTAL_STORAGE.earned, DEFAULT_BALANCES.earned),
    scenario: scenario === 'safe' ? 'safe' : 'warning',
  }
}

export function persistBalances(balances: PortalBalances): void {
  localStorage.setItem(PORTAL_STORAGE.paid, String(balances.paid))
  localStorage.setItem(PORTAL_STORAGE.bonus, String(balances.bonus))
  localStorage.setItem(PORTAL_STORAGE.earned, String(balances.earned))
  localStorage.setItem(PORTAL_STORAGE.scenario, balances.scenario)
}

export function clearStoredBalances(): void {
  localStorage.removeItem(PORTAL_STORAGE.paid)
  localStorage.removeItem(PORTAL_STORAGE.bonus)
  localStorage.removeItem(PORTAL_STORAGE.earned)
  localStorage.removeItem(PORTAL_STORAGE.scenario)
}
