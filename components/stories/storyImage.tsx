import { useReducer, useEffect } from 'react'

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
  const [useFallback, setUseFallback] = useReducer(() => true, false)

  const isMobile = useIsMobile()

  const onError = () => {
    if (failed) {
      setLoaded()
      setUseFallback()
    } else {
      setFailed()
    }
  }

  const onLoad = () => {
    setLoaded()
  }

  useEffect(() => {
    if (imageUrls.length === 0) setFailed()
  }, [])

  const imageUrl = failed
    ? `api/image?keywords=${encodeURIComponent(keywords.join(','))}`
    : imageUrls[0]

  return (
    <FadeTransition show={loaded} duration={0}>
      <div
        className="flex justify-center  flex-col overflow-hidden max-h-48 w-full mb-2 sm:mb-0 sm:h-32 sm:w-48 flex-none sm:rounded-md hover:opacity-75 transition-opacity bg-gray-800"
        style={{
          minWidth: '200px',
          minHeight: isMobile ? '100px' : '138px',
          maxHeight: isMobile ? '180px' : '240px',
        }}
      >
        {useFallback ? (
          <FallbackImage placeholderText={placeholderText} />
        ) : (
          <img
            src={imageUrl}
            className="min-h-full min-w-full"
            style={{ objectFit: 'cover' }}
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </div>
    </FadeTransition>
  )
}
