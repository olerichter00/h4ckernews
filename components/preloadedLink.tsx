export default function PreloadedLink({ children, url }) {
  const prefetchUrl = () => {
    const { prefetch } = require('quicklink')
    prefetch(url)
  }

  return (
    <a href={url} target="_blank" rel="noopener" onMouseEnter={prefetchUrl}>
      {children}
    </a>
  )
}
