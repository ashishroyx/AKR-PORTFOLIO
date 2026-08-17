import { Link } from 'next-view-transitions'

import AkrLogo from '@/components/akr-logo'

export default function HeaderBrand() {
  return (
    <div className='flex w-[200px] shrink-0 items-center gap-4'>
      <Link
        href='/'
        className='group relative flex shrink-0 items-center justify-center transition-all duration-300 hover:scale-105'
        aria-label='Ashish Kumar Roy — Home'
      >
        <AkrLogo className='h-8 w-8' />
      </Link>

      <div className='hidden shrink-0 items-center gap-3 border-l border-neutral-200 pl-4 lg:flex dark:border-white/10'>
        <span
          aria-hidden
          className='h-1 w-1 shrink-0 rounded-full bg-[#558b63] dark:bg-green-500'
        />

        <div className='flex flex-col gap-1'>
          <span className='font-outfit text-[10px] uppercase leading-none tracking-[0.3em] text-neutral-500 whitespace-nowrap dark:text-white/50'>
            Problem Solver
          </span>
          <span className='font-outfit text-[10px] font-medium uppercase leading-none tracking-[0.15em] text-[#558b63] whitespace-nowrap dark:text-green-500'>
            Full Stack Engineer
          </span>
        </div>
      </div>
    </div>
  )
}
