import React, { ReactChildren, ReactChild } from 'react'

import Navigation from './navigation'
import useColorScheme from '../hooks/useColorScheme'

type LayoutProps = { children: ReactChildren | ReactChild }

function Layout({ children }: LayoutProps) {
  const [colorScheme] = useColorScheme()

  const dark = colorScheme === 'light' ? '' : 'dark'

  return (
    <div className={dark}>
      <div className="max-w-full min-h-screen dark:text-gray-200 text-gray-800 bg-gray-100 dark:bg-gray-900 sm:bg-white">
        <Navigation />
        <main className="mx-auto max-w-3xl overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

export default Layout
