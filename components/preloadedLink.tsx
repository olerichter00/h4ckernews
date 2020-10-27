import { useState } from 'react'

export default function PreloadedLink({ children, url, className }) {
  const [timer, setTimer] = useState(null)

  const onMouseEnter = () => setTimer(setTimeout(prefetchUrl, 100))

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
