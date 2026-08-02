# Studio Aura source and design contract

## Goal

Rebuild and substantially improve the Studio Aura website as a modern, responsive, accessible, fast static site. Preserve the business facts and brand identity while replacing the dated Wix composition with a polished, intentional experience.

## Authoritative references

- Public original: https://www.studioaura.se/
- Original capture: `reference/original-live-2026-08-02.html`
- Original user-supplied logo: `reference/studio-aura-logo-original.png`
- User-supplied modern public-site and Mina sidor reference: `reference/user-preview-mina-sidor-2026-08-03.html`
- Brand spelling: **Studio Aura**
- Language: Swedish

The supplied preview is authoritative for the requested **selective modernization** and for the complete clickable **Mina sidor demo contract**. It is not permission to replace Studio Aura's identity, verified public content, or factual safety requirements. Use the original capture for business/content truth and the preview for interaction and visual-language guidance.

## Preserve

- Warm ivory/off-white foundation.
- Muted metallic olive-gold brand color.
- Elegant high-contrast serif typography paired with restrained modern body text.
- Airy, premium wellness/beauty feeling rather than a generic tech or dark SaaS aesthetic.
- All verified business content from the original site.
- The public site's familiar section flow, Studio Aura imagery, and predominantly warm/light appearance.

## Selective modernization contract

- Modernize typography, spacing, image composition, hierarchy, calls to action, and responsive behavior without replacing the whole design language.
- Use the preview's warm editorial hero and refined ivory/bronze treatment as guidance, adapted to the verified Studio Aura content.
- A darker Club Aurora or Mina sidor moment may be used as a **bounded accent section**, but the public site must not become globally dark, cinematic, glass-heavy, or template-like.
- Do not import CodeNest/coding language, generic SaaS patterns, unrelated video, or unverified claims.
- Before any release, provide desktop and mobile review artifacts. A technically green candidate is not design approval.

## Mina sidor demo contract

Implement the complete clickable demo represented in the supplied preview, reachable through a clear **Mina sidor** action on desktop and mobile:

- truthful demo login modal with no real authentication;
- responsive portal shell and mobile portal navigation;
- Overview with paid balance and bonus shown separately, activity status, visit summary, and referral demo;
- Saldo & bonus with separate balances, top-up simulation, bonus simulation, transaction history, and CSV demo export;
- Mina besök with visit history, chart/summary, and responsible non-medical activity guidance;
- Förmåner with top-up bonus, referral, and clearly illustrative benefits;
- Min profil with demo identity and local-only preference toggles;
- local browser state/reset behavior for the interactive demo;
- keyboard operation, visible focus, Escape/modal behavior, reduced motion, and no mobile/page overflow.

The demo must clearly state that it has no real accounts, payments, purchases, bookings, SMS integration, or backend. Example values and people must be labeled as demo data. Do not imply these concepts are active customer benefits or production capabilities.

The separate **Bokningsprogram** prototype is a different Studio Aura surface. Preserve it when it exists on the implementation base, but do not conflate it with Mina sidor.

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
