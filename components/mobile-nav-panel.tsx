'use client'

import { Link } from 'next-view-transitions'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

import AkrLogo from '@/components/akr-logo'
import LiquidGlass from '@/components/liquid-glass'
import ThemeIcon from '@/components/theme-icon'
import { navLinks, renderNavIcon, socialLinks } from '@/lib/nav-config'
import { toggleThemeWithViewTransition } from '@/lib/theme-transition'
import { cn } from '@/lib/utils'

type MobileNavPanelProps = {
  expanded: boolean
  onExpandedChange: (open: boolean) => void
  onOpenCommandMenu: () => void
  activeIndex: number
}

export default function MobileNavPanel({
  expanded,
  onExpandedChange,
  onOpenCommandMenu,
  activeIndex,
}: MobileNavPanelProps) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <>
      {expanded && (
        <button
          type='button'
          aria-label='Close navigation menu'
          className='fixed inset-0 z-[99] bg-transparent'
          onClick={() => onExpandedChange(false)}
        />
      )}

      <div className='fixed top-4 left-0 z-[100] flex w-full justify-center px-4 md:hidden'>
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className='flex w-full justify-center'
        >
          <LiquidGlass
            expandable
            draggable={false}
            width='auto'
            height='48px'
            expandedWidth='92vw'
            expandedHeight='auto'
            borderRadius='24px'
            blurIntensity='xl'
            isOpen={expanded}
            onOpenChange={onExpandedChange}
            className='overflow-hidden border border-neutral-200 bg-white/80 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-[#0a0a0a]/60 dark:shadow-black/20'
          >
            <div className='relative z-30 flex w-full flex-col'>
              <div className='flex h-12 w-full shrink-0 items-center gap-3 px-5'>
                <Link
                  href='/'
                  className='relative z-30 shrink-0'
                  onClick={event => event.stopPropagation()}
                >
                  <AkrLogo className='h-7 w-7' />
                </Link>

                <svg
                  width='2'
                  height='20'
                  viewBox='0 0 2 20'
                  className='opacity-30'
                  aria-hidden
                >
                  <line
                    x1='1'
                    y1='0'
                    x2='1'
                    y2='20'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    className='text-neutral-500 dark:text-white'
                  />
                </svg>

                <span className='font-outfit flex-1 truncate text-xs font-medium tracking-wide text-neutral-800 dark:text-white/90'>
                  Ashish Kumar Roy
                </span>

                <button
                  type='button'
                  aria-label='Toggle theme'
                  className='relative z-30 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200/50 transition-all duration-300 hover:bg-neutral-300/50 dark:bg-white/10 dark:hover:bg-white/20'
                  onClick={event => {
                    event.stopPropagation()
                    toggleThemeWithViewTransition({
                      currentTheme: resolvedTheme,
                      setTheme,
                      x: event.clientX,
                      y: event.clientY,
                    })
                  }}
                >
                  <ThemeIcon className='text-neutral-600 dark:text-white' />
                </button>
              </div>

              <div
                className='flex max-h-[65vh] flex-col gap-0.5 overflow-y-auto overscroll-contain px-3 pb-4'
                style={{ touchAction: 'pan-y', scrollBehavior: 'smooth' }}
                onTouchStart={event => event.stopPropagation()}
                onTouchMove={event => event.stopPropagation()}
                onPointerDown={event => event.stopPropagation()}
                onClick={event => event.stopPropagation()}
              >
                {navLinks.map((link, index) => {
                  const active = activeIndex === index

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => onExpandedChange(false)}
                      className={cn(
                        'font-outfit flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all',
                        active
                          ? 'bg-neutral-200/80 font-medium text-neutral-900 dark:bg-white/10 dark:text-white'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white'
                      )}
                    >
                      {renderNavIcon(link.icon)}
                      <span>{link.label}</span>
                    </Link>
                  )
                })}

                <div className='mx-2 my-1 h-px bg-neutral-200 dark:bg-white/10' />

                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={() => onExpandedChange(false)}
                    className='font-outfit flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white'
                  >
                    {renderNavIcon(link.icon)}
                    <span>{link.label}</span>
                  </a>
                ))}

                <button
                  type='button'
                  onClick={event => {
                    event.stopPropagation()
                    onExpandedChange(false)
                    onOpenCommandMenu()
                  }}
                  className='font-outfit flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white'
                >
                  <span className='flex h-5 w-5 items-center justify-center opacity-70'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      aria-hidden
                    >
                      <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
                    </svg>
                  </span>
                  <span>Command Menu</span>
                </button>
              </div>
            </div>
          </LiquidGlass>
        </motion.div>
      </div>
    </>
  )
}

export { navLinks as mobileNavLinks }
