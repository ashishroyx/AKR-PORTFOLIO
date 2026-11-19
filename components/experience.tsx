'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import {
  ExperienceCompanyGroup,
  ExperienceItem,
} from '@/lib/experience'
import { cn, formatMonthYear } from '@/lib/utils'

function formatRange(startDate: string, endDate?: string) {
  const start = formatMonthYear(startDate)
  const end = endDate ? formatMonthYear(endDate) : 'Present'
  return `${start} — ${end}`
}

const groupVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

const roleVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      delay: 0.12 + index * 0.07,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

function RoleRow({
  role,
  index,
  isLast,
}: {
  role: ExperienceItem
  index: number
  isLast: boolean
}) {
  return (
    <motion.li
      custom={index}
      variants={roleVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.4 }}
      className='relative grid grid-cols-[1rem_minmax(0,1fr)] gap-x-3'
    >
      <div className='relative flex justify-center'>
        <span
          className={cn(
            'relative z-[1] mt-1.5 size-2.5 rounded-full border-2 border-foreground bg-background',
            index === 0 && 'bg-foreground'
          )}
          aria-hidden='true'
        />
        {!isLast ? (
          <motion.span
            aria-hidden='true'
            className='absolute top-4 bottom-[-1.35rem] w-px origin-top bg-border'
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.18 + index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ) : null}
      </div>

      <div
        className={cn(
          'flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row',
          !isLast && 'pb-6 sm:pb-7'
        )}
      >
        <div className='max-w-lg'>
          <p className='text-base font-semibold sm:text-lg'>{role.role}</p>
          <p className='mt-1 line-clamp-2 text-sm text-muted-foreground'>
            {role.summary}
          </p>
        </div>
        <p className='mt-1 shrink-0 text-sm font-light text-muted-foreground sm:text-right'>
          {formatRange(role.startDate, role.endDate)}
        </p>
      </div>
    </motion.li>
  )
}

function CompanyCard({
  group,
  index,
}: {
  group: ExperienceCompanyGroup
  index: number
}) {
  const hasMultipleRoles = group.roles.length > 1

  const header = (
    <div className='flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row'>
      <div>
        <p className='text-lg font-semibold tracking-tight sm:text-xl'>
          {group.company}
        </p>
        <p className='mt-1 text-sm font-semibold text-muted-foreground'>
          {hasMultipleRoles
            ? `${group.roles.length} roles`
            : group.roles[0]?.role}
          {group.location ? ` · ${group.location}` : null}
        </p>
        {group.href ? (
          <p className='mt-2 text-sm text-muted-foreground underline decoration-1 underline-offset-2 transition-colors group-hover:text-foreground'>
            View notable work
          </p>
        ) : null}
      </div>
      <p className='mt-1 shrink-0 text-sm font-light sm:text-right'>
        {formatRange(group.startDate, group.endDate)}
      </p>
    </div>
  )

  return (
    <motion.li
      custom={index}
      variants={groupVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.25 }}
      className='list-none'
    >
      {group.href ? (
        <Link href={group.href} className='group block'>
          {header}
        </Link>
      ) : (
        header
      )}

      <ul className='mt-5'>
        {group.roles.map((role, roleIndex) => (
          <RoleRow
            key={role.id}
            role={role}
            index={roleIndex}
            isLast={roleIndex === group.roles.length - 1}
          />
        ))}
      </ul>
    </motion.li>
  )
}

export default function Experience({
  groups,
}: {
  groups: ExperienceCompanyGroup[]
}) {
  return (
    <ul className='flex w-full flex-col gap-10'>
      {groups.map((group, index) => (
        <CompanyCard key={group.company} group={group} index={index} />
      ))}
    </ul>
  )
}
