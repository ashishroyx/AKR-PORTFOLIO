import type { Metadata } from 'next'
import { Inter, Outfit, Playfair_Display } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'
import GlassBlurFilter from '@/components/glass-blur-filter'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'AKR',
  description: 'App description here',
  icons: {
    icon: [
      { url: '/me1.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/me1.jpg', sizes: '192x192', type: 'image/jpeg' },
      { url: '/me1.jpg', rel: 'apple-touch-icon' }
    ]
  }
}



export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
     

      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable,
          outfit.variable,
          playfair.variable
        )}
      >
        <Providers>
          <GlassBlurFilter />
          <div className='portfolio-guardrails' aria-hidden='true' />
          <div className='portfolio-page-shell flex min-h-screen flex-col'>
            <Header />
            <main className='grow'>{children}</main>
            {/* <Footer /> */}
          </div>
        </Providers>
      </body>
    </html>
  )
}