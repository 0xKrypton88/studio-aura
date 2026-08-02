import { defineConfig, devices } from '@playwright/test'

/** Dedicated local e2e preview port — distinct from `npm run preview` (4173). */
export const E2E_PREVIEW_PORT = 4175
export const LOCAL_E2E_BASE_URL = `http://127.0.0.1:${E2E_PREVIEW_PORT}/studio-aura/`

const baseURL = process.env.BASE_URL ?? LOCAL_E2E_BASE_URL
const isExternal = Boolean(process.env.BASE_URL)

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  outputDir: 'test-results',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop',
      use: {
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'mobile',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: isExternal
    ? undefined
    : {
        // Own an isolated preview from this checkout; never reuse another worktree's server.
        command: `npx vite preview --host 127.0.0.1 --port ${E2E_PREVIEW_PORT}`,
        url: baseURL,
        reuseExistingServer: false,
        timeout: 120_000,
      },
})
