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

export const experience: ExperienceItem[] = [
  {
    id: 'exp-quixta',
    role: 'Frontend Developer',
    company: 'Quixta',
    summary:
      'Shipping production web apps, CMS platforms, and performance-focused frontend systems across Quixta Revamp, BartendersNow, ProFx, and Nanolumi.',
    startDate: '2026-04',
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

export function getExperience() {
  return experience
}
