import { getPosts } from '@/lib/posts'
import PostsWithSearch from '@/components/posts-with-search'

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <section className='pb-24 pt-40 flex flex-col items-center'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Blogs</h1>

        <PostsWithSearch posts={posts} />
      </div>
    </section>
  )
}