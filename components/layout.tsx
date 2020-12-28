import React, { ReactChildren, ReactChild } from 'react'

import Navigation from './navigation'
import useColorScheme from '../hooks/useColorScheme'

type LayoutProps = { children: ReactChildren | ReactChild }

function Layout({ children }: LayoutProps) {
  const [colorScheme] = useColorScheme()

  const dark = colorScheme === 'light' ? '' : 'dark'

  return (
    <div className={dark}>
      <div className="max-w-full min-h-screen bg-gray-100 sm:bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Navigation />
        <main className="max-w-3xl mx-auto overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

export default Layout
