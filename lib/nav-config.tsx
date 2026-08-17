import type { ReactNode } from 'react'

import {
  NavBlogIcon,
  NavContactIcon,
  NavGithubIcon,
  NavHomeIcon,
  NavProjectsIcon,
  XBrandIcon,
} from '@/components/nav-icons'

export type NavAccent =
  | 'emerald'
  | 'blue'
  | 'violet'
  | 'rose'
  | 'amber'
  | 'cyan'

export type NavIconId =
  | 'home'
  | 'blogs'
  | 'projects'
  | 'contact'
  | 'github'
  | 'x'

type NavLinkConfig = {
  href: string
  label: string
  icon: NavIconId
  description: string
  accent: NavAccent
  keywords: string
}

type SocialLinkConfig = {
  label: string
  href: string
  icon: Extract<NavIconId, 'github' | 'x'>
  description: string
  accent: NavAccent
  keywords: string
  external: true
}

export const navLinks: NavLinkConfig[] = [
  {
    href: '/',
    label: 'Home',
    icon: 'home',
    description: 'Go to homepage',
    accent: 'rose',
    keywords: 'home index start',
  },
  {
    href: '/blogs',
    label: 'Blogs',
    icon: 'blogs',
    description: 'Read my latest posts',
    accent: 'emerald',
    keywords: 'blog blogs posts writing articles',
  },
  {
    href: '/projects',
    label: 'Projects',
    icon: 'projects',
    description: 'Explore my work',
    accent: 'blue',
    keywords: 'projects portfolio work case studies',
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: 'contact',
    description: 'Get in touch with me',
    accent: 'violet',
    keywords: 'contact email message reach',
  },
]

export const socialLinks: SocialLinkConfig[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/ashishroyx',
    icon: 'github',
    description: 'View my code and projects',
    accent: 'cyan',
    keywords: 'github code profile',
    external: true,
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/royashishx',
    icon: 'x',
    description: 'Follow me on X',
    accent: 'amber',
    keywords: 'twitter x social',
    external: true,
  },
]

const navIconMap: Record<
  NavIconId,
  (props: { className?: string }) => ReactNode
> = {
  home: NavHomeIcon,
  blogs: NavBlogIcon,
  projects: NavProjectsIcon,
  contact: NavContactIcon,
  github: NavGithubIcon,
  x: XBrandIcon,
}

export function renderNavIcon(
  icon: NavIconId,
  className = 'h-5 w-5 opacity-70'
): ReactNode {
  const Icon = navIconMap[icon]
  return <Icon className={className} />
}
