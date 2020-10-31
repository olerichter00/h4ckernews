import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

const BREAKPOINTS = {
  xs: 500,
  sm: 768,
  md: 1024,
  lg: 1280,
}

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const getDeviceConfig = (width: Number): Breakpoint => {
  if (width < BREAKPOINTS.xs) {
    return 'xs'
  } else if (width >= BREAKPOINTS.xs && width < BREAKPOINTS.sm) {
    return 'sm'
  } else if (width >= BREAKPOINTS.sm && width < BREAKPOINTS.md) {
    return 'md'
  } else if (width >= BREAKPOINTS.md && width < BREAKPOINTS.lg) {
    return 'lg'
  } else {
    return 'xl'
  }
}

const useBreakpoint = (): { breakPoint: Breakpoint; isMobile: boolean } => {
  const [breakPoint, setBreakPoint] = useState(() => getDeviceConfig(window.innerWidth))

  const isMobile = breakPoint === 'xs'

  useEffect(() => {
    const calculateInnerWidth = throttle(function () {
      setBreakPoint(getDeviceConfig(window.innerWidth))
    }, 200)

    window.addEventListener('resize', calculateInnerWidth)

    return () => window.removeEventListener('resize', calculateInnerWidth)
  }, [])

  return { breakPoint, isMobile }
}
export default useBreakpoint
