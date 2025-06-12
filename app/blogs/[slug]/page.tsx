import Link from 'next/link'
import Image from 'next/image'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getPosts, getPostBySlug } from '@/lib/posts'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()
  const slugs = posts.map(post => ({ slug: post.slug }))

  return slugs
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const { title, image, author, publishedAt } = metadata

  return (
    <section className="pb-24 pt-32">
      <div className="container max-w-3xl mx-auto flex flex-col items-center px-4">
        {/* Back Link */}
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
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
    className="object-cover rounded-lg mb-10"
    priority
  />
)}




        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="title">{title}</h1>
          <p className="mt-3 text-xs text-muted-foreground">
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        {/* Main Content */}
        <main className="prose dark:prose-invert mt-16 prose-headings:mb-6 prose-p:mb-5 prose-li:mb-3 prose-img:my-6">
          <MDXContent source={content} />
        </main>

        {/* Footer */}
        <footer className="mt-16">
          {/* <NewsletterForm /> */}
        </footer>
      </div>
    </section>
  )
}
