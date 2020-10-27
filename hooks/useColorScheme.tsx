import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { systemColorScheme } from '../lib/utils'

type ColorScheme = 'dark' | 'light'

export default function useColorScheme(): [ColorScheme, Function] {
  const [cookies, setCookies] = useCookies(['colorScheme'])
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')

  useEffect(() => {
    const initialColorScheme = cookies.colorScheme || systemColorScheme()

    setColorScheme(initialColorScheme)
  })

  const switchColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark'

    setColorScheme(newColorScheme)
    setCookies('colorScheme', newColorScheme)
  }

  return [colorScheme, switchColorScheme]
}
