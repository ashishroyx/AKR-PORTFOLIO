import Image from 'next/image'
import authorImage from '@/public/author/me.jpg'
import { Button } from './ui/button'

export default function Intro() {
  return (
    <section className=' gap-6 pb-15 gap-x-12 pt-10'>
      {/* Image Section */}
      <div className='w-auto pb-5 '>
        <Image
          className='rounded-full mx-auto'
          src={authorImage}
          alt='Ashish Kumar Roy'
          width={175}
          height={175}
          priority
          
        />
      </div>

      {/* Text + Button Section */}
      <div className='text-center'>
        <h1 className='title no-underline text-2xl sm:text-3xl md:text-4xl'>
          Hey, I am Ashish Kumar Roy
        </h1>
        <p className='mt-4 text-sm  font-semibold text-muted-foreground max-w-md mx-auto'>
          23, I ship fast, break often, and learn faster. Deep in code, deeper in problem-solving. 
          Built from curiosity, mistakes, and long nights. Always chasing what’s next.
        </p>
        <p className='mt-1 text-sm sm:text-base font-bold text-muted-foreground max-w-md mx-auto  '  >
          If it’s ambitious and real, I’m there.
        </p>

        <div className='mt-4 '>
          <a href='/Ashish_Kumar_Roy_F_CV.pdf' download>
            <Button className='px-5 py-2 text-sm border border-border shadow-lg shadow-black/20 dark:shadow-white/20'>Download CV</Button>
          </a>
        </div>
      </div>
    </section>
  )
}
