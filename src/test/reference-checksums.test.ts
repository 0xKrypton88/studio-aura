import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const manifestPath = resolve(root, 'reference/SHA256SUMS')
const attributesPath = resolve(root, '.gitattributes')

describe('reference checksum manifest line-ending contract', () => {
  it('keeps SHA256SUMS LF-only so Windows sha256sum -c can open paths', () => {
    const bytes = readFileSync(manifestPath)
    expect(bytes.includes(0x0d), 'reference/SHA256SUMS must not contain CR bytes').toBe(false)
    expect(bytes.includes(0x0a)).toBe(true)
  })

  it('declares an explicit LF checkout rule for the manifest', () => {
    const attributes = readFileSync(attributesPath, 'utf8')
    expect(attributes).toMatch(/^\s*reference\/SHA256SUMS\s+text\s+eol=lf\s*$/m)
  })

  it('lists unchanged hashes for the immutable reference artifacts', () => {
    const manifest = readFileSync(manifestPath, 'utf8')
    const entries = manifest
      .trim()
      .split('\n')
      .map((line) => {
        const match = /^(?<hash>[0-9a-f]{64}) [* ](?<file>.+)$/.exec(line)
        expect(match, `invalid manifest line: ${line}`).not.toBeNull()
        return {
          hash: match!.groups!.hash,
          file: match!.groups!.file,
        }
      })

    expect(entries.map((entry) => entry.file)).toEqual([
      'reference/original-live-2026-08-02.html',
      'reference/studio-aura-logo-original.png',
    ])

    for (const entry of entries) {
      const actual = createHash('sha256').update(readFileSync(resolve(root, entry.file))).digest('hex')
      expect(actual).toBe(entry.hash)
    }
  })
})
