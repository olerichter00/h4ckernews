export type ColorScheme = 'dark' | 'light'

export const systemColorScheme = (): 'dark' | 'light' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const asyncTimeout = timeout => new Promise(reject => setTimeout(reject, timeout))

export const timeoutFetch = async (url, timeout = 1000) => {
  const response = (await Promise.race([fetch(url), asyncTimeout(timeout)])) as Response

  return response
}
