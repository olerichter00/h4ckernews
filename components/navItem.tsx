import React, { MouseEvent } from 'react'

type NavItemProps = {
  active?: boolean
  onClick?: (event: MouseEvent) => void
  children: React.ReactNode
  [x: string]: any
}

const NavItem: React.FC<NavItemProps> = ({ active = false, onClick, children, ...rest }) => {
  return (
    <a
      onClick={onClick}
      className={`focus:outline-none cursor-pointer mx-2 ${active ? 'text-primary' : ''}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export default NavItem
