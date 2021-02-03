import React from 'react'
import Truncate from 'react-truncate'

type FallbackImageProps = {
  placeholderText: string
}

const FallbackImage: React.FC<FallbackImageProps> = ({ placeholderText }) => {
  return (
    <div className="flex flex-col p-4 h-40">
      <div
        className={`text-white dark:text-gray-700 font-semibold my-auto sm:text-lg text-xl leading-5`}
      >
        <Truncate lines={4}>{placeholderText.toUpperCase()}</Truncate>
      </div>
    </div>
  )
}

export default FallbackImage
