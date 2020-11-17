import { useState, useEffect, useRef } from 'react'
import FadeTransition from '../common/fadeTransition'
import FallbackImage from './fallbackImage'
import useBreakpoint from '../../hooks/useBreakpoint'
type StoryImageProps = {
  forceFallback: boolean
  imageUrls: [string]
  placeholderText: string
}

export default function StoryImage({ forceFallback, imageUrls, placeholderText }: StoryImageProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const { isMobile } = useBreakpoint()

  const onError = () => {
    if (imageIndex === imageUrls.length - 1) {
      fail()
      return
    }

    setImageIndex(imageIndex + 1)
  }

  const fail = () => {
    setLoaded(true)
    setFailed(true)
  }

  useEffect(() => {
    if (forceFallback) {
      fail()
    }
  }, [forceFallback])

  const onLoad = () => {
    setLoaded(true)
  }

  return (
    <FadeTransition show={loaded}>
      <div
        className="flex justify-center flex-col overflow-hidden max-h-48 w-full mb-2 sm:mb-0 sm:h-32 sm:w-48 flex-none sm:rounded-md hover:opacity-75 transition-opacity duration-500 ease-in-out"
        style={{ minWidth: '200px', minHeight: isMobile ? '100px' : '138px', maxHeight: '240px' }}
      >
        {failed ? (
          <FallbackImage placeholderText={placeholderText} />
        ) : imageUrls && imageUrls[imageIndex] ? (
          <img
            src={`api/image?url=${imageUrls[imageIndex]}`}
            className="min-h-full min-w-full"
            style={{ objectFit: 'cover' }}
            onLoad={onLoad}
            onError={onError}
          />
        ) : null}
      </div>
    </FadeTransition>
  )
}
