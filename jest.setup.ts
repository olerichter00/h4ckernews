import { setConfig } from 'next/config'

import next from 'next'
next({ dev: true })

import config from './next.config'

setConfig({ config })
