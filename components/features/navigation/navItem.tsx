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
      href="#"
      onClick={onClick}
      className={`cursor-pointer ml-2 mr-1 sm:ml-2 sm:mr-2 ${active ? 'text-primary' : ''}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export default NavItem
