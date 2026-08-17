'use client'

import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

type CommandMenuTriggerProps = {
  onClick: () => void
  className?: string
}

const CommandMenuTrigger = forwardRef<HTMLButtonElement, CommandMenuTriggerProps>(
  function CommandMenuTrigger({ onClick, className }, ref) {
    return (
      <button
        ref={ref}
        type='button'
        aria-label='Open Command Menu'
        aria-haspopup='dialog'
        onClick={onClick}
        className={cn('command-menu-trigger group', className)}
      >
        <span className='relative z-[2] text-white/70 transition-colors duration-300 group-hover:text-white'>
          <svg
            width='18'
            height='18'
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
      </button>
    )
  }
)

export default CommandMenuTrigger
