import { systemColorScheme, ColorScheme } from '../lib/utils'
import useLocalStorage from './useLocalStorage'

export default function useColorScheme(): [ColorScheme, Function] {
  const [colorScheme, setColorScheme] = useLocalStorage<string>('colorScheme', systemColorScheme)

  const switchColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark'

    setColorScheme(newColorScheme)
  }

  return [colorScheme, switchColorScheme]
}
