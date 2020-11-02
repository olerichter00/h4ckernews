import React from 'react'

type FadeTransitionProps = {
  children: JSX.Element
  show: Boolean
  hide?: Boolean
}

export default function FadeTransition({ children, show, hide = false }: FadeTransitionProps) {
  if (hide) return <div></div>

  const classes = `transition-opacity duration-1000 ease-in-out opacity-0 ${
    show ? 'opacity-100' : ''
  }`

  return <div className={classes}>{children}</div>
}
