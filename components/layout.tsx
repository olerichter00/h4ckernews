import React, { ReactChildren, ReactChild } from 'react'

import Navigation from './navigation'
import useColorScheme from '../hooks/useColorScheme'

type LayoutProps = { children: ReactChildren | ReactChild }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [colorScheme] = useColorScheme()

  const dark = colorScheme === 'light' ? '' : 'dark'

  return (
    <div className={dark}>
      <div className="max-w-full min-h-screen dark:text-gray-300 text-gray-600 bg-gray-100 dark:bg-gray-900 sm:bg-white">
        <Navigation />

        <main className="mx-auto pt-2 max-w-3xl overflow-hidden sm:pt-0">{children}</main>
      </div>
    </div>
  )
}

export default Layout
