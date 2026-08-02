import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const PREVIEW_SCRIPT_PORT = 4173
const configPath = path.resolve(process.cwd(), 'playwright.config.ts')
const source = readFileSync(configPath, 'utf8')

describe('playwright local e2e server isolation', () => {
  it('keeps a dedicated e2e port distinct from ordinary preview', () => {
    const portMatch = source.match(/export const E2E_PREVIEW_PORT\s*=\s*(\d+)/)
    expect(portMatch, 'E2E_PREVIEW_PORT must be exported').toBeTruthy()
    const port = Number(portMatch?.[1])
    expect(port).not.toBe(PREVIEW_SCRIPT_PORT)
    expect(source).toContain(
      'export const LOCAL_E2E_BASE_URL = `http://127.0.0.1:${E2E_PREVIEW_PORT}/studio-aura/`',
    )
  })

  it('aligns local baseURL with webServer port and disables reuse', () => {
    expect(source).toMatch(/process\.env\.BASE_URL\s*\?\?\s*LOCAL_E2E_BASE_URL/)
    expect(source).toMatch(/--port \$\{E2E_PREVIEW_PORT\}/)
    expect(source).toMatch(/url:\s*baseURL/)
    expect(source).toMatch(/reuseExistingServer:\s*false/)
    expect(source).not.toMatch(/reuseExistingServer:\s*!process\.env\.CI/)
  })
})
