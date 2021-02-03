import React, { useReducer } from 'react'
import FallbackImage from './fallbackImage'
import useIsMobile from '../../../hooks/useIsMobile'
import FadeTransition from '../../elements/fadeTransition'
import PreloadedLink from '../../elements/preloadedLink'

type StoryImageProps = {
  imageUrls: string[]
  keywords: string[]
  placeholderText: string
  url: string
}

const StoryImage: React.FC<StoryImageProps> = ({
  imageUrls = [],
  keywords = [],
  placeholderText,
  url,
}) => {
  const [loaded, setLoaded] = useReducer(() => true, false)
  const [failed, setFailed] = useReducer(() => true, false)
  const isMobile = useIsMobile()

  const onError = () => {
    setLoaded()
    setFailed()
  }

  const onLoad = () => {
    setLoaded()
  }

  let imageUrl = `api/image?url=${encodeURIComponent(imageUrls[0])}&keywords=${encodeURIComponent(
    keywords.join(','),
  )}`

  // Hack to load high resolution ycombinator images
  if (imageUrls[0]?.startsWith('https://news.ycombinator.com'))
    imageUrl =
      'https://www.workatastartup.com/assets/ycombinator-logo-b603b0a270e12b1d42b7cca9d4527a9b206adf8293a77f9f3e8b6cb542fcbfa7.png'

  return (
    <FadeTransition show={loaded} duration={0}>
      <PreloadedLink url={url}>
        <div
          className="flex flex-none flex-col justify-center max-h-48 dark:bg-gray-100 bg-gray-900 rounded-sm group-hover:opacity-75 overflow-hidden transition-opacity sm:mb-0 sm:w-48 sm:h-32"
          style={{
            minWidth: '200px',
            minHeight: isMobile ? '180px' : '138px',
            maxHeight: isMobile ? '180px' : '240px',
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
      </PreloadedLink>
    </FadeTransition>
  )
}

export default StoryImage
