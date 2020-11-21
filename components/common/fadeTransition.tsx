import React, { ReactChildren, ReactChild } from 'react'
import { useState, useEffect } from 'react'

type FadeTransitionProps = {
  children: ReactChildren | ReactChild
  show?: boolean
  hide?: boolean
  timeout?: number
}

export default function FadeTransition({
  children,
  show = true,
  hide = false,
  timeout = 0,
}: FadeTransitionProps) {
  const [startTransition, SetStartTransition] = useState(false)

  useEffect(() => {
    if (show) setTimeout(() => SetStartTransition(true), timeout)
  }, [show])

  if (hide) return <div></div>

  const classes = `transition-opacity duration-1000 ease-in-out opacity-0 ${
    startTransition ? 'opacity-100' : ''
  }`

  return <div className={classes}>{children}</div>
}
