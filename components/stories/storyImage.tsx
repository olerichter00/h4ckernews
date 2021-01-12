import React, { useReducer, SyntheticEvent } from 'react'

import FallbackImage from './fallbackImage'
import useIsMobile from '../../hooks/useIsMobile'
import FadeTransition from '../common/fadeTransition'

type StoryImageProps = {
  imageUrls: string[]
  keywords: string[]
  placeholderText: string
}

export default function StoryImage({
  imageUrls = [],
  keywords = [],
  placeholderText,
}: StoryImageProps) {
  const [loaded, setLoaded] = useReducer(() => true, false)
  const [failed, setFailed] = useReducer(() => true, false)
  const isMobile = useIsMobile()

  const onError = () => {
    setLoaded()
    setFailed()
  }

  const onLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded()
  }

  let imageUrl = `api/image?url=${encodeURIComponent(imageUrls[0])}&keywords=${encodeURIComponent(
    keywords.join(','),
  )}`

  // Hack to load high resolution ycombinator images
  if (imageUrls[0] && imageUrls[0].startsWith('https://news.ycombinator.com'))
    imageUrl =
      'https://www.workatastartup.com/assets/ycombinator-logo-b603b0a270e12b1d42b7cca9d4527a9b206adf8293a77f9f3e8b6cb542fcbfa7.png'

  return (
    <FadeTransition show={loaded} duration={0}>
      <div
        className="flex flex-none flex-col justify-center max-h-48 dark:bg-gray-100 bg-gray-900 rounded-t-xl group-hover:opacity-75 overflow-hidden transition-opacity sm:mb-0 sm:w-48 sm:h-32 sm:rounded-md"
        style={{
          minWidth: '200px',
          minHeight: isMobile ? '160px' : '138px',
          maxHeight: isMobile ? '160px' : '240px',
        }}
      >
        {failed ? (
          <FallbackImage placeholderText={placeholderText} />
        ) : (
          <img
            src={imageUrl}
            className="min-w-full min-h-full"
            style={{ objectFit: 'cover' }}
            onLoad={onLoad}
            onError={onError}
            loading="lazy"
          />
        )}
      </div>
    </FadeTransition>
  )
}
