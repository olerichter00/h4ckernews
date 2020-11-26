import React, { ReactChildren, ReactChild } from 'react'
import { useState } from 'react'

import config from '../../lib/config'

type PreloadedLinkProps = {
  children: ReactChildren | ReactChild
  url: string
  className: string
}

export default function PreloadedLink({ children, url, className }: PreloadedLinkProps) {
  const [timer, setTimer]: [number | undefined, Function] = useState()

  const onMouseEnter = () => setTimer(setTimeout(prefetchUrl, config.prefetchTimeout))

  const onMouseLeave = () => clearTimeout(timer as number)

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
