import EducationSection from '@/components/education-section'
import ExperienceSection from '@/components/experience-section'
import Intro from '@/components/intro'
import Recentposts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default function Home() {
  return (
    <section className='py-24 pt-20 md:pt-24'>
      <div className='mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8'>
        <Intro />
        <ExperienceSection />
        <RecentProjects />
        <EducationSection />
        <Recentposts />
      </div>
    </section>
  )
}
