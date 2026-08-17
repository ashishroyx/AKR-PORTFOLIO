'use client'

import { useEffect } from 'react'
import { ViewTransitions } from 'next-view-transitions'

import { installViewTransitionTypeGuard } from '@/lib/view-transitions'

export default function ViewTransitionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const uninstall = installViewTransitionTypeGuard()
    return () => uninstall()
  }, [])

  return <ViewTransitions>{children}</ViewTransitions>
}
