import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import config from '../lib/config'

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < config.breakpoints.xs)

  useEffect(() => {
    const calculateInnerWidth = throttle(() => {
      setIsMobile(window.innerWidth < config.breakpoints.xs)
    }, 200)

    window.addEventListener('resize', calculateInnerWidth)

    return () => window.removeEventListener('resize', calculateInnerWidth)
  }, [])

  return isMobile
}

export default useIsMobile
