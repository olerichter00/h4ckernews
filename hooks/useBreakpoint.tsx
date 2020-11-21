import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

import config from '../lib/config'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const getDeviceConfig = (width: Number): Breakpoint => {
  if (width < config.breakpoints.xs) {
    return 'xs'
  } else if (width >= config.breakpoints.xs && width < config.breakpoints.sm) {
    return 'sm'
  } else if (width >= config.breakpoints.sm && width < config.breakpoints.md) {
    return 'md'
  } else if (width >= config.breakpoints.md && width < config.breakpoints.lg) {
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
