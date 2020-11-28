import React, { ReactChildren, ReactChild } from 'react'

import Header from './header'
import useColorScheme from '../hooks/useColorScheme'

type LayoutProps = { children: ReactChildren | ReactChild }

function Layout({ children }: LayoutProps) {
  const [colorScheme] = useColorScheme()

  const dark = colorScheme === 'light' ? '' : 'dark'

  return (
    <div className={dark}>
      <div className="max-w-full min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
        <Header />
        <main className="max-w-3xl mx-auto overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

export default Layout
