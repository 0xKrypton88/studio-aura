import { assetPath } from './assets'

/** Verified business facts from the Studio Aura source capture. */
export const site = {
  name: 'Studio Aura',
  tagline: 'Glow with beauty & feel the aura',
  language: 'sv',
  canonical: 'https://www.studioaura.se/',
  description:
    'Studio Aura i Strömsnäsbruk – solarium med röda och blå lampor, öppet varje dag 05:00–00:00. Bli medlem och sola tryggt.',
  phoneDisplay: '0722 740 122',
  phoneHref: 'tel:+46722740122',
  email: 'Studioaura21@gmail.com',
  emailHref: 'mailto:Studioaura21@gmail.com',
  addressLine: 'Lagastigsgatan 63',
  postalLine: '287 31 Strömsnäsbruk',
  mapsUrl: 'https://maps.app.goo.gl/yhvzEaoFd5w5Byss8',
  hours: 'Alla dagar 05:00–00:00',
  prices: {
    perMinute: { label: 'Minutpris', amount: '4 kr', detail: 'per minut' },
    fifteen: { label: '15 min solning', amount: '60 kr', detail: 'fast paket' },
  },
  guestFee: '2 500 kr',
} as const

export const navItems = [
  { href: '#tjanster', label: 'Solarium' },
  { href: '#sakerhet', label: 'Trygghet' },
  { href: '#priser', label: 'Priser' },
  { href: '#medlemskap', label: 'Bli medlem' },
  { href: '#galleri', label: 'Galleri' },
  { href: '#kontakt', label: 'Kontakt' },
] as const

export const galleryImages = [
  {
    src: assetPath('gallery/studio-01.jpg'),
    alt: 'Solariumkabin hos Studio Aura med varm belysning',
  },
  {
    src: assetPath('gallery/studio-02.jpg'),
    alt: 'Interiördetalj i Studio Aura',
  },
  {
    src: assetPath('gallery/studio-03.jpg'),
    alt: 'Solstudioatmosfär i Strömsnäsbruk',
  },
  {
    src: assetPath('gallery/studio-04.jpg'),
    alt: 'Belysning och miljö i studion',
  },
  {
    src: assetPath('gallery/studio-05.jpg'),
    alt: 'Studio Aura – lokal och utrustning',
  },
  {
    src: assetPath('gallery/studio-06.jpg'),
    alt: 'Detalj från solstudion',
  },
  {
    src: assetPath('gallery/studio-07.jpg'),
    alt: 'Inbjudande miljö hos Studio Aura',
  },
  {
    src: assetPath('gallery/studio-08.jpg'),
    alt: 'Studio Aura – solupplevelse',
  },
] as const
