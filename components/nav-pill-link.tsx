'use client'

import { Link } from 'next-view-transitions'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

import { cn } from '@/lib/utils'

const activePillTransition = {
  type: 'spring' as const,
  stiffness: 350,
  damping: 30,
}

type NavPillLinkProps = {
  href: string
  label: string
  index: number
  activeIndex: number
  onActivate: (index: number) => void
  circleRef?: (element: HTMLSpanElement | null) => void
  onHoverStart?: (index: number) => void
  onHoverEnd?: (index: number) => void
}

export default function NavPillLink({
  href,
  label,
  index,
  activeIndex,
  onActivate,
  circleRef,
  onHoverStart,
  onHoverEnd,
}: NavPillLinkProps) {
  const isActive = activeIndex === index
  const wasActiveRef = useRef(isActive)

  useEffect(() => {
    if (isActive && !wasActiveRef.current) {
      onHoverEnd?.(index)
    }
    wasActiveRef.current = isActive
  }, [isActive, index, onHoverEnd])

  return (
    <Link
      href={href}
      onClick={() => {
        if (activeIndex !== index) onActivate(index)
      }}
      onMouseEnter={() => onHoverStart?.(index)}
      onMouseLeave={() => {
        if (!isActive) onHoverEnd?.(index)
      }}
      className={cn(
        'nav-pill relative inline-flex h-full items-center justify-center overflow-hidden rounded-full px-4 py-1.5 text-sm font-light leading-none no-underline transition-[color,text-shadow] duration-500',
        isActive ? 'active-pill text-black' : 'text-white/90 hover:text-white'
      )}
      style={{ background: 'transparent' }}
    >
      <span
        ref={circleRef}
        aria-hidden
        className='hover-circle pointer-events-none absolute bottom-0 left-1/2 z-[1] block rounded-full bg-white'
        style={{ willChange: 'transform' }}
      />

      {isActive && (
        <motion.div
          layoutId='active-pill'
          aria-hidden
          className='absolute inset-0 -z-[1] rounded-full bg-white'
          transition={activePillTransition}
        >
          <div className='absolute inset-0 w-full rounded-full bg-white/[0.025]'>
            <div className='absolute -top-[9px] left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-white'>
              <div className='absolute -top-2 -left-2 h-6 w-12 rounded-full bg-white/10 blur-md' />
              <div className='absolute -top-1 h-6 w-8 rounded-full bg-white/10 blur-md' />
              <div className='absolute top-0 left-2 h-4 w-4 rounded-full bg-white/10 blur-sm' />
            </div>
          </div>
        </motion.div>
      )}

      <span className='label-stack relative z-[2] inline-block leading-none'>
        <span className='pill-label relative z-[2] inline-block font-outfit text-sm font-light leading-none'>
          {label}
        </span>
        <span className='pill-label-hover absolute left-0 top-0 z-[3] inline-block font-outfit text-sm font-light text-black'>
          {label}
        </span>
      </span>
    </Link>
  )
}

export function useNavPillMotion(itemCount: number) {
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([])
  const timelinesRef = useRef<Array<gsap.core.Timeline | null>>([])
  const hoverTweensRef = useRef<Array<gsap.core.Tween | null>>([])

  useEffect(() => {
    const setup = () => {
      circleRefs.current.forEach((circle, index) => {
        const parent = circle?.parentElement
        if (!circle || !parent) return

        const { width, height } = parent.getBoundingClientRect()
        if (width === 0 || height === 0) return

        const radius = (width * width / 4 + height * height) / (2 * height)
        const scaled = Math.ceil(radius * 2) + 2
        const bottom =
          Math.ceil(
            radius - Math.sqrt(Math.max(0, radius * radius - (width * width) / 4))
          ) + 1
        const originY = scaled - bottom

        circle.style.width = `${scaled}px`
        circle.style.height = `${scaled}px`
        circle.style.bottom = `-${bottom}px`

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        })

        const label = parent.querySelector('.pill-label')
        const labelHover = parent.querySelector('.pill-label-hover')

        if (label) gsap.set(label, { y: 0, opacity: 1 })
        if (labelHover) gsap.set(labelHover, { y: height + 12, opacity: 0 })

        timelinesRef.current[index]?.kill()
        hoverTweensRef.current[index]?.kill()

        const timeline = gsap.timeline({ paused: true })
        timeline.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease: 'power3.out', overwrite: 'auto' },
          0
        )

        if (label) {
          timeline.to(
            label,
            {
              y: -(height + 8),
              opacity: 0,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0
          )
        }

        if (labelHover) {
          gsap.set(labelHover, { y: Math.ceil(height + 100), opacity: 0 })
          timeline.to(
            labelHover,
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0.06
          )
        }

        timelinesRef.current[index] = timeline
      })
    }

    setup()
    const timeout = window.setTimeout(setup, 100)
    window.addEventListener('resize', setup)
    document.fonts?.ready.then(setup).catch(() => {})

    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('resize', setup)
      timelinesRef.current.forEach(timeline => timeline?.kill())
      hoverTweensRef.current.forEach(tween => tween?.kill())
    }
  }, [itemCount])

  function onHoverStart(index: number) {
    const timeline = timelinesRef.current[index]
    const circle = circleRefs.current[index]
    const parent = circle?.parentElement
    if (!timeline || !parent) return

    const label = parent.querySelector('.pill-label')
    const labelHover = parent.querySelector('.pill-label-hover')

    hoverTweensRef.current[index]?.kill()

    // Swap to dark label quickly so text stays readable on the white circle.
    if (label) {
      gsap.to(label, { opacity: 0, duration: 0.12, ease: 'power2.out', overwrite: 'auto' })
    }
    if (labelHover) {
      gsap.to(labelHover, {
        y: 0,
        opacity: 1,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    hoverTweensRef.current[index] = timeline.tweenTo(timeline.duration(), {
      duration: 0.6,
      ease: 'expo.out',
      overwrite: 'auto',
    })
  }

  function onHoverEnd(index: number) {
    const timeline = timelinesRef.current[index]
    const circle = circleRefs.current[index]
    const parent = circle?.parentElement
    if (!timeline || !parent) return

    const label = parent.querySelector('.pill-label')
    const labelHover = parent.querySelector('.pill-label-hover')
    const { height } = parent.getBoundingClientRect()

    hoverTweensRef.current[index]?.kill()

    if (label) {
      gsap.to(label, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
    }
    if (labelHover) {
      gsap.to(labelHover, {
        y: height + 12,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    hoverTweensRef.current[index] = timeline.tweenTo(0, {
      duration: 0.5,
      ease: 'expo.out',
      overwrite: 'auto',
    })
  }

  return {
    circleRefs,
    onHoverStart,
    onHoverEnd,
  }
}
