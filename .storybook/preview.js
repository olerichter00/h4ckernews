import { setConfig } from 'next/config'

import '../styles/globals.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

setConfig({
  publicRuntimeConfig: {
    breakpoints: {
      xs: 500,
      sm: 768,
      md: 1024,
      lg: 1280,
    },
  },
})
