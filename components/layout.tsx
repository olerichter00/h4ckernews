import React, { ReactChildren, ReactChild } from 'react'

import Header from '../components/header'
import useColorScheme from '../hooks/useColorScheme'

type LayoutProps = { children: ReactChildren | ReactChild }

function Layout({ children }: LayoutProps) {
  const [colorScheme] = useColorScheme()

  const textColorClass = colorScheme === 'light' ? 'text-gray-900' : 'text-gray-100'
  const backgroundColorClass = colorScheme === 'light' ? 'bg-gray-100' : 'bg-gray-900'

  return (
    <div className={`max-w-full min-h-screen ${backgroundColorClass} ${textColorClass}`}>
      <Header />
      <main className="pt-6">
        <div className="max-w-3xl m-auto overflow-hidden ">{children}</div>
      </main>
    </div>
  )
}

export default Layout
