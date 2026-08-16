'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { toggleThemeWithViewTransition } from '@/lib/theme-transition'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  variant?: 'default' | 'nav'
}

export default function ThemeToggle({ variant = 'default' }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          variant === 'nav' &&
            'h-10 w-10 rounded-full border border-white/10 bg-[#111111]'
        )}
      />
    )
  }

  const isLight = resolvedTheme === 'light'

  function handleThemeToggle(event: React.MouseEvent<HTMLButtonElement>) {
    toggleThemeWithViewTransition({
      currentTheme: resolvedTheme,
      setTheme,
      x: event.clientX,
      y: event.clientY,
    })
  }

  if (variant === 'nav') {
    return (
      <button
        type='button'
        aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
        onClick={handleThemeToggle}
        className='nav-icon-btn relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#111111] text-white/70 ring-1 ring-white/[0.06] transition-all duration-300 hover:text-white hover:ring-white/15'
      >
        {isLight ? (
          <SunIcon className='size-4 text-amber-400' />
        ) : (
          <MoonIcon className='size-4 text-slate-300' />
        )}
      </button>
    )
  }

  return (
    <button
      type='button'
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={handleThemeToggle}
      className='inline-flex items-center justify-center rounded-md p-2 hover:bg-accent'
    >
      {isLight ? (
        <SunIcon className='size-4 text-yellow-600' />
      ) : (
        <MoonIcon className='size-4 text-gray-300' />
      )}
    </button>
  )
}
