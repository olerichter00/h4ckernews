import { useState, useEffect } from 'react'
import FadeTransition from '../common/fadeTransition'

type StoryImageProps = {
  imageUrls: [string]
}

export default function StoryImage({ imageUrls }: StoryImageProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const onError = () => {
    if (imageIndex === imageUrls.length - 1) {
      setLoaded(true)
      return
    }

    setImageIndex(imageIndex + 1)
  }

  useEffect(() => {
    if (imageUrls && imageUrls.length <= 0) setLoaded(true)
  }, [imageUrls])

  const onLoad = () => {
    setLoaded(true)
  }

  return (
    <FadeTransition show={loaded}>
      <div
        className="flex justify-center flex-col overflow-hidden h-40 w-full mb-2 sm:mb-0 sm:h-32 sm:w-48 flex-none rounded-md bg-gray-200 hover:opacity-75 transition-opacity duration-500 ease-in-out"
        style={{ minWidth: '200px', minHeight: '138px' }}
      >
        {imageUrls && imageUrls[imageIndex] ? (
          <img
            src={imageUrls[imageIndex]}
            className="min-h-full min-w-full"
            style={{ objectFit: 'cover' }}
            onError={onError}
            onLoad={onLoad}
          />
        ) : null}
      </div>
    </FadeTransition>
  )
}
