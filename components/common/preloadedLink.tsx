import React, { ReactChildren, ReactChild } from 'react'

type PreloadedLinkProps = {
  children: ReactChildren | ReactChild
  url: string
  className?: string
}

export default function PreloadedLink({ children, url, className }: PreloadedLinkProps) {
  const prefetchUrl = async () => {
    const { prefetch } = require('quicklink')

    try {
      await prefetch(url)
    } catch {}
  }

  return (
    <a href={url} target="_blank" rel="noopener" onMouseEnter={prefetchUrl} className={className}>
      {children}
    </a>
  )
}
