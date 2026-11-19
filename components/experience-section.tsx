import Experience from '@/components/experience'
import { getExperienceGroups } from '@/lib/experience'

export default function ExperienceSection() {
  const groups = getExperienceGroups()

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Experience</h2>
        <Experience groups={groups} />
      </div>
    </section>
  )
}
