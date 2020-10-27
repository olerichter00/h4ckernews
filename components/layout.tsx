import React, { ReactChildren, ReactChild } from 'react'

import Header from '../components/header'
import useColorScheme from '../hooks/useColorScheme'
import { backgroundColorClass, textColorClass } from '../lib/utils'

type LayoutProps = { children: ReactChildren | ReactChild }

function Layout({ children }: LayoutProps) {
  const [colorScheme] = useColorScheme()

  return (
    <div
      className={`max-w-full min-h-screen ${backgroundColorClass(colorScheme)} ${textColorClass(
        colorScheme,
      )}`}
    >
      <Header />
      <main className="pt-6">
        <div className="max-w-3xl m-auto overflow-hidden ">{children}</div>
      </main>
    </div>
  )
}

export default Layout
