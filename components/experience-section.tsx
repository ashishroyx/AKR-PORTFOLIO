import Experience from '@/components/experience'
import { getExperience } from '@/lib/experience'

export default function ExperienceSection() {
  const items = getExperience()

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Experience</h2>
        <Experience items={items} />
      </div>
    </section>
  )
}
