'use client'

import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactFormSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Inputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Message "sent" (simulated)!')
    reset()
  }

  return (
    <section className='relative isolate flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8'>
      {/* Background pattern */}
      <svg
        className='absolute inset-0 -z-10 h-full w-full stroke-zinc-200 opacity-75 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-zinc-700'
        aria-hidden='true'
      >
        <defs>
          <pattern
            id='pattern'
            width={200}
            height={200}
            x='50%'
            y={-64}
            patternUnits='userSpaceOnUse'
          >
            <path d='M100 200V.5M.5 .5H200' fill='none' />
          </pattern>
        </defs>
        <svg
          x='50%'
          y={-64}
          className='overflow-visible fill-zinc-50 dark:fill-zinc-900/75'
        >
          <path
            d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z'
            strokeWidth={0}
          />
        </svg>
        <rect width='100%' height='100%' strokeWidth={0} fill='url(#pattern)' />
      </svg>

      {/* Contact Info */}
      <div className='mb-12 text-center'>
        <h2 className='text-2xl font-bold tracking-tight text-zinc-900 dark:text-white'>
          Ashish Kumar Roy
        </h2>
        <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-300'>
          📞 +91 9625434563
        </p>
        <p className='text-sm text-zinc-600 dark:text-zinc-300'>
          📧 ashishkumarroy2502@gmail.com
        </p>
      </div>

      {/* Form */}
      <div className='w-full max-w-3xl'>
        <form onSubmit={handleSubmit(processForm)} noValidate>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {/* Name */}
            <div>
              <Input
                id='name'
                type='text'
                placeholder='Your Name'
                autoComplete='given-name'
                {...register('name')}
              />
              {errors.name?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                type='email'
                id='email'
                autoComplete='email'
                placeholder='Your Email'
                {...register('email')}
              />
              {errors.email?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className='sm:col-span-2'>
              <Textarea
                rows={4}
                placeholder='Your Message'
                {...register('message')}
              />
              {errors.message?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          <div className='mt-6'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full disabled:opacity-50'
            >
              {isSubmitting ? 'Submitting...' : 'Contact Me'}
            </Button>
          </div>

          <p className='mt-4 text-xs text-muted-foreground text-center'>
            By submitting this form, I agree to the{' '}
            <Link href='/privacy' className='font-bold'>
              privacy&nbsp;policy
            </Link>
            .
          </p>
        </form>
      </div>
      </section>
    )
  }

