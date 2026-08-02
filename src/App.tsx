import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Safety } from './components/Safety'
import { Prices } from './components/Prices'
import { Membership } from './components/Membership'
import { Gallery } from './components/Gallery'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useReveal } from './hooks/useReveal'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  useReveal(!reducedMotion)

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
        <Contact />
      </main>
      <Footer />
    </>
  )
}
