import Link from 'next/link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

import { getQuixtaProjects } from '@/lib/quixta-work'

export const metadata = {
  title: 'Quixta · Notable Work',
  description:
    'Frontend work at Quixta across Quixta Revamp, BartendersNow, ProFx, and Nanolumi.',
}

export default function QuixtaExperiencePage() {
  const projects = getQuixtaProjects()

  return (
    <section className='flex justify-center py-24 pt-20 md:pt-24'>
      <div className='w-full max-w-3xl px-4 sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='mb-8 inline-flex w-fit items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to home</span>
        </Link>

        <header className='space-y-3'>
          <p className='text-sm font-semibold text-muted-foreground'>
            Experience · Apr 2026 — Present · Bangalore
          </p>
          <h1 className='title no-underline text-3xl sm:text-4xl'>Quixta</h1>
          <p className='max-w-2xl text-sm font-semibold text-muted-foreground sm:text-base'>
            Frontend Developer (Apr 2026 — Sep 2026), promoted to Junior Full
            Stack Developer (Sep 2026 — Present). Notable work across the public
            site, CMS platforms, and production product surfaces.
          </p>
        </header>

        <div className='mt-14 space-y-16'>
          {projects.map(project => (
            <article key={project.slug} id={project.slug} className='scroll-mt-28'>
              <h2 className='text-2xl font-semibold tracking-tight'>
                {project.title}
              </h2>
              <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                <span className='font-semibold text-foreground/80'>
                  Tech stack:{' '}
                </span>
                {project.techStack}
              </p>

              <ul className='mt-6 space-y-3'>
                {project.highlights.map(point => (
                  <li
                    key={point}
                    className='flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]'
                  >
                    <span
                      className='mt-2 size-1.5 shrink-0 rounded-full bg-foreground/70'
                      aria-hidden='true'
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
