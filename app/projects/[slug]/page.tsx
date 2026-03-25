import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getProjectBySlug, getProjects } from '@/lib/projects'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(project => ({ slug: project.slug }))
}

// Updated Type for Next.js 15 compatibility
type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function Project({ params }: PageProps) {
  // CRITICAL: Await params to access the slug
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, author, publishedAt, repo } = metadata

  return (
    <section className="py-24 flex justify-center">
      <div className="w-full max-w-3xl px-4">
        
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground w-fit"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to projects</span>
        </Link>

        {image && (
          <Image
            src={image}
            alt={title || 'Project image'}
            width={768}
            height={384}
            className="object-cover rounded-lg mb-10 w-full"
            priority
          />
        )}

        <header>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-3 text-xs text-muted-foreground">
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        {/* prose handles the MDX typography */}
        <main className="prose dark:prose-invert mt-12 max-w-none">
          <MDXContent source={content} />

          {repo && (
            <div className="mt-12 flex justify-start border-t pt-8">
              <Link
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-foreground px-8 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View Repository
              </Link>
            </div>
          )}
        </main>
      </div>
    </section>
  )
}