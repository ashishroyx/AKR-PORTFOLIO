'use client'

import { useEffect, useRef, useState } from 'react'
import { useTransitionRouter } from 'next-view-transitions'
import { useTheme } from 'next-themes'
import { Command } from 'cmdk'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { CornerDownLeft, X } from 'lucide-react'

import type { ReactNode } from 'react'

import ThemeIcon from '@/components/theme-icon'
import CommandMenuSearchIcon from '@/components/command-menu-search-icon'
import {
  navLinks,
  renderNavIcon,
  socialLinks,
  type NavAccent,
} from '@/lib/nav-config'
import { toggleThemeWithViewTransition } from '@/lib/theme-transition'

type CommandMenuItem = {
  label: string
  description: string
  href: string
  external?: boolean
  accent: NavAccent
  keywords: string
  icon: ReactNode
}

const pageItems: CommandMenuItem[] = navLinks.map(link => ({
  label: link.label,
  description: link.description,
  href: link.href,
  accent: link.accent,
  keywords: link.keywords,
  icon: renderNavIcon(link.icon, 'h-4 w-4'),
}))

const linkItems: CommandMenuItem[] = socialLinks.map(link => ({
  label: link.label,
  description: link.description,
  href: link.href,
  external: link.external,
  accent: link.accent,
  keywords: link.keywords,
  icon: renderNavIcon(link.icon, 'h-4 w-4'),
}))

const activePillTransition = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 32,
}

type PendingAction =
  | { type: 'route'; href: string }
  | { type: 'external'; href: string }
  | null

type CommandMenuProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CommandMenuItemRow({ item }: { item: CommandMenuItem }) {
  return (
    <>
      <div
        className={`command-menu-item-icon command-menu-item-icon--${item.accent}`}
      >
        {item.icon}
      </div>
      <div className='command-menu-item-copy'>
        <span className='command-menu-item-title'>{item.label}</span>
        <span className='command-menu-item-desc'>{item.description}</span>
      </div>
      <CornerDownLeft
        className='command-menu-item-enter'
        strokeWidth={1.75}
        aria-hidden
      />
    </>
  )
}

function CommandMenuListItem({
  item,
  onSelect,
}: {
  item: CommandMenuItem
  onSelect: () => void
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const node = itemRef.current
    if (!node) return

    const syncSelected = () => {
      setIsSelected(
        node.dataset.selected === 'true' ||
          node.getAttribute('aria-selected') === 'true'
      )
    }

    syncSelected()
    const observer = new MutationObserver(syncSelected)
    observer.observe(node, {
      attributes: true,
      attributeFilter: ['data-selected', 'aria-selected'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <Command.Item
      ref={itemRef}
      value={`${item.label} ${item.description} ${item.keywords}`}
      onSelect={onSelect}
      className='command-menu-item'
    >
      {isSelected && (
        <motion.div
          layoutId='command-menu-active-pill'
          className='command-menu-active-pill'
          transition={activePillTransition}
        />
      )}
      <div className='command-menu-item-inner'>
        <CommandMenuItemRow item={item} />
      </div>
    </Command.Item>
  )
}

export default function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useTransitionRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pendingActionRef = useRef<PendingAction>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onOpenChange])

  function queueAction(action: PendingAction) {
    pendingActionRef.current = action
    onOpenChange(false)
  }

  function runPendingAction() {
    const action = pendingActionRef.current
    pendingActionRef.current = null
    if (!action) return

    if (action.type === 'external') {
      window.open(action.href, '_blank', 'noopener,noreferrer')
      return
    }

    router.push(action.href)
  }

  function runItem(item: CommandMenuItem) {
    if (item.external) {
      queueAction({ type: 'external', href: item.href })
      return
    }

    queueAction({ type: 'route', href: item.href })
  }

  return (
    <AnimatePresence onExitComplete={runPendingAction}>
      {open && (
        <div className='command-menu-root'>
          <motion.button
            type='button'
            aria-label='Close command menu'
            className='command-menu-backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            className='command-menu-panel-wrap'
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className='command-menu-panel'>
              <Command label='Command Menu' className='command-menu-cmd'>
                <div className='command-menu-header'>
                  <div className='command-menu-search-row'>
                    <CommandMenuSearchIcon className='command-menu-search-icon' />
                    <Command.Input
                      autoFocus
                      placeholder='Type a command or search...'
                      className='command-menu-input'
                    />
                  </div>

                  <div className='command-menu-header-actions'>
                    {mounted && (
                      <button
                        type='button'
                        aria-label='Toggle theme'
                        className='command-menu-icon-btn'
                        onClick={event =>
                          toggleThemeWithViewTransition({
                            currentTheme: resolvedTheme,
                            setTheme,
                            x: event.clientX,
                            y: event.clientY,
                          })
                        }
                      >
                        <ThemeIcon className='h-4 w-4' />
                      </button>
                    )}
                    <button
                      type='button'
                      aria-label='Close'
                      className='command-menu-icon-btn command-menu-close-btn'
                      onClick={() => onOpenChange(false)}
                    >
                      <X className='h-4 w-4' strokeWidth={1.75} />
                    </button>
                  </div>
                </div>

                <Command.List className='command-menu-list'>
                  <Command.Empty className='command-menu-empty'>
                    No results found.
                  </Command.Empty>

                  <LayoutGroup id='command-menu-items'>
                    <Command.Group heading='Pages' className='command-menu-group'>
                      {pageItems.map(item => (
                        <CommandMenuListItem
                          key={item.label}
                          item={item}
                          onSelect={() => runItem(item)}
                        />
                      ))}
                    </Command.Group>

                    <Command.Group heading='Links' className='command-menu-group'>
                      {linkItems.map(item => (
                        <CommandMenuListItem
                          key={item.label}
                          item={item}
                          onSelect={() => runItem(item)}
                        />
                      ))}
                    </Command.Group>
                  </LayoutGroup>
                </Command.List>

                <div className='command-menu-footer'>
                  <div className='command-menu-footer-links'>
                    <span>Privacy</span>
                    <span>Terms</span>
                  </div>
                  <div className='command-menu-footer-shortcuts'>
                    <span className='command-menu-footer-shortcut'>
                      <kbd>↑</kbd>
                      <kbd>↓</kbd>
                      Navigate
                    </span>
                    <span className='command-menu-footer-shortcut'>
                      <kbd>⌘</kbd>
                      Open
                    </span>
                  </div>
                </div>
              </Command>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
