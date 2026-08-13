import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { label?: string }

function Base({ children, label, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      {...props}
    >
      {children}
    </svg>
  )
}

export const Icons = {
  home: (props: IconProps) => (
    <Base {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
    </Base>
  ),
  wallet: (props: IconProps) => (
    <Base {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </Base>
  ),
  visit: (props: IconProps) => (
    <Base {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c1.6-3.4 4-5 7-5s5.4 1.6 7 5" />
    </Base>
  ),
  gift: (props: IconProps) => (
    <Base {...props}>
      <rect x="4" y="10" width="16" height="10" rx="1.5" />
      <path d="M12 7v13M4 14h16" />
      <path d="M12 7c-2-3-5-3-5-.5S10 8 12 7c2 3 5 3 5 .5S14 6 12 7Z" />
    </Base>
  ),
  user: (props: IconProps) => (
    <Base {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c1.6-3.4 4-5 7-5s5.4 1.6 7 5" />
    </Base>
  ),
  plus: (props: IconProps) => (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  ),
  close: (props: IconProps) => (
    <Base {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  ),
  arrow: (props: IconProps) => (
    <Base {...props}>
      <path d="M5 12h12M12 6l6 6-6 6" />
    </Base>
  ),
  info: (props: IconProps) => (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 10.5V16M12 7.5h.01" />
    </Base>
  ),
  check: (props: IconProps) => (
    <Base {...props}>
      <path d="M5 12.5 9.5 17 19 7.5" />
    </Base>
  ),
  alert: (props: IconProps) => (
    <Base {...props}>
      <path d="M12 4 21 19H3L12 4Z" />
      <path d="M12 10v4M12 16.5h.01" />
    </Base>
  ),
  trend: (props: IconProps) => (
    <Base {...props}>
      <path d="M4 17 10 11l4 4 6-8" />
      <path d="M15 7h5v5" />
    </Base>
  ),
  clock: (props: IconProps) => (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  ),
  copy: (props: IconProps) => (
    <Base {...props}>
      <rect x="8" y="8" width="11" height="11" rx="1.5" />
      <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
    </Base>
  ),
  settings: (props: IconProps) => (
    <Base {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M4.9 6.5l1.6 1.6M17.5 15.9l1.6 1.6M3.5 12h2.2M18.3 12h2.2M4.9 17.5l1.6-1.6M17.5 8.1l1.6-1.6" />
    </Base>
  ),
  help: (props: IconProps) => (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.2a2.6 2.6 0 1 1 3.5 2.4c-.7.4-1.1.9-1.1 1.7V14" />
      <path d="M12 17h.01" />
    </Base>
  ),
  logout: (props: IconProps) => (
    <Base {...props}>
      <path d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10" />
      <path d="M13 12h7M16 8l4 4-4 4" />
    </Base>
  ),
  mail: (props: IconProps) => (
    <Base {...props}>
      <rect x="3.5" y="6" width="17" height="12" rx="1.5" />
      <path d="m4.5 8 7.5 5.5L19.5 8" />
    </Base>
  ),
  calendar: (props: IconProps) => (
    <Base {...props}>
      <rect x="4" y="6" width="16" height="14" rx="1.5" />
      <path d="M8 4v4M16 4v4M4 11h16" />
    </Base>
  ),
  shield: (props: IconProps) => (
    <Base {...props}>
      <path d="M12 3.5 19 6.5v5.2c0 4.4-2.9 7.3-7 8.8-4.1-1.5-7-4.4-7-8.8V6.5L12 3.5Z" />
    </Base>
  ),
  spark: (props: IconProps) => (
    <Base {...props}>
      <path d="M12 3.5 13.6 9.2 19 12l-5.4 2.8L12 20.5l-1.6-5.7L5 12l5.4-2.8L12 3.5Z" />
    </Base>
  ),
  scissors: (props: IconProps) => (
    <Base {...props}>
      <circle cx="6" cy="7" r="2.4" />
      <circle cx="6" cy="17" r="2.4" />
      <path d="M8 8.2 20 18M8 15.8 20 6" />
    </Base>
  ),
  sun: (props: IconProps) => (
    <Base {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.6v1.8M12 18.6v1.8M3.6 12h1.8M18.6 12h1.8M6.2 6.2l1.3 1.3M16.5 16.5l1.3 1.3M6.2 17.8l1.3-1.3M16.5 7.5l1.3-1.3" />
    </Base>
  ),
}
