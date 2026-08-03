import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearStoredBalances,
  DEFAULT_BALANCES,
  persistBalances,
  readStoredBalances,
  REFERRAL_CODE,
  SEED_TRANSACTIONS,
  type ActivityScenario,
  type PortalBalances,
  type PortalPanel,
  type TopupOption,
  type Transaction,
} from './state'

type ViewMode = 'site' | 'portal'

type PortalContextValue = {
  view: ViewMode
  panel: PortalPanel
  balances: PortalBalances
  transactions: Transaction[]
  loginOpen: boolean
  topupOpen: boolean
  selectedTopup: TopupOption
  toast: string | null
  openLogin: () => void
  closeModals: () => void
  enterPortal: () => void
  leavePortal: () => void
  setPanel: (panel: PortalPanel) => void
  openTopup: () => void
  setSelectedTopup: (option: TopupOption) => void
  confirmTopup: () => void
  useBonus: () => void
  toggleScenario: () => void
  resetDemo: () => void
  showToast: (message: string) => void
  copyReferral: () => Promise<void>
  downloadCsv: () => void
}

const PortalContext = createContext<PortalContextValue | null>(null)

export function PortalProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewMode>('site')
  const [panel, setPanelState] = useState<PortalPanel>('overview')
  const [balances, setBalances] = useState<PortalBalances>(() =>
    typeof window === 'undefined' ? DEFAULT_BALANCES : readStoredBalances(),
  )
  const [transactions, setTransactions] = useState<Transaction[]>(SEED_TRANSACTIONS)
  const [loginOpen, setLoginOpen] = useState(false)
  const [topupOpen, setTopupOpen] = useState(false)
  const [selectedTopup, setSelectedTopup] = useState<TopupOption>({
    amount: 500,
    bonus: 50,
  })
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((message: string) => {
    setToast(message)
  }, [])

  const onToastClear = useEffectEvent(() => {
    setToast(null)
  })

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => onToastClear(), 3300)
    return () => window.clearTimeout(timer)
  }, [toast])

  const syncBodyView = useEffectEvent((next: ViewMode) => {
    document.body.dataset.view = next
  })

  useEffect(() => {
    syncBodyView(view)
  }, [view])

  useEffect(() => {
    const modalOpen = loginOpen || topupOpen
    document.body.classList.toggle('modal-open', modalOpen)
    return () => document.body.classList.remove('modal-open')
  }, [loginOpen, topupOpen])

  const closeModals = useCallback(() => {
    setLoginOpen(false)
    setTopupOpen(false)
  }, [])

  const openLogin = useCallback(() => {
    setTopupOpen(false)
    setLoginOpen(true)
  }, [])

  const openTopup = useCallback(() => {
    setLoginOpen(false)
    setTopupOpen(true)
  }, [])

  const enterPortal = useCallback(() => {
    setLoginOpen(false)
    setTopupOpen(false)
    setPanelState('overview')
    setBalances(readStoredBalances())
    setView('portal')
    try {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#portal`)
    } catch {
      window.location.hash = 'portal'
    }
    window.scrollTo(0, 0)
  }, [])

  const leavePortal = useCallback(() => {
    setView('site')
    closeModals()
    try {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#top`)
    } catch {
      window.location.hash = 'top'
    }
    window.scrollTo(0, 0)
  }, [closeModals])

  const setPanel = useCallback((next: PortalPanel) => {
    setPanelState(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const updateBalances = useCallback((next: PortalBalances) => {
    setBalances(next)
    persistBalances(next)
  }, [])

  const confirmTopup = useCallback(() => {
    const { amount, bonus } = selectedTopup
    const next: PortalBalances = {
      ...balances,
      paid: balances.paid + amount,
      bonus: balances.bonus + bonus,
      earned: balances.earned + bonus,
    }
    updateBalances(next)

    const nowRows: Transaction[] = [
      {
        id: `tx-demo-${Date.now()}-deposit`,
        kind: 'deposit',
        title: 'Demoinsättning',
        detail: bonus
          ? `Simulerad påfyllning med ${bonus} kr bonus`
          : 'Simulerad påfyllning',
        amount,
        dateLabel: 'precis nu',
      },
    ]
    if (bonus) {
      nowRows.unshift({
        id: `tx-demo-${Date.now()}-bonus`,
        kind: 'bonus',
        title: 'Påfyllningsbonus',
        detail: 'Bonus från demoinsättning',
        amount: bonus,
        dateLabel: 'precis nu',
      })
    }
    setTransactions((rows) => [...nowRows, ...rows])
    closeModals()
    showToast(`${(amount + bonus).toLocaleString('sv-SE')} kr har lagts till i demot.`)
  }, [balances, closeModals, selectedTopup, showToast, updateBalances])

  const useBonus = useCallback(() => {
    if (balances.bonus < 50) {
      showToast('Det finns inte 50 kr bonus kvar i demot.')
      return
    }
    updateBalances({ ...balances, bonus: balances.bonus - 50 })
    setTransactions((rows) => [
      {
        id: `tx-demo-${Date.now()}-spend`,
        kind: 'spend',
        title: 'Använd Aura Bonus',
        detail: 'Simulerad överföring till befintligt system',
        amount: -50,
        dateLabel: 'precis nu',
      },
      ...rows,
    ])
    showToast('50 kr bonus har använts i demot.')
  }, [balances, showToast, updateBalances])

  const toggleScenario = useCallback(() => {
    const scenario: ActivityScenario = balances.scenario === 'warning' ? 'safe' : 'warning'
    updateBalances({ ...balances, scenario })
    showToast(scenario === 'safe' ? 'Grönt demoscenario visas.' : 'Gult demoscenario visas.')
  }, [balances, showToast, updateBalances])

  const resetDemo = useCallback(() => {
    clearStoredBalances()
    const next = { ...DEFAULT_BALANCES }
    updateBalances(next)
    setTransactions(SEED_TRANSACTIONS)
    setPanelState('overview')
    showToast('Demot har återställts.')
  }, [showToast, updateBalances])

  const copyReferral = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_CODE)
    } catch {
      const input = document.createElement('input')
      input.value = REFERRAL_CODE
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    showToast(`Värvningskoden ${REFERRAL_CODE} är kopierad.`)
  }, [showToast])

  const downloadCsv = useCallback(() => {
    const csv =
      'Datum,Typ,Belopp\n14 juli,Värvningsbonus,50\n12 juli,Besök,-48\n5 juli,Insättning,500\n5 juli,Påfyllningsbonus,50\n'
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'studio-aura-demo-transaktioner.csv'
    anchor.click()
    URL.revokeObjectURL(url)
    showToast('En liten demo-CSV har skapats.')
  }, [showToast])

  useEffect(() => {
    if (window.location.hash === '#portal') {
      setView('portal')
      setPanelState('overview')
      setBalances(readStoredBalances())
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLoginOpen(false)
        setTopupOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo<PortalContextValue>(
    () => ({
      view,
      panel,
      balances,
      transactions,
      loginOpen,
      topupOpen,
      selectedTopup,
      toast,
      openLogin,
      closeModals,
      enterPortal,
      leavePortal,
      setPanel,
      openTopup,
      setSelectedTopup,
      confirmTopup,
      useBonus,
      toggleScenario,
      resetDemo,
      showToast,
      copyReferral,
      downloadCsv,
    }),
    [
      balances,
      closeModals,
      confirmTopup,
      copyReferral,
      downloadCsv,
      enterPortal,
      leavePortal,
      loginOpen,
      openLogin,
      openTopup,
      panel,
      resetDemo,
      selectedTopup,
      setPanel,
      showToast,
      toast,
      toggleScenario,
      topupOpen,
      transactions,
      useBonus,
      view,
    ],
  )

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

export function usePortal(): PortalContextValue {
  const value = useContext(PortalContext)
  if (!value) {
    throw new Error('usePortal must be used within PortalProvider')
  }
  return value
}
