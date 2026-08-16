import { cn } from '@/lib/utils'

type NavActionButtonProps = {
  label: string
  children: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  compact?: boolean
}

export default function NavActionButton({
  label,
  children,
  href,
  onClick,
  className,
  compact = false,
}: NavActionButtonProps) {
  const classes = cn(
    'nav-action-btn',
    compact && 'nav-action-btn-compact',
    className
  )

  const content = (
    <>
      <span
        aria-hidden
        className='pointer-events-none absolute inset-0 z-[1] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_54%)]'
      />
      <span className='relative z-[2] flex items-center justify-center'>{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer noopener'
        aria-label={label}
        className={classes}
      >
        {content}
      </a>
    )
  }

  return (
    <button type='button' aria-label={label} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
