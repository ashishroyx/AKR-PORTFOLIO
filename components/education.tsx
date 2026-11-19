import { EducationItem } from '@/lib/education'
import { formatMonthYear } from '@/lib/utils'

function formatRange(startDate: string, endDate?: string) {
  const start = formatMonthYear(startDate)
  const end = endDate ? formatMonthYear(endDate) : 'Present'
  return `${start} — ${end}`
}

export default function Education({ items }: { items: EducationItem[] }) {
  return (
    <ul className='flex w-full flex-col gap-8'>
      {items.map(item => (
        <li key={item.id}>
          <div className='flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row'>
            <div className='max-w-lg'>
              <p className='text-lg font-semibold'>{item.degree}</p>
              <p className='mt-1 text-sm font-semibold text-muted-foreground'>
                {item.school}
                {item.location ? ` · ${item.location}` : null}
              </p>
              {item.summary ? (
                <p className='mt-1 line-clamp-2 text-sm text-muted-foreground'>
                  {item.summary}
                </p>
              ) : null}
            </div>

            <p className='mt-1 shrink-0 text-sm font-light'>
              {formatRange(item.startDate, item.endDate)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
