export type ExperienceItem = {
  id: string
  role: string
  company: string
  summary: string
  startDate: string
  endDate?: string
  location?: string
  href?: string
}

export type ExperienceCompanyGroup = {
  company: string
  location?: string
  href?: string
  startDate: string
  endDate?: string
  roles: ExperienceItem[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'exp-quixta-junior',
    role: 'Junior Full Stack Developer',
    company: 'Quixta',
    summary:
      'Promoted from Frontend Developer. Shipping production web apps, CMS platforms, and full-stack features across Quixta Revamp, BartendersNow, ProFx, and Nanolumi.',
    startDate: '2026-09',
    location: 'Bangalore',
    href: '/experience/quixta',
  },
  {
    id: 'exp-quixta-frontend',
    role: 'Frontend Developer',
    company: 'Quixta',
    summary:
      'Built and shipped frontend systems for the public site, CMS platforms, and product surfaces.',
    startDate: '2026-04',
    endDate: '2026-09',
    location: 'Bangalore',
    href: '/experience/quixta',
  },
  {
    id: 'exp-major-minor',
    role: 'Major & Minor Project · AI and ML',
    company: 'SRM University',
    summary:
      'Major and minor projects in Artificial Intelligence and Machine Learning under Dr. Charanjeet Datta.',
    startDate: '2024-07',
    endDate: '2025-05',
  },
]

function toSortValue(date?: string) {
  if (!date) return Number.POSITIVE_INFINITY
  return Number(date.replace('-', ''))
}

export function getExperience() {
  return experience
}

export function getExperienceGroups(): ExperienceCompanyGroup[] {
  const groups = new Map<string, ExperienceCompanyGroup>()

  for (const item of experience) {
    const existing = groups.get(item.company)

    if (!existing) {
      groups.set(item.company, {
        company: item.company,
        location: item.location,
        href: item.href,
        startDate: item.startDate,
        endDate: item.endDate,
        roles: [item],
      })
      continue
    }

    existing.roles.push(item)

    if (toSortValue(item.startDate) < toSortValue(existing.startDate)) {
      existing.startDate = item.startDate
    }

    if (!item.endDate) {
      existing.endDate = undefined
    } else if (
      existing.endDate &&
      toSortValue(item.endDate) > toSortValue(existing.endDate)
    ) {
      existing.endDate = item.endDate
    }

    if (!existing.href && item.href) {
      existing.href = item.href
    }

    if (!existing.location && item.location) {
      existing.location = item.location
    }
  }

  return Array.from(groups.values()).map(group => ({
    ...group,
    roles: [...group.roles].sort(
      (a, b) => toSortValue(b.startDate) - toSortValue(a.startDate)
    ),
  }))
}
