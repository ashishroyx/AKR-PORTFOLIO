'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import ThemeIcon from '@/components/theme-icon'
import { toggleThemeWithViewTransition } from '@/lib/theme-transition'
import { cn } from '@/lib/utils'

type NavThemeButtonProps = {
  className?: string
}

export default function NavThemeButton({ className }: NavThemeButtonProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn('nav-theme-btn opacity-0', className)} aria-hidden />
    )
  }

  const isLight = resolvedTheme === 'light'

  return (
    <button
      type='button'
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={event =>
        toggleThemeWithViewTransition({
          currentTheme: resolvedTheme,
          setTheme,
          x: event.clientX,
          y: event.clientY,
        })
      }
      className={cn('nav-theme-btn group', className)}
    >
      <ThemeIcon className='h-3.5 w-3.5 text-white/70 transition-colors duration-300 group-hover:text-white' />
    </button>
  )
}
