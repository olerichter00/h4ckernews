import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function useColorScheme(): [String, Function] {
  const [cookies, setCookies] = useCookies(['colorScheme'])
  const [colorScheme, setColorScheme] = useState('')

  useEffect(() => setColorScheme(cookies.colorScheme))

  const switchColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark'

    setColorScheme(newColorScheme)
    setCookies('colorScheme', newColorScheme)
  }

  return [colorScheme, switchColorScheme]
}
