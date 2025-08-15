import Image from 'next/image'
import authorImage from '@/public/author/me.jpg'
import { Button } from './ui/button'

export default function Intro() {
  return (
    <section className='flex flex-col items-center gap-6 pb-20 md:flex-row md:items-center md:gap-x-12'>
      {/* Image Section */}
      <div className='w-[130px] md:w-auto'>
        <Image
          className='rounded-full mx-auto md:mx-0'
          src={authorImage}
          alt='Ashish Kumar Roy'
          width={175}
          height={175}
          priority
        />
      </div>

      {/* Text + Button Section */}
      <div className='text-center md:text-left md:flex-1'>
        <h1 className='title no-underline text-2xl sm:text-3xl md:text-4xl'>
          Hey, I am Ashish Kumar Roy
        </h1>
        <p className='mt-4 text-sm sm:text-base font-light text-muted-foreground max-w-md mx-auto md:mx-0'>
          23, I ship fast, break often, and learn faster. Deep in code, deeper in problem-solving. 
          Built from curiosity, mistakes, and long nights. Always chasing what’s next.
        </p>
        <p className='mt-4 text-sm sm:text-base font-light text-muted-foreground max-w-md mx-auto md:mx-0'  >
          If it’s ambitious and real, I’m there.
        </p>

        <div className='mt-6'>
          <a href='/ashish-kumar-roy-cv.pdf' download>
            <Button className='px-5 py-2 text-sm'>Download CV</Button>
          </a>
        </div>
      </div>
    </section>
  )
}
