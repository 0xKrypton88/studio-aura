import { useEffect } from 'react'

/** Adds `.is-visible` to `[data-reveal]` elements when they enter the viewport. */
export function useReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )
    if (nodes.length === 0) return
    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [enabled])
}
