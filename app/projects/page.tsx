import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="flex justify-center pt-40 pb-24">
      <div className="w-full max-w-3xl px-4">
        <h1 className="title mb-12 text-center">Projects</h1>
        <Projects projects={projects} />
      </div>
    </section>
  )
}
