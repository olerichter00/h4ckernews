import React, { ReactChildren, ReactChild } from 'react'

import Header from './header'
import useColorScheme from '../hooks/useColorScheme'

type LayoutProps = { children: ReactChildren | ReactChild }

function Layout({ children }: LayoutProps) {
  const [colorScheme] = useColorScheme()

  const backgroundColorClass = colorScheme === 'light' ? 'bg-white' : 'bg-gray-900'
  const textColorClass = colorScheme === 'light' ? 'text-gray-900' : 'text-gray-100'

  return (
    <div className={`max-w-full min-h-screen ${backgroundColorClass} ${textColorClass}`}>
      <Header />
      <main className="max-w-3xl mx-auto overflow-hidden ">{children}</main>
    </div>
  )
}

export default Layout
