# Studio Aura Website

A modern, production-ready static website for **Studio Aura**, a solarium in Strömsnäsbruk, Sweden.

Built with Vite, React, and TypeScript for independent static deployment.

## Source references

- `reference/original-live-2026-08-02.html` — untouched capture of the public Wix site at `https://www.studioaura.se/`.
- `reference/studio-aura-logo-original.png` — user-supplied brand artwork, untouched.
- `public/studio-aura-logo.png` / `public/brand/` — optimized logo derivatives for the new site.
- `REFERENCE.md` — content, product, design, and acceptance contract.

The captured original is reference material only. Do not ship the Wix document or its remote runtime as the new implementation.

## Commands

```bash
npm install
npm test
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Design thesis

Warm ivory foundation, muted metallic olive-gold accents, and editorial serif display type (Cormorant Garamond) with restrained Figtree body text. Full-bleed atmospheric hero with Studio Aura as the dominant brand signal, clear Swedish content hierarchy, and truthful no-backend membership contact via mailto.

## Notes

- Membership form never pretends server submission succeeded.
- **Mina sidor** is a truthful clickable kundportal demo (mock login, localStorage only) — no real accounts, payments, or SMS.
- Social links from the Wix capture pointed at Wix defaults and are omitted as unverified.
- Google Maps link and embed use the verified address / maps URL from the original site.
