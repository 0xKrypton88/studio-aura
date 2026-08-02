import { expect, test, type Page } from '@playwright/test'
import path from 'node:path'

const artifactDir = path.join('test-results', 'acceptance-screenshots')

async function collectPageSignals(page: Page) {
  const consoleErrors: string[] = []
  const failedRequests: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text())
    }
  })

  page.on('pageerror', (error) => {
    consoleErrors.push(error.message)
  })

  page.on('requestfailed', (request) => {
    const url = request.url()
    // Ignore benign browser noise; fail on local/site asset or document failures.
    if (
      url.includes('studio-aura') ||
      url.includes('/gallery/') ||
      url.includes('/brand/') ||
      url.includes('favicon') ||
      url.endsWith('.js') ||
      url.endsWith('.css') ||
      url.endsWith('.jpg') ||
      url.endsWith('.png')
    ) {
      failedRequests.push(`${request.failure()?.errorText ?? 'failed'}: ${url}`)
    }
  })

  return { consoleErrors, failedRequests }
}

async function assertNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => {
    const root = document.documentElement
    return {
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
    }
  })

  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1)
  expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1)
}

async function assertImagesComplete(page: Page) {
  await page.evaluate(async () => {
    const images = Array.from(document.images)
    await Promise.all(
      images.map((image) => {
        if (image.complete) return Promise.resolve()
        return new Promise<void>((resolve, reject) => {
          image.addEventListener('load', () => resolve(), { once: true })
          image.addEventListener('error', () => reject(new Error(image.currentSrc)), {
            once: true,
          })
        })
      }),
    )
  })

  const incomplete = await page.evaluate(() =>
    Array.from(document.images)
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
  )
  expect(incomplete).toEqual([])
}

test.describe('Studio Aura browser acceptance', () => {
  test('hero, overflow, assets, membership, and mobile menu', async ({ page }, testInfo) => {
    const { consoleErrors, failedRequests } = await collectPageSignals(page)

    await page.goto('./')
    await expect(page.getByTestId('hero')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: 'Studio Aura' })).toBeVisible()
    await expect(page.getByTestId('hero-headline')).toContainText(/glow with beauty/i)
    await expect(page.getByTestId('hero-headline-accent')).toBeVisible()
    await expect(page.getByTestId('hero-glass-card')).toBeVisible()
    await expect(page.getByTestId('hero-image')).toBeVisible()

    if (testInfo.project.name === 'desktop') {
      await expect(page.getByTestId('hero-grid').locator('[data-testid="hero-grid-line"]')).toHaveCount(
        3,
      )
      await expect(page.getByTestId('hero-aura-glow')).toBeVisible()
    }

    await assertNoHorizontalOverflow(page)

    const screenshotName =
      testInfo.project.name === 'mobile'
        ? 'studio-aura-mobile-390x844.png'
        : 'studio-aura-desktop-1440x900.png'
    const screenshotPath = path.join(artifactDir, screenshotName)
    await page.screenshot({ path: screenshotPath, fullPage: false })
    await testInfo.attach(screenshotName, { path: screenshotPath, contentType: 'image/png' })

    // Scroll lazy gallery content into view and verify image completion.
    await page.locator('#galleri').scrollIntoViewIfNeeded()
    await page.locator('#kontakt').scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await assertImagesComplete(page)
    await assertNoHorizontalOverflow(page)

    // Membership validation + truthful mailto ready state.
    await page.locator('#medlemskap').scrollIntoViewIfNeeded()
    await page.getByLabel(/förnamn/i).fill('Anna')
    await page.getByLabel(/efternamn/i).fill('Andersson')
    await page.getByLabel(/e-post/i).fill('anna@example.com')
    await page.getByLabel(/telefon/i).fill('0701234567')
    await page.getByRole('button', { name: /skicka medlemsförfrågan/i }).click()
    await expect(page.getByTestId('membership-status')).toHaveCount(0)

    await page.getByLabel(/över 18 år/i).check()
    await page.getByRole('button', { name: /skicka medlemsförfrågan/i }).click()
    const status = page.getByTestId('membership-status')
    await expect(status).toBeVisible()
    await expect(status).toHaveAttribute('data-state', 'ready-to-contact')
    const mailto = page.getByTestId('membership-mailto')
    await expect(mailto).toHaveAttribute('href', /mailto:Studioaura21@gmail\.com/)

    if (testInfo.project.name === 'mobile') {
      await page.evaluate(() => window.scrollTo(0, 0))
      const toggle = page.getByTestId('nav-toggle')
      const nav = page.getByTestId('site-nav')

      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
      await toggle.click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')
      await expect(nav).toHaveClass(/is-open/)

      await page.keyboard.press('Escape')
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
      await expect(nav).not.toHaveClass(/is-open/)

      await toggle.click()
      await expect(nav).toHaveClass(/is-open/)
      await nav.locator('a[href="#kontakt"]').click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    }

    expect(failedRequests, `Failed requests:\n${failedRequests.join('\n')}`).toEqual([])
    expect(consoleErrors, `Console errors:\n${consoleErrors.join('\n')}`).toEqual([])
  })
})
