'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import { usePathname } from 'next/navigation'

import CommandMenuTrigger from '@/components/command-menu-trigger'
import HeaderBrand from '@/components/header-brand'
import MobileNavPanel, { mobileNavLinks } from '@/components/mobile-nav-panel'
import NavPillLink, { useNavPillMotion } from '@/components/nav-pill-link'
import NavThemeButton from '@/components/nav-theme-button'
import { navLinks } from '@/lib/nav-config'
import { clearThemeTransitionState } from '@/lib/view-transitions'

const CommandMenu = dynamic(() => import('@/components/command-menu'), {
  ssr: false,
})

function resolveActiveIndex(pathname: string) {
  const exact = mobileNavLinks.findIndex(link => link.href === pathname)
  if (exact !== -1) return exact

  const nested = mobileNavLinks.findIndex(
    link => link.href !== '/' && pathname.startsWith(link.href)
  )
  return nested !== -1 ? nested : 0
}

export default function Header() {
  const pathname = usePathname()
  const [commandOpen, setCommandOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() => resolveActiveIndex(pathname))

  const { circleRefs, onHoverStart, onHoverEnd } = useNavPillMotion(
    mobileNavLinks.length
  )

  useEffect(() => {
    clearThemeTransitionState()
    setActiveIndex(resolveActiveIndex(pathname))
  }, [pathname])

  useEffect(() => {
    setCommandOpen(false)
    setMobileExpanded(false)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(open => !open)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const navItems = useMemo(() => navLinks, [])

  return (
    <>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

      <MobileNavPanel
        expanded={mobileExpanded}
        onExpandedChange={setMobileExpanded}
        onOpenCommandMenu={() => setCommandOpen(true)}
        activeIndex={activeIndex}
      />

      <nav
        aria-label='Main navigation'
        className='site-header pointer-events-none fixed top-0 left-0 z-[100] hidden w-full justify-center px-6 md:flex'
      >
        <div className='pointer-events-auto flex h-16 w-full items-center justify-between md:h-20'>
          <HeaderBrand />

          <div className='relative z-50 flex flex-1 justify-center'>
            <div className='nav-track relative isolate flex h-[44px] items-center overflow-visible rounded-full px-1.5 py-1'>
              <LayoutGroup id='main-nav-pills'>
                <ul className='relative z-[3] m-0 flex h-full list-none items-center gap-0 p-0'>
                  {navItems.map((link, index) => (
                    <li key={link.href} className='relative flex h-full'>
                      <NavPillLink
                        href={link.href}
                        label={link.label}
                        index={index}
                        activeIndex={activeIndex}
                        onActivate={setActiveIndex}
                        circleRef={element => {
                          circleRefs.current[index] = element
                        }}
                        onHoverStart={onHoverStart}
                        onHoverEnd={onHoverEnd}
                      />
                    </li>
                  ))}
                </ul>
              </LayoutGroup>

              <span className='mx-2 h-4 w-px shrink-0 bg-white/10' aria-hidden />

              <NavThemeButton />
            </div>
          </div>

          <div className='flex w-[200px] items-center justify-end'>
            <CommandMenuTrigger onClick={() => setCommandOpen(true)} />
          </div>
        </div>
      </nav>
    </>
  )
}
