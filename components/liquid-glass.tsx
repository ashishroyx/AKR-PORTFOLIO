'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const blurClasses = {
  sm: 'backdrop-blur-xs',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
} as const

type LiquidGlassProps = {
  children: React.ReactNode
  className?: string
  expandable?: boolean
  draggable?: boolean
  width?: string
  height?: string
  expandedWidth?: string
  expandedHeight?: string
  borderRadius?: string
  blurIntensity?: keyof typeof blurClasses
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function LiquidGlass({
  children,
  className,
  expandable = false,
  draggable = false,
  width = 'auto',
  height = 'auto',
  expandedWidth = 'auto',
  expandedHeight = 'auto',
  borderRadius = '32px',
  blurIntensity = 'xl',
  isOpen,
  onOpenChange,
}: LiquidGlassProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [glassFilterEnabled, setGlassFilterEnabled] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setGlassFilterEnabled(false)
    }
  }, [])

  const open = isOpen ?? internalOpen

  const setOpen = (next: boolean) => {
    onOpenChange?.(next)
    if (isOpen === undefined) {
      setInternalOpen(next)
    }
  }

  const shellClassName = cn(
    'relative overflow-hidden',
    expandable && 'cursor-pointer',
    draggable && 'cursor-grab active:cursor-grabbing',
    className
  )

  const glassLayers = (
    <>
      <div
        className={cn(
          'liquid-glass-bend absolute inset-0 z-0',
          blurClasses[blurIntensity]
        )}
        style={{
          borderRadius,
          filter: glassFilterEnabled ? 'url(#glass-blur)' : undefined,
        }}
        aria-hidden
      />
      <div
        className='absolute inset-0 z-10'
        style={{
          borderRadius,
          boxShadow:
            '0 4px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(0, 0, 0, 0.05)',
        }}
        aria-hidden
      />
      <div
        className='absolute inset-0 z-20'
        style={{
          borderRadius,
          boxShadow: 'inset 0 0 0 0 rgba(255, 255, 255, 0)',
        }}
        aria-hidden
      />
      <div className='relative z-30'>{children}</div>
    </>
  )

  if (expandable) {
    return (
      <motion.div
        className={shellClassName}
        style={{ borderRadius }}
        variants={{
          collapsed: {
            width: width || 'auto',
            height: height || 'auto',
            transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
          },
          expanded: {
            width: expandedWidth || 'auto',
            height: expandedHeight || 'auto',
            transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
          },
        }}
        animate={open ? 'expanded' : 'collapsed'}
        onClick={event => {
          const target = event.target
          if (
            target instanceof Element &&
            target.closest(
              'a, button, input, select, textarea, [cmdk-root], [cmdk-input], [cmdk-item]'
            )
          ) {
            return
          }
          setOpen(!open)
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {glassLayers}
      </motion.div>
    )
  }

  return (
    <div
      className={shellClassName}
      style={{
        borderRadius,
        width,
        height,
      }}
    >
      {glassLayers}
    </div>
  )
}
