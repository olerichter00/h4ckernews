import React, { MouseEvent } from 'react'

type NavItemProps = {
  active?: boolean
  onClick?: (event: MouseEvent) => void
  children: React.ReactNode
  [x: string]: any
}

export default function NavItem({ active = false, onClick, children, ...rest }: NavItemProps) {
  return (
    <a
      onClick={onClick}
      className={`cursor-pointer mx-1 sm:mx-2 ${active ? 'text-primary' : ''}`}
      {...rest}
    >
      {children}
    </a>
  )
}
