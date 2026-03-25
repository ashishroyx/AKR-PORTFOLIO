import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getPosts, getPostBySlug } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}

// Fixed Type for Next.js 15
type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function Post({ params }: PageProps) {
  // CRITICAL FIX: You must await params in Next.js 15
  const { slug } = await params
  
  const post = await getPostBySlug(slug)

  if (!post) return notFound()

  const { metadata, content } = post
  const { title, image, author, publishedAt } = metadata

  return (
    <section className="pb-24 pt-32">
      <div className="container max-w-3xl mx-auto flex flex-col px-4">
        
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground w-fit"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to posts</span>
        </Link>

        {image && (
          <Image
            src={image}
            alt={title || 'Blog image'}
            width={768}
            height={384}
            className="object-cover rounded-lg mb-10 w-full aspect-video"
            priority
          />
        )}

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-3 text-xs text-muted-foreground">
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        {/* prose class handles the styling for MDX */}
        <main className="prose dark:prose-invert max-w-none">
          <MDXContent source={content} />
        </main>

        <footer className="mt-16">
          {/* Newsletter or similar components here */}
        </footer>
      </div>
    </section>
  )
}