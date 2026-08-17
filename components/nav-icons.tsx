import { Github } from 'lucide-react'

import { cn } from '@/lib/utils'

type NavIconProps = {
  className?: string
}

function NavIconShell({
  className,
  children,
}: NavIconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      className={cn('shrink-0', className)}
      aria-hidden
    >
      {children}
    </svg>
  )
}

/** Parth-style filled home icon */
export function NavHomeIcon({ className }: NavIconProps) {
  return (
    <NavIconShell className={className}>
      <path
        d='m12,5.876l-8,6.546v7.578c0,1.654,1.346,3,3,3h4v-4h2v4h4c1.654,0,3-1.346,3-3v-7.578l-8-6.546Zm2,10.124h-4v-4h4v4Z'
        fill='currentColor'
      />
      <polygon
        points='22.367 11.774 12 3.292 1.633 11.774 .367 10.226 12 .708 23.633 10.226 22.367 11.774'
        fill='currentColor'
      />
    </NavIconShell>
  )
}

/** Parth-style filled blog/document icon */
export function NavBlogIcon({ className }: NavIconProps) {
  return (
    <NavIconShell className={className}>
      <path
        d='M16 23L22 17C22.8284 16.1716 22.8284 14.8285 22 14C21.1716 13.1716 19.8284 13.1716 19 14L13 20V23H16Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.95711 1.87868C9.51972 1.31607 10.2828 1 11.0784 1H18C19.6569 1 21 2.34315 21 4V11.409C19.7855 11.2614 18.5179 11.6536 17.5858 12.5858L11.5858 18.5858C11.2107 18.9609 11 19.4696 11 20V23H6C4.34315 23 3 21.6569 3 20V9.07843C3 8.28278 3.31607 7.51972 3.87868 6.95711L8.95711 1.87868ZM5 9H11V3L5 9Z'
        fill='currentColor'
      />
    </NavIconShell>
  )
}

/** Parth-style filled suitcase/projects icon */
export function NavProjectsIcon({ className }: NavIconProps) {
  return (
    <NavIconShell className={className}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 1H17V7H15V3H9V7H7V1Z'
        fill='currentColor'
      />
      <path
        d='M1 5H23V11C23 12.6569 21.6569 14 20 14H14V15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15V14H4C2.34315 14 1 12.6569 1 11V5Z'
        fill='currentColor'
      />
    </NavIconShell>
  )
}

/** Filled mail icon in the same visual family as Parth's command menu icons */
export function NavContactIcon({ className }: NavIconProps) {
  return (
    <NavIconShell className={className}>
      <path
        d='M19 9H5C3.346 9 2 10.346 2 12V19C2 20.654 3.346 22 5 22H19C20.654 22 22 20.654 22 19V12C22 10.346 20.654 9 19 9ZM20 19C20 19.552 19.552 20 19 20H5C4.448 20 4 19.552 4 19V12.749L11.571 17.334C11.812 17.494 12.188 17.494 12.429 17.334L20 12.749V19ZM19 11H5C4.734 11 4.477 11.105 4.293 11.293L12 16.066L19.707 11.293C19.523 11.105 19.266 11 19 11Z'
        fill='currentColor'
      />
    </NavIconShell>
  )
}

export function NavGithubIcon({ className }: NavIconProps) {
  return <Github className={cn('shrink-0', className)} strokeWidth={1.75} />
}

export function XBrandIcon({ className }: NavIconProps) {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 24 24'
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <path d='M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z' />
    </svg>
  )
}
