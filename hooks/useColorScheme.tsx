import useLocalStorage from '@olerichter00/use-localstorage'

export type ColorScheme = 'dark' | 'light'

const systemColorScheme = (): 'dark' | 'light' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export default function useColorScheme(): [ColorScheme, Function] {
  const [colorScheme, setColorScheme] = useLocalStorage('colorScheme', systemColorScheme)

  const switchColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark'

    setColorScheme(newColorScheme)
  }

  return [colorScheme, switchColorScheme]
}
