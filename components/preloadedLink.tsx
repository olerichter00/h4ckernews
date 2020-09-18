import { useState } from 'react'

export default function PreloadedLink({ children, url }) {
  const [timer, setTimer] = useState(null)

  const onMouseEnter = () => setTimer(setTimeout(prefetchUrl, 500))

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
    >
      {children}
    </a>
  )
}
