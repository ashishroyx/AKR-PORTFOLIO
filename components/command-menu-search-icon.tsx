import { cn } from '@/lib/utils'

type CommandMenuSearchIconProps = {
  className?: string
}

/** Parth-style keyboard + search icon for the command menu input */
export default function CommandMenuSearchIcon({
  className,
}: CommandMenuSearchIconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('h-5 w-5 shrink-0', className)}
      aria-hidden
    >
      <rect x='3' y='5' width='12' height='8' rx='1.5' />
      <path d='M7 8h.01M10 8h.01M13 8h.01M7 11h.01M10 11h.01' />
      <circle cx='16.5' cy='16.5' r='2.5' />
      <path d='m19 19 1.5 1.5' />
    </svg>
  )
}
