import Education from '@/components/education'
import { getEducation } from '@/lib/education'

export default function EducationSection() {
  const items = getEducation()

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Education</h2>
        <Education items={items} />
      </div>
    </section>
  )
}
