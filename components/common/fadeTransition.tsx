import React, { ReactChildren, ReactChild } from 'react'
import { useState, useEffect } from 'react'

export type FadeTransitionProps = {
  children: ReactChildren | ReactChild
  show?: boolean
  hide?: boolean
  timeout?: number
  duration?: number
}

const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  show = true,
  hide = false,
  timeout = 0,
  duration = 200,
}) => {
  const [startTransition, setStartTransition] = useState(false)

  useEffect(() => {
    if (show) setTimeout(() => setStartTransition(true), timeout)
  }, [show])

  if (hide) return <div></div>

  const classes = `transition-opacity duration-${duration} ${
    startTransition ? 'opacity-100' : 'opacity-0'
  }`

  return <div className={classes}>{children}</div>
}

export default FadeTransition
