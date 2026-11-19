export type EducationItem = {
  id: string
  degree: string
  school: string
  summary?: string
  startDate: string
  endDate?: string
  location?: string
}

export const education: EducationItem[] = [
  {
    id: 'edu-srm',
    degree: 'B.Tech in Computer Science and Engineering (CSE)',
    school: 'SRM Institute of Science and Technology (KTR)',
    startDate: '2021-08',
    endDate: '2025-05',
    location: 'Chennai',
  },
]

export function getEducation() {
  return education
}
