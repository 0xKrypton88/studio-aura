import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
})

Element.prototype.scrollIntoView = () => undefined

function createIntersectionObserver(
  callback: IntersectionObserverCallback,
): IntersectionObserver {
  return {
    root: null,
    rootMargin: '',
    thresholds: [],
    observe(target: Element) {
      callback(
        [
          {
            isIntersecting: true,
            target,
            intersectionRatio: 1,
            time: 0,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
          },
        ],
        this as IntersectionObserver,
      )
    },
    unobserve() {
      return undefined
    },
    disconnect() {
      return undefined
    },
    takeRecords() {
      return []
    },
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: createIntersectionObserver,
})
