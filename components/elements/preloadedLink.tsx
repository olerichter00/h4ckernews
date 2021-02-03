import React, { ReactChildren, ReactChild } from 'react'

type PreloadedLinkProps = {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[]
  url: string
  [x: string]: any
}

const PreloadedLink: React.FC<PreloadedLinkProps> = ({ children, url, ...rest }) => {
  const prefetchUrl = async () => {
    const { prefetch } = require('quicklink')

    prefetch(url)
  }

  return (
    <a href={url} target="_blank" rel="noreferrer" onMouseEnter={prefetchUrl} {...rest}>
      {children}
    </a>
  )
}

export default PreloadedLink
