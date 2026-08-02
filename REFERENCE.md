# Studio Aura source and design contract

## Goal

Rebuild and substantially improve the Studio Aura website as a modern, responsive, accessible, fast static site. Preserve the business facts and brand identity while replacing the dated Wix composition with a polished, intentional experience.

## Authoritative references

- Public original: https://www.studioaura.se/
- Original capture: `reference/original-live-2026-08-02.html`
- Original user-supplied logo: `reference/studio-aura-logo-original.png`
- Brand spelling: **Studio Aura**
- Language: Swedish

The user mentioned an HTML mockup named `studio-aura-mockup-preview-v3.html`, but that attachment did not arrive on disk. Do not invent its contents. Use the available live capture and logo.

## Preserve

- Dark premium cinematic wellness foundation (near-black / deep olive), not a light ivory page and not a tech/SaaS look.
- Ivory text on dark surfaces with muted metallic olive-gold as the primary aura accent; restrained red/blue light accents only where semantically appropriate.
- Elegant high-contrast serif typography paired with restrained modern body text.
- Full-bleed atmospheric hero using existing Studio Aura imagery, with editorial hierarchy and refined motion that respects `prefers-reduced-motion`.
- All verified business content from the original site.

## Verified content contract

- Hero: “Glow with beauty & feel the aura”, Studio Aura, and a clear start/membership CTA.
- Services: solarium with red and blue light; explain benefits carefully without overclaiming medical outcomes.
- Safety: controlled entry, 24/7 camera surveillance, legal 18+ requirement, exposure guidance by skin type.
- Pricing: 4 SEK/minute and 60 SEK/15 minutes.
- Membership steps: register; receive/use the access phone number; call on arrival. Preserve the 2,500 SEK rule for bringing an unregistered guest, but present it clearly and professionally.
- Contact: 0722 740 122; Studioaura21@gmail.com.
- Address: Lagastigsgatan 63, 287 31 Strömsnäsbruk.
- Opening hours: every day 05:00–00:00.
- Include gallery, map/directions, social links when their verified URLs can be extracted from the original.

## Product requirements

- Substantially improve hierarchy, spacing, typography, navigation, calls to action, content clarity, and mobile behavior.
- Build a complete website, not a static screenshot.
- Responsive navigation with keyboard support.
- Functional in-page navigation, telephone/email/address links, price presentation, membership flow, and meaningful interaction states.
- A membership form must never pretend personal data was submitted. If no approved backend exists, use a truthful no-backend fallback and direct contact option.
- Accessibility: semantic landmarks/headings, useful alt text, visible focus, sufficient contrast, reduced-motion support, keyboard-accessible controls.
- Performance: avoid the Wix runtime and unnecessary libraries; optimize images and fonts; no console errors or broken asset requests.
- SEO: Swedish title/description, Open Graph basics, canonical prepared for the eventual live URL, organization/local-business structured data where truthful.
- Responsive acceptance at approximately 390 px mobile and 1440 px desktop, with no horizontal overflow or clipped content.

## Non-goals and boundaries

- Do not mutate the current `studioaura.se` DNS or replace the existing Wix production site.
- Do not add analytics, trackers, cookies, external form processors, or unverified claims.
- Do not redesign the supplied logo; use it respectfully and derive the surrounding visual system from it.
- Do not import the captured Wix HTML into production.

## Delivery acceptance

- Canonical install/build/test commands documented and green.
- Genuine RED→GREEN behavior evidence for substantive interactions.
- Production build completes.
- Local production preview works at desktop and mobile sizes.
- Browser console has no application errors.
- The final output can be deployed independently and linked from MCC Project portals.
