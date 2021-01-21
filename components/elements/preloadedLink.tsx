import React, { ReactChildren, ReactChild } from 'react'

type PreloadedLinkProps = {
  children: ReactChildren | ReactChild
  url: string
  [x: string]: any
}

const PreloadedLink: React.FC<PreloadedLinkProps> = ({ children, url, ...rest }) => {
  const prefetchUrl = async () => {
    const { prefetch } = require('quicklink')

    prefetch(url)
  }

  return (
    <a href={url} target="_blank" rel="noopener" onMouseEnter={prefetchUrl} {...rest}>
      {children}
    </a>
  )
}

export default PreloadedLink
