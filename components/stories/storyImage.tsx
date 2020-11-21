import { useReducer } from 'react'

import FadeTransition from '../common/fadeTransition'
import FallbackImage from './fallbackImage'
import useBreakpoint from '../../hooks/useBreakpoint'

type StoryImageProps = {
  imageUrls: string[]
  placeholderText: string
}

export default function StoryImage({ imageUrls = [], placeholderText }: StoryImageProps) {
  const [loaded, setLoaded] = useReducer(() => true, false)
  const [failed, setFailed] = useReducer(() => true, false)
  const { isMobile } = useBreakpoint()

  const onError = () => {
    setLoaded()
    setFailed()
  }

  const onLoad = () => {
    setLoaded()
  }

  const noImages = imageUrls.length === 0

  return (
    <FadeTransition show={loaded || noImages}>
      <div
        className="flex justify-center flex-col overflow-hidden max-h-48 w-full mb-2 sm:mb-0 sm:h-32 sm:w-48 flex-none sm:rounded-md hover:opacity-75 transition-opacity duration-500 ease-in-out"
        style={{ minWidth: '200px', minHeight: isMobile ? '100px' : '138px', maxHeight: '240px' }}
      >
        {failed || noImages ? (
          <FallbackImage placeholderText={placeholderText} />
        ) : (
          <img
            src={`api/image?urls=${encodeURIComponent(imageUrls.join(','))}`}
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
