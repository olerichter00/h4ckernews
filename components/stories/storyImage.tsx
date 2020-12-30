import React, { useReducer, useEffect, useRef, SyntheticEvent } from 'react'

import FallbackImage from './fallbackImage'
import useIsMobile from '../../hooks/useIsMobile'
import FadeTransition from '../common/fadeTransition'

const YCOMBINATOR_IMAGE =
  'https://www.workatastartup.com/assets/ycombinator-logo-b603b0a270e12b1d42b7cca9d4527a9b206adf8293a77f9f3e8b6cb542fcbfa7.png'
const MIN_IMAGE_WITH = 300

type StoryImageProps = {
  imageUrls: string[]
  keywords: string[]
  placeholderText: string
  imageLoadTimeout?: number
}

export default function StoryImage({
  imageUrls = [],
  keywords = [],
  placeholderText,
  imageLoadTimeout = 1000,
}: StoryImageProps) {
  const [loaded, setLoaded] = useReducer(() => true, false)
  const loadedRef = useRef(loaded)
  loadedRef.current = loaded

  const [failed, setFailed] = useReducer(() => true, false)
  const [useFallback, setUseFallback] = useReducer(() => true, false)

  const isMobile = useIsMobile()

  const onError = () => {
    if (loadedRef.current) return

    if (failed) {
      setLoaded()
      setUseFallback()
    } else {
      setFailed()
    }
  }

  const onLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if ((event.target as HTMLImageElement).naturalWidth < MIN_IMAGE_WITH) return onError()

    setLoaded()
  }

  useEffect(() => {
    if (imageUrls.length === 0) setFailed()

    setTimeout(() => onError(), imageLoadTimeout)
  }, [])

  const imageUrl = failed
    ? `api/image?keywords=${encodeURIComponent(keywords.join(','))}`
    : imageUrls[0]

  return (
    <FadeTransition show={loaded} duration={0}>
      <div
        className="flex flex-none flex-col justify-center max-h-48 bg-gray-500 dark:bg-gray-700 hover:opacity-75 overflow-hidden transition-opacity sm:mb-0 sm:w-48 sm:h-32 sm:rounded-md"
        style={{
          minWidth: '200px',
          minHeight: isMobile ? '140px' : '138px',
          maxHeight: isMobile ? '140px' : '240px',
        }}
      >
        {useFallback ? (
          <FallbackImage placeholderText={placeholderText} />
        ) : (
          <img
            // Hack to load high resolution ycombinator images
            src={
              imageUrl && imageUrl.startsWith('https://news.ycombinator.com')
                ? YCOMBINATOR_IMAGE
                : imageUrl
            }
            className="min-w-full min-h-full"
            style={{ objectFit: 'cover' }}
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </div>
    </FadeTransition>
  )
}
