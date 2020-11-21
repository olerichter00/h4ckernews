import React, { ReactChildren, ReactChild } from 'react'
import { useState, useEffect } from 'react'

type FadeTransitionProps = {
  children: ReactChildren | ReactChild
  show?: boolean
  hide?: boolean
  timeout?: number
  duration?: number
}

export default function FadeTransition({
  children,
  show = true,
  hide = false,
  timeout = 0,
  duration = 1000,
}: FadeTransitionProps) {
  const [startTransition, setStartTransition] = useState(false)

  useEffect(() => {
    if (show) setTimeout(() => setStartTransition(true), timeout)
  }, [show])

  if (hide) return <div></div>

  const classes = `transition-opacity duration-${duration} ease-in-out  ${
    startTransition ? 'opacity-100' : 'opacity-0'
  }`

  return <div className={classes}>{children}</div>
}
