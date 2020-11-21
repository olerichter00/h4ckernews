import { useState } from 'react'

import config from '../../lib/config'

export default function PreloadedLink({ children, url, className }) {
  const [timer, setTimer] = useState(null)

  const onMouseEnter = () => setTimer(setTimeout(prefetchUrl, config.prefetchTimeout))

  const onMouseLeave = () => clearTimeout(timer)

  const prefetchUrl = async () => {
    const { prefetch } = require('quicklink')

    try {
      await prefetch(url)
    } catch {}
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </a>
  )
}
