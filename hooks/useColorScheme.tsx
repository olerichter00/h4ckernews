import useLocalStorage from '@olerichter00/use-localstorage'
import { ColorScheme } from '../lib/types'

const useColorScheme = (): [ColorScheme, Function] => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>(
    'colorScheme',
    systemColorScheme,
  )

  const switchColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark'

    setColorScheme(newColorScheme)
  }

  return [colorScheme as ColorScheme, switchColorScheme]
}

const systemColorScheme = (): ColorScheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export default useColorScheme
