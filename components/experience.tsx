import Link from 'next/link'

import { ExperienceItem } from '@/lib/experience'
import { formatMonthYear } from '@/lib/utils'

function formatRange(startDate: string, endDate?: string) {
  const start = formatMonthYear(startDate)
  const end = endDate ? formatMonthYear(endDate) : 'Present'
  return `${start} — ${end}`
}

export default function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <ul className='flex w-full flex-col gap-8'>
      {items.map(item => {
        const content = (
          <div className='flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row'>
            <div className='max-w-lg'>
              <p className='text-lg font-semibold'>{item.role}</p>
              <p className='mt-1 text-sm font-semibold text-muted-foreground'>
                {item.company}
                {item.location ? ` · ${item.location}` : null}
              </p>
              <p className='mt-1 line-clamp-2 text-sm text-muted-foreground'>
                {item.summary}
              </p>
              {item.href ? (
                <p className='mt-2 text-sm text-muted-foreground underline decoration-1 underline-offset-2 transition-colors group-hover:text-foreground'>
                  View notable work
                </p>
              ) : null}
            </div>

            <p className='mt-1 shrink-0 text-sm font-light'>
              {formatRange(item.startDate, item.endDate)}
            </p>
          </div>
        )

        return (
          <li key={item.id}>
            {item.href ? (
              <Link href={item.href} className='group block'>
                {content}
              </Link>
            ) : (
              content
            )}
          </li>
        )
      })}
    </ul>
  )
}
