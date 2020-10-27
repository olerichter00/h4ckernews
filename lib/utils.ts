export type ColorScheme = 'dark' | 'light'

export const systemColorScheme = (): 'dark' | 'light' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const backgroundColorClass = (colorScheme: ColorScheme) =>
  colorScheme === 'light' ? 'bg-gray-100' : 'bg-gray-900'

export const textColorClass = (colorScheme: ColorScheme) =>
  colorScheme === 'light' ? 'text-gray-900' : 'text-gray-100'
