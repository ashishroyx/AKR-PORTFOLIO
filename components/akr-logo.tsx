import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const PIXEL = 2

const GLYPHS: Record<string, string[]> = {
  A: ['0110', '1001', '1001', '1111', '1001', '1001'],
  K: ['1001', '1010', '1100', '1100', '1010', '1001'],
  R: ['1110', '1001', '1001', '1110', '1010', '1001'],
}

function glyphRects(letter: string, offsetX: number, offsetY: number, fill: string) {
  const rows = GLYPHS[letter]
  const rects: ReactNode[] = []

  rows.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      if (cell !== '1') return
      rects.push(
        <rect
          key={`${letter}-${offsetX}-${offsetY}-${x}-${y}`}
          x={offsetX + x * PIXEL}
          y={offsetY + y * PIXEL}
          width={PIXEL}
          height={PIXEL}
          fill={fill}
        />
      )
    })
  })

  return rects
}

function Monogram({ variant }: { variant: 'light' | 'dark' }) {
  const letterFill = variant === 'light' ? '#171717' : '#F5F5F5'
  const letterWidth = 4 * PIXEL
  const letterHeight = 6 * PIXEL
  const gap = PIXEL
  const totalWidth = letterWidth * 3 + gap * 2
  const startX = (32 - totalWidth) / 2
  const startY = (32 - letterHeight) / 2

  return (
    <>
      {glyphRects('A', startX, startY, letterFill)}
      {glyphRects('K', startX + letterWidth + gap, startY, letterFill)}
      {glyphRects('R', startX + (letterWidth + gap) * 2, startY, letterFill)}
    </>
  )
}

type AkrLogoProps = {
  className?: string
}

export default function AkrLogo({ className }: AkrLogoProps) {
  return (
    <>
      <svg
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={cn(
          'h-8 w-8 shrink-0 [image-rendering:pixelated] dark:hidden',
          className
        )}
        aria-hidden
      >
        <Monogram variant='light' />
      </svg>
      <svg
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={cn(
          'hidden h-8 w-8 shrink-0 [image-rendering:pixelated] dark:block',
          className
        )}
        aria-hidden
      >
        <Monogram variant='dark' />
      </svg>
    </>
  )
}
