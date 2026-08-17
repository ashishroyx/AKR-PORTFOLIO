'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import OnekoCursor from '@/components/oneko-cursor'
import { Toaster } from '@/components/ui/sonner'
import ViewTransitionProvider from '@/components/view-transition-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      defaultTheme='light'
      disableTransitionOnChange
    >
      <ViewTransitionProvider>
        <OnekoCursor />
        {children}
        <ToasterProvider />
      </ViewTransitionProvider>
    </ThemeProvider>
  )
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      position='top-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}