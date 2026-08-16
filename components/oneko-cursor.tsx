'use client'

import { useEffect, useRef, useState } from 'react'

const NEKO_SPEED = 10

const SPRITE_SETS = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
} as const

type SpriteName = keyof typeof SPRITE_SETS
type IdleAnimation =
  | 'sleeping'
  | 'scratchSelf'
  | 'scratchWallN'
  | 'scratchWallS'
  | 'scratchWallE'
  | 'scratchWallW'

function shouldEnableOneko() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  // Prefer hover-capable pointers (desktop/laptop trackpads & mice)
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function getViewportCenter() {
  return {
    x: Math.round(window.innerWidth / 2),
    y: Math.round(window.innerHeight / 2),
  }
}

export default function OnekoCursor() {
  const nekoRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(shouldEnableOneko())
  }, [])

  useEffect(() => {
    if (!enabled) return

    let nekoEl = nekoRef.current
    let cancelled = false
    let rafId = 0
    let cleanup: (() => void) | undefined

    const start = () => {
      if (cancelled) return

      nekoEl = nekoRef.current
      if (!nekoEl) {
        rafId = requestAnimationFrame(start)
        return
      }

      const center = getViewportCenter()

      let nekoPosX = center.x
      let nekoPosY = center.y
      let mousePosX = center.x
      let mousePosY = center.y
      let frameCount = 0
      let idleTime = 0
      let idleAnimation: IdleAnimation | null = null
      let idleAnimationFrame = 0
      let lastFrameTimestamp: number | undefined
      let loopRafId = 0

      const setSprite = (name: SpriteName, frame: number) => {
        if (!nekoEl) return
        const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length]
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`
      }

      const resetIdleAnimation = () => {
        idleAnimation = null
        idleAnimationFrame = 0
      }

      const updatePosition = () => {
        if (!nekoEl) return
        nekoEl.style.left = `${nekoPosX - 16}px`
        nekoEl.style.top = `${nekoPosY - 16}px`
      }

      const idle = () => {
        idleTime += 1

        if (
          idleTime > 10 &&
          Math.floor(Math.random() * 200) === 0 &&
          idleAnimation === null
        ) {
          const availableIdleAnimations: IdleAnimation[] = [
            'sleeping',
            'scratchSelf',
          ]

          if (nekoPosX < 32) availableIdleAnimations.push('scratchWallW')
          if (nekoPosY < 32) availableIdleAnimations.push('scratchWallN')
          if (nekoPosX > window.innerWidth - 32)
            availableIdleAnimations.push('scratchWallE')
          if (nekoPosY > window.innerHeight - 32)
            availableIdleAnimations.push('scratchWallS')

          idleAnimation =
            availableIdleAnimations[
              Math.floor(Math.random() * availableIdleAnimations.length)
            ]
        }

        switch (idleAnimation) {
          case 'sleeping':
            if (idleAnimationFrame < 8) {
              setSprite('tired', 0)
              break
            }
            setSprite('sleeping', Math.floor(idleAnimationFrame / 4))
            if (idleAnimationFrame > 192) resetIdleAnimation()
            break
          case 'scratchWallN':
          case 'scratchWallS':
          case 'scratchWallE':
          case 'scratchWallW':
          case 'scratchSelf':
            setSprite(idleAnimation, idleAnimationFrame)
            if (idleAnimationFrame > 9) resetIdleAnimation()
            break
          default:
            setSprite('idle', 0)
            return
        }

        idleAnimationFrame += 1
      }

      const frame = () => {
        frameCount += 1

        const diffX = nekoPosX - mousePosX
        const diffY = nekoPosY - mousePosY
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2)

        if (distance < NEKO_SPEED || distance < 48) {
          idle()
          return
        }

        idleAnimation = null
        idleAnimationFrame = 0

        if (idleTime > 1) {
          setSprite('alert', 0)
          idleTime = Math.min(idleTime, 7)
          idleTime -= 1
          return
        }

        let direction = ''
        if (diffY / distance > 0.5) direction += 'N'
        if (diffY / distance < -0.5) direction += 'S'
        if (diffX / distance > 0.5) direction += 'W'
        if (diffX / distance < -0.5) direction += 'E'

        setSprite((direction || 'idle') as SpriteName, frameCount)

        nekoPosX -= (diffX / distance) * NEKO_SPEED
        nekoPosY -= (diffY / distance) * NEKO_SPEED

        nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16)
        nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16)

        updatePosition()
      }

      const onMouseMove = (event: MouseEvent) => {
        mousePosX = event.clientX
        mousePosY = event.clientY
      }

      const onAnimationFrame = (timestamp: number) => {
        if (cancelled || !nekoEl?.isConnected) return

        if (!lastFrameTimestamp) lastFrameTimestamp = timestamp

        if (timestamp - lastFrameTimestamp > 100) {
          lastFrameTimestamp = timestamp
          frame()
        }

        loopRafId = requestAnimationFrame(onAnimationFrame)
      }

      document.addEventListener('mousemove', onMouseMove)
      updatePosition()
      setSprite('idle', 0)
      loopRafId = requestAnimationFrame(onAnimationFrame)

      cleanup = () => {
        document.removeEventListener('mousemove', onMouseMove)
        cancelAnimationFrame(loopRafId)
      }
    }

    start()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      cleanup?.()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={nekoRef}
      aria-hidden='true'
      className='oneko-cursor pointer-events-none fixed z-[99999] h-8 w-8 [image-rendering:pixelated]'
      style={{
        left: 'calc(50% - 16px)',
        top: 'calc(50% - 16px)',
        backgroundImage: 'url(/oneko.gif)',
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}
