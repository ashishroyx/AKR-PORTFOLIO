const THEME_TRANSITION_CLASS = 'theme-transition'

let activeAnimation: Animation | undefined
let cleanupTimeout: number | undefined

function clearThemeTransitionState() {
  if (typeof document === 'undefined') return

  activeAnimation?.cancel()
  activeAnimation = undefined
  document.documentElement.classList.remove(THEME_TRANSITION_CLASS)

  if (cleanupTimeout !== undefined) {
    window.clearTimeout(cleanupTimeout)
    cleanupTimeout = undefined
  }
}

function applyThemeClass(theme: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

function scheduleCleanup(delay = 550) {
  if (cleanupTimeout !== undefined) {
    window.clearTimeout(cleanupTimeout)
  }
  cleanupTimeout = window.setTimeout(clearThemeTransitionState, delay)
}

function resolveThemeFromDom(fallback?: string | null): 'light' | 'dark' {
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    if (root.classList.contains('dark')) return 'dark'
    if (root.classList.contains('light')) return 'light'
  }

  return fallback === 'light' ? 'light' : 'dark'
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
    setTheme(nextTheme)
    return
  }

  if (!document.startViewTransition) {
    clearThemeTransitionState()
    setTheme(nextTheme)
    return
  }

  const root = document.documentElement
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  clearThemeTransitionState()
  root.classList.add(THEME_TRANSITION_CLASS)

  try {
    const transition = document.startViewTransition(() => {
      applyThemeClass(nextTheme)
      setTheme(nextTheme)
    })

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

        activeAnimation = animation
        scheduleCleanup()

        animation.finished.then(
          () => {
            if (activeAnimation === animation) {
              activeAnimation = undefined
            }
            scheduleCleanup(50)
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
