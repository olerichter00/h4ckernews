import next from 'next'
next({ dev: true })

import config from './next.config'
import { setConfig } from 'next/config'

setConfig({ config })
