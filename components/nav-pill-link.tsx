'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

type NavPillLinkProps = {
  href: string
  label: string
  isActive: boolean
  onClick?: () => void
}

export default function NavPillLink({
  href,
  label,
  isActive,
  onClick,
}: NavPillLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'nav-pill relative inline-flex h-full min-h-[30px] items-center justify-center overflow-hidden rounded-full px-6 py-1 text-[13px] font-light leading-none no-underline transition-[color,text-shadow] duration-500 md:px-7',
        isActive
          ? 'nav-pill-active text-black'
          : 'text-white/65 hover:text-white/85'
      )}
    >
      <span
        aria-hidden
        className={cn(
          'nav-pill-hover-circle pointer-events-none absolute inset-0 z-[1] rounded-full bg-white',
          isActive && 'is-visible'
        )}
      />
      <span className='nav-pill-label-stack relative z-[2] inline-block'>
        <span className='nav-pill-label block'>{label}</span>
        <span className='nav-pill-label-hover absolute inset-x-0 top-0 text-black'>
          {label}
        </span>
      </span>
    </Link>
  )
}
