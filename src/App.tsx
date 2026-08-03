import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Safety } from './components/Safety'
import { Prices } from './components/Prices'
import { Membership } from './components/Membership'
import { Gallery } from './components/Gallery'
import { ClubAurora } from './components/ClubAurora'
import { BookingProgram } from './components/BookingProgram'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import {
  LoginModal,
  PortalProvider,
  PortalToast,
  PortalView,
  TopupModal,
  usePortal,
} from './portal'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useReveal } from './hooks/useReveal'
import './portal/portal.css'

function SiteShell() {
  const reducedMotion = usePrefersReducedMotion()
  useReveal(!reducedMotion)
  const { view } = usePortal()

  if (view === 'portal') {
    return (
      <>
        <PortalView />
        <LoginModal />
        <TopupModal />
        <PortalToast />
      </>
    )
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Hoppa till innehåll
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Safety />
        <Prices />
        <Membership />
        <Gallery />
        <ClubAurora />
        <BookingProgram />
        <Contact />
      </main>
      <Footer />
      <LoginModal />
      <TopupModal />
      <PortalToast />
    </>
  )
}

export default function App() {
  return (
    <PortalProvider>
      <SiteShell />
    </PortalProvider>
  )
}
