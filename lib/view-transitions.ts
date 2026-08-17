const PAGE_TRANSITION_CLASS = 'page-transition'
const THEME_TRANSITION_CLASS = 'theme-transition'

let pageCleanupTimeout: number | undefined
let themeCleanupTimeout: number | undefined
let activeThemeAnimation: Animation | undefined
let originalStartViewTransition: Document['startViewTransition'] | undefined

export function clearPageTransitionState() {
  if (typeof document === 'undefined') return

  document.documentElement.classList.remove(PAGE_TRANSITION_CLASS)

  if (pageCleanupTimeout !== undefined) {
    window.clearTimeout(pageCleanupTimeout)
    pageCleanupTimeout = undefined
  }
}

export function clearThemeTransitionState() {
  if (typeof document === 'undefined') return

  activeThemeAnimation?.cancel()
  activeThemeAnimation = undefined
  document.documentElement.classList.remove(THEME_TRANSITION_CLASS)

  if (themeCleanupTimeout !== undefined) {
    window.clearTimeout(themeCleanupTimeout)
    themeCleanupTimeout = undefined
  }
}

function schedulePageTransitionCleanup(delay = 5000) {
  if (pageCleanupTimeout !== undefined) {
    window.clearTimeout(pageCleanupTimeout)
  }

  pageCleanupTimeout = window.setTimeout(clearPageTransitionState, delay)
}

function scheduleThemeTransitionCleanup(delay = 550) {
  if (themeCleanupTimeout !== undefined) {
    window.clearTimeout(themeCleanupTimeout)
  }

  themeCleanupTimeout = window.setTimeout(clearThemeTransitionState, delay)
}

function applyThemeClass(theme: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

function resolveThemeFromDom(fallback?: string | null): 'light' | 'dark' {
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    if (root.classList.contains('dark')) return 'dark'
    if (root.classList.contains('light')) return 'light'
  }

  return fallback === 'light' ? 'light' : 'dark'
}

export function installViewTransitionTypeGuard() {
  if (typeof document === 'undefined' || !document.startViewTransition) {
    return () => {}
  }

  if (originalStartViewTransition) {
    return () => uninstallViewTransitionTypeGuard()
  }

  originalStartViewTransition =
    document.startViewTransition.bind(document)

  document.startViewTransition = callback => {
    const root = document.documentElement
    const isThemeTransition = root.classList.contains(THEME_TRANSITION_CLASS)

    if (!isThemeTransition) {
      clearThemeTransitionState()
      clearPageTransitionState()
      root.classList.add(PAGE_TRANSITION_CLASS)
      schedulePageTransitionCleanup()
    }

    const transition = originalStartViewTransition!(callback)

    if (!isThemeTransition) {
      transition.finished.then(
        () => schedulePageTransitionCleanup(100),
        clearPageTransitionState
      )
    }

    return transition
  }

  return () => uninstallViewTransitionTypeGuard()
}

export function uninstallViewTransitionTypeGuard() {
  if (
    typeof document !== 'undefined' &&
    originalStartViewTransition &&
    document.startViewTransition !== originalStartViewTransition
  ) {
    document.startViewTransition = originalStartViewTransition
  }

  originalStartViewTransition = undefined
  clearPageTransitionState()
}

type ToggleThemeOptions = {
  currentTheme?: string | null
  setTheme: (theme: string) => void
  x: number
  y: number
}

export function toggleThemeWithViewTransition({
  currentTheme,
  setTheme,
  x,
  y,
}: ToggleThemeOptions) {
  const nextTheme =
    resolveThemeFromDom(currentTheme) === 'dark' ? 'light' : 'dark'

  if (typeof document === 'undefined') {
    setTheme(nextTheme)
    return
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    clearThemeTransitionState()
    clearPageTransitionState()
    setTheme(nextTheme)
    return
  }

  if (!document.startViewTransition) {
    clearThemeTransitionState()
    clearPageTransitionState()
    setTheme(nextTheme)
    return
  }

  const root = document.documentElement
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  clearThemeTransitionState()
  clearPageTransitionState()
  root.classList.add(THEME_TRANSITION_CLASS)

  try {
    const transition = document.startViewTransition(() => {
      applyThemeClass(nextTheme)
      setTheme(nextTheme)
    })

    scheduleThemeTransitionCleanup(3000)

    transition.ready
      .then(() => {
        const animation = root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        )

        activeThemeAnimation = animation
        scheduleThemeTransitionCleanup()

        animation.finished.then(
          () => {
            if (activeThemeAnimation === animation) {
              activeThemeAnimation = undefined
            }
            scheduleThemeTransitionCleanup(50)
          },
          clearThemeTransitionState
        )
      })
      .catch(clearThemeTransitionState)

    transition.finished.catch(clearThemeTransitionState)
  } catch {
    applyThemeClass(nextTheme)
    setTheme(nextTheme)
    clearThemeTransitionState()
  }
}

if (typeof document !== 'undefined') {
  installViewTransitionTypeGuard()
}
