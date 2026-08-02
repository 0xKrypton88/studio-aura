import { describe, expect, it } from 'vitest'
import attributes from '../../.gitattributes?raw'
import manifest from '../../reference/SHA256SUMS?raw'

describe('reference checksum manifest line-ending contract', () => {
  it('keeps SHA256SUMS LF-only so Windows sha256sum -c can open paths', () => {
    expect(manifest.includes('\r'), 'reference/SHA256SUMS must not contain CR bytes').toBe(false)
    expect(manifest.includes('\n')).toBe(true)
  })

  it('declares an explicit LF checkout rule for the manifest', () => {
    expect(attributes).toMatch(/^\s*reference\/SHA256SUMS\s+text\s+eol=lf\s*$/m)
  })

  it('retains the canonical digests for the immutable reference artifacts', () => {
    expect(manifest).toContain(
      '20aa5daf064fe16b1dd824f6ebe98093928ce3e2c533363b50681c40aabefe4b *reference/original-live-2026-08-02.html',
    )
    expect(manifest).toContain(
      'b8bf1866d53736cb967d0212b47de496f57542d0ee6678a665158571766d37da *reference/studio-aura-logo-original.png',
    )
  })
})
